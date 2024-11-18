import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="flex flex-col text-center mx-9 gap-9">
      <h1 className="font-extrabold text-[60px] text-center mt-16">
        Your Personalized Journey Starts Here:{" "}
        <span className="text-[#61c980]">
          {" "}
          AI-Powered Itineraries for Every Adventure
        </span>{" "}
      </h1>
      <p className="text-xl text-center text-gray-500">
        Your personal trip planner and travel curator, creating custom
        itineraries tailored to your interests and budget.
      </p>
      <div className="flex justify-center items-center gap-5">
        <Link to="/create-trip">
          <Button>Get Started. It's Free</Button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
