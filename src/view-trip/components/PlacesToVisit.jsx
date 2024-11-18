import React from "react";
import PlaceCardItem from "./PlaceCardItem";

const PlacesToVisit = ({ trip }) => {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Places to Visit</h2>
      <div>
        {trip?.tripData?.itinerary?.map((item, index) => (
          <div>
            <h2 className="text-lg mt-5 font-medium">Day {item.day}</h2>

            <div className="grid md:grid-cols-2 gap-5">
              {item?.plan?.map((place, index) => (
                <div className="">
                  <h2 className="text-sm font-medium text-orange-400">
                    {place?.timeToTravel}
                  </h2>
                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesToVisit;
