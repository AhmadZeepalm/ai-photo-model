import React, { useState } from "react";

export default function ServicesCard({ details }) {
  const { imgSrc, title, text } = details;

  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    width: "100%",
    borderRadius: "20px",
    position: "relative",
    overflow: "hidden",
    transition: "transform 0.2s ease",
    transform: isHovered ? "translateY(-5px)" : "translateY(0)",
    boxShadow: isHovered ? "0 4px 8px rgba(0,0,0,0.1)" : "none",
  };

  const imgStyle = {
    height: "250px",
    objectFit: "cover",
    opacity: isHovered ? 0.7 : 1,
    transition: "opacity 0.2s ease",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.4)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    opacity: isHovered ? 1 : 0,
    transition: "opacity 0.2s ease",
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="my-3">
      <div
        className="card"
        style={cardStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={imgSrc}
          className="card-img-top"
          alt="Service"
          style={imgStyle}
        />
        <div className="card-body p-3">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{text}</p>
        </div>
      </div>
    </div>
  );
}
