import React, { useState } from "react";
import axios from "axios";
import {
  DownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  UndoOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Image, Space } from "antd";
import "./PhotoEditor.scss";

export default function PhotoEditor() {
  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });
  const [generatedImages, setGeneratedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("model2");

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
    if (!image1) {
      alert("Please select at least the first image.");
      return;
    }

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("image1", dataURItoBlob(image1));
      if (image2) formData.append("image2", dataURItoBlob(image2));
      if (image3) formData.append("image3", dataURItoBlob(image3));
      if (image4) formData.append("image4", dataURItoBlob(image4));
      formData.append("model", selectedModel);

      const response = await axios.post(
        "http://localhost:5000/api/generate-images",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setGeneratedImages(response.data.generatedImageUrls);
      setIsLoading(false);
    } catch (error) {
      console.error("Error making prediction:", error);
      setIsLoading(false);
    }
  };

  const onDownload = (imageUrl, index) => {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.download = `generated-image-${index + 1}.png`;
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        link.remove();
      });
  };

  return (
    <>
      <div className="container-fluid model bg-dark py-5">
        <div className="row">
          <div className="col">
            <h1 className="text-center my-5 text-white">PhotoMaker Tool</h1>
          </div>
        </div>
        <div className="row">
          {/* First Row */}
          <div className="col text-center ">
            <h1 className="text-white">Input Images</h1>
            <div
              className="input-container d-flex flex-wrap justify-content-center"
              style={{ gap: "10px" }}
            >
              {["image1", "image2", "image3", "image4"].map(
                (imageKey, index) => (
                  <div key={index} className="image-box">
                    <input
                      type="file"
                      accept="image/*"
                      id={imageKey}
                      onChange={(e) => handleImageChange(e, imageKey)}
                      style={{ display: "none" }}
                    />
                    {images[imageKey] ? (
                      <img
                        src={images[imageKey]}
                        alt={`Selected ${index}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    ) : (
                      <label htmlFor={imageKey} className="image-label">
                        <PlusOutlined
                          style={{ fontSize: "24px", color: "#fff" }}
                        />
                      </label>
                    )}
                  </div>
                )
              )}
            </div>
            <button
              style={{
                marginTop: "20px",
                fontSize: "25px",
              }}
              onClick={makePrediction}
              className="btn btn-success w-75 py-3 "
            >
              Generate Images
            </button>
          </div>

          {/* Second Row (Output Section) */}
          <div className="col-lg-6">
            <h1 className="text-white text-center">Output</h1>
            {isLoading ? (
              <div style={{ marginTop: "20px", textAlign: "center" }}>
                <img
                  src="https://loading.io/assets/mod/spinner/spinner/lg.gif"
                  alt="Loading"
                  width="100%"
                  height="100%"
                  style={{ mixBlendMode: "multiply" }}
                />
              </div>
            ) : (
              <div
                className="d-flex flex-wrap justify-content-center"
                style={{ gap: "10px" }}
              >
                {generatedImages &&
                  generatedImages.map((imageUrl, index) => (
                    <div
                      key={index}
                      style={{ position: "relative", width: "290px" }}
                    >
                      <Image
                        src={imageUrl}
                        alt={`Generated ${index}`}
                        style={{ width: "100%", height: "auto" }}
                        preview={{
                          toolbarRender: (
                            _,
                            {
                              transform: { scale },
                              actions: {
                                onFlipY,
                                onFlipX,
                                onRotateLeft,
                                onRotateRight,
                                onZoomOut,
                                onZoomIn,
                                onReset,
                              },
                            }
                          ) => (
                            <Space size={12} className="toolbar-wrapper">
                              <DownloadOutlined
                                onClick={() => onDownload(imageUrl, index)}
                              />
                              <SwapOutlined rotate={90} onClick={onFlipY} />
                              <SwapOutlined onClick={onFlipX} />
                              <RotateLeftOutlined onClick={onRotateLeft} />
                              <RotateRightOutlined onClick={onRotateRight} />
                              <ZoomOutOutlined
                                disabled={scale === 1}
                                onClick={onZoomOut}
                              />
                              <ZoomInOutlined
                                disabled={scale === 50}
                                onClick={onZoomIn}
                              />
                              <UndoOutlined onClick={onReset} />
                            </Space>
                          ),
                        }}
                      />
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
