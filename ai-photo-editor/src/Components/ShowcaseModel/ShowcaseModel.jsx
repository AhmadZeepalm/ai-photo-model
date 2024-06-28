import React from "react";
import "./ShowcaseModel.scss";
export default function ShowcaseModel() {
  return (
    <div className=" showcase bg-dark">
      <div>
        <div className="py-5">
          <h1 id="selfies" style={{ textAlign: "center" }}>
            AI Image Transformation Demo
          </h1>
          <p>
            {" "}
            <p>
              See how our advanced AI technology can transform multiple ordinary
              photos into a single high-quality image. These four original
              images are merged and enhanced to create a stunning final result.
            </p>
          </p>
        </div>
        <br />
        <div className="frontpage_training_example">
          <div className="frontpage_training_example_input">
            <img
              loading="lazy"
              src="https://photoai.com/cdn-cgi/image/format=auto,fit=cover,height=500,width=500,quality=50/assets/training_examples/good/h.jpeg?1716128114"
            />
            <img
              loading="lazy"
              src="https://photoai.com/cdn-cgi/image/format=auto,fit=cover,height=500,width=500,quality=50/assets/training_examples/good/g.jpeg?1708109686"
            />
            <img
              loading="lazy"
              src="https://photoai.com/cdn-cgi/image/format=auto,fit=cover,height=500,width=500,quality=50/assets/training_examples/good/f.jpeg?1708109686"
            />
            <img
              loading="lazy"
              src="https://photoai.com/cdn-cgi/image/format=auto,fit=cover,height=500,width=500,quality=50/assets/training_examples/good/e.jpeg?1708109686"
            />
          </div>
          <img
            className="frontpage_training_example_arrow"
            src="https://photoai.com/cdn-cgi/image/format=auto,fit=cover,height=400,quality=75/assets/pencil-arrow.png?25"
          />
          <div className="frontpage_training_example_output">
            <div className="top_right_label">AI generated photo</div>
            <img
              data-original-src="https://r2-us-west.photoai.com/1716202992-4bf1b47e873c2becfd661a4a996601a0-10.jpg?1716202992"
              loading="lazy"
              src="https://photoai.com/cdn-cgi/image/format=jpeg,width=1000,quality=50/https://r2-us-west.photoai.com/1716202992-4bf1b47e873c2becfd661a4a996601a0-10.jpg?1716202992"
            />
          </div>
        </div>
      </div>
      {/* <div style={{ clear: both }}></div> */}
    </div>
  );
}
