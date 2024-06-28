const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const Replicate = require("replicate");
const multer = require("multer");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:5173',  // Adjust to your React app's port
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({
    dest: path.join(__dirname, "uploads"),
});

const replicate = new Replicate({
    auth: "r8_MIY2G4EWNwqPWj8m3PjS9rXTVC7iPmy0kIeZV", // Use environment variable for security
});

const convertImageToBase64 = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                return reject(err);
            }
            const base64Image = data.toString('base64');
            resolve(`data:image/jpeg;base64,${base64Image}`);
        });
    });
};

const prompts = [
    "A professional headshot of a person facing the camera img.",
    "A professional headshot of a person smiling in an outdoor park img.",
    "A professional headshot of a person in business attire with an office background img.",
    "A professional headshot of a person in casual clothes at a café img.",
    "A headshot of a person on a beach at sunset img.",
    "A headshot of a person wearing sports gear, holding a basketball img.",
    "A headshot of a person in winter clothes with a snowy background img.",
    "A professional headshot of a person in formal evening wear at a gala img.",
    "A headshot of a person enjoying a picnic in a park img.",
    "A headshot of a person hiking in the mountains with a scenic view img.",
    "A headshot of a person cooking in a modern kitchen img.",
    "A professional headshot of a person working on a laptop in a home office img."
];

app.post("/api/generate-images", upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
]), async (req, res) => {
    try {
        const files = req.files;
        const { model } = req.body;
        if (!files.image1) {
            console.error("The first image is required.");
            return res.status(400).send("The first image must be uploaded.");
        }

        const imagePaths = ['image1', 'image2', 'image3', 'image4'].map(key => files[key] ? path.join(__dirname, "uploads", files[key][0].filename) : null);
        const base64Images = await Promise.all(imagePaths.map(filePath => filePath ? convertImageToBase64(filePath) : null));

        console.log("Base64 Images Converted: ", base64Images);

        const generatedImageUrls = [];

        const generateImagesForPrompt = async (prompt) => {
            let input = { prompt };
            let modelUrl;

            switch (model) {
                case "model1":
                    modelUrl = "skytells-research/photomaker:16d5b64f07d84ddf3e79de35d7d70ef6fc621e6e77a2ff8466ba8ff558f7d097";
                    input.num_steps = 50;
                    input.style_name = "Neonpunk";
                    input.num_outputs = 2;
                    input.style_strength_ratio = 30;
                    break;
                case "model2":
                    modelUrl = "tencentarc/photomaker:ddfc2b08d209f9fa8c1eca692712918bd449f695dabb4a958da31802a9570fe4";
                    input.num_steps = 50;
                    input.num_outputs = 4;
                    input.guidance_scale = 5;
                    input.negative_prompt = "nsfw, lowres, bad facial features, missing facial hair, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry";
                    input.style_strength_ratio = 30;
                    break;
                case "model3":
                    modelUrl = "batouresearch/high-resolution-controlnet-tile:4af11083a13ebb9bf97a88d7906ef21cf79d1f2e5fa9d87b70739ce6b8113d29";
                    input.hdr = 0.2;
                    input.steps = 20;
                    input.scheduler = "DDIM";
                    input.creativity = 0.6;
                    input.guess_mode = false;
                    input.resolution = 2560;
                    input.resemblance = 0.4;
                    input.guidance_scale = 5;
                    input.negative_prompt = "Teeth, tooth, longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, mutant";
                    break;
                case "model4":
                    modelUrl = "lucataco/ip_adapter-sdxl-face:226c6bf67a75a129b0f978e518fed33e1fb13956e15761c1ac53c9d2f898c9af";
                    input.seed = 42;
                    input.agree_to_research_only = true;
                    input.num_outputs = 1;
                    input.num_inference_steps = 30;
                    input.scale = 0.6;
                    break;
                default:
                    throw new Error("Invalid model specified.");
            }

            base64Images.forEach((base64Image, index) => {
                if (base64Image) {
                    input[`input_image${index === 0 ? "" : index + 1}`] = base64Image;
                }
            });

            console.log("Input for model:", input);

            const response = await replicate.run(modelUrl, { input });
            console.log("Response from replicate:", response);
            generatedImageUrls.push(...response);
        };

        for (const prompt of prompts) {
            await generateImagesForPrompt(prompt);
        }

        console.log("Generated Image URLs:", generatedImageUrls);
        res.json({ generatedImageUrls });
    } catch (error) {
        console.error("Error generating images:", error);
        res.status(500).send("Error generating images.");
    }
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
