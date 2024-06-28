import React from "react";
import { data } from "./data";
import ServicesCard from "./ServicesCard";

export default function Services() {
  return (
    <div className="container service my-5">
      <div className="row ">
        <div className="col text-center mt-5">
          <h1>Our Services</h1>
          <h3>We create meaningful experiences</h3>
        </div>
      </div>
      <div className="row">
        {data.map((service, i) => (
          <div className="col-12 col-lg-4" key={i}>
            <ServicesCard details={service} />
          </div>
        ))}
      </div>
    </div>
  );
}
