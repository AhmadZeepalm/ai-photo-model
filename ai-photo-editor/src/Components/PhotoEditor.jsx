import React, { useState } from "react";
import axios from "axios";

export default function PhotoEditor() {
  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });
  const [generatedImages, setGeneratedImages] = useState([]);

  const handleImageChange = (event, imageKey) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prevImages) => ({
          ...prevImages,
          [imageKey]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const makePrediction = async () => {
    const { image1, image2, image3, image4 } = images;
    if (!image1 || !image2 || !image3 || !image4) {
      alert("Please select all four images.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image1", dataURItoBlob(image1));
      formData.append("image2", dataURItoBlob(image2));
      formData.append("image3", dataURItoBlob(image3));
      formData.append("image4", dataURItoBlob(image4));

      const response = await axios.post(
        "http://localhost:5000/api/generate-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setGeneratedImages([response.data.generatedImageUrl]);
    } catch (error) {
      console.error("Error making prediction:", error);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <div
        style={{ marginTop: "30px", display: "flex", flexDirection: "column" }}
      >
        {["image1", "image2", "image3", "image4"].map((imageKey) => (
          <div key={imageKey}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, imageKey)}
              style={{
                marginTop: "20px",
                width: "503px",
                padding: "10px",
                fontSize: "15px",
              }}
            />
            {images[imageKey] && (
              <div
                style={{
                  width: "500px",
                  height: "500px",
                  border: "1px solid black",
                  marginTop: "20px",
                  position: "relative",
                }}
              >
                <img
                  src={images[imageKey]}
                  alt="Selected"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            )}
          </div>
        ))}
        <button
          style={{
            marginTop: "20px",
            width: "503px",
            padding: "10px",
            fontSize: "15px",
          }}
          onClick={makePrediction}
        >
          Run
        </button>
      </div>
      <div style={{ width: "500px" }}>
        {generatedImages.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <h2>Generated Images</h2>
            {generatedImages.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Generated ${index}`}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  marginBottom: "10px",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
