import React from "react";
import "./HeroSection.scss";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
export default function HeroSection() {
  return (
    <div className="container-fluid hero bg-dark ">
      <div className="container  ">
        <div className="row align-items-center">
          <div className="col">
            <h1>Generate Your Images with AI</h1>
            <div className="my-4">
              <p>
                <FaCheckCircle className="text-success" /> Effortless Creation
              </p>
              <p>
                <FaCheckCircle className="text-success" /> Complimentary
                Enhancements
              </p>
              <p>
                <FaCheckCircle className="text-success" /> Rapid Results
              </p>
            </div>
            <h6 className="my-3">
              {" "}
              Transforming normal photos into AI-enhanced images revolutionizes
              visual content. Advanced algorithms upscale, enhance, and perfect
              photos by improving resolution and correcting imperfections. This
              technology turns ordinary pictures into high-quality visuals,
              making every photo reach its full potential for both personal and
              professional use.
            </h6>
            <div className="my-5 d-flex align-items-center">
              <Link
                to="/photo-maker"
                className="btn btn-success btn-hover px-5 py-3"
              >
                Get Started <FaArrowRight />
              </Link>
              <Link to="/demo" className="ms-5 link-demo text-white">
                See Demo
              </Link>
            </div>
          </div>
          <div className="col">
            <img
              src="https://pfpmaker.com/images/hero-pro.webp"
              alt=""
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
