import { Button } from "@/components/ui/button";
import React from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

const PlaceCardItem = ({ place }) => {
  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${place.placeName}`}
      target="_blank"
    >
      <div className="border rounded-lg p-3 mt-2 flex gap-5 hover:scale-105 transition-all cursor-pointer hover:shadow-sm">
        <img
          src="/placeholder.jpg"
          className="w-[130px] h-[130px] rounded-lg"
        />
        <div className="flex flex-col">
          <div className="font-bold text-lg">{place.placeName}</div>
          <p className="text-sm text-gray-400">{place.placeDetails}</p>
          <h2 className="mt-2 text-sm">🕙 {place.timeToSpend}</h2>
          {/* <Button className="mt-2 flex size-10">
          <FaMapLocationDot />
        </Button> */}
        </div>
      </div>
    </Link>
  );
};

export default PlaceCardItem;
