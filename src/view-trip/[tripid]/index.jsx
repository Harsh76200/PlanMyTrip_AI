import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";

const Viewtrip = () => {
  const { tripid } = useParams(); // Extract tripid directly
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    if (tripid && typeof tripid === "string") {
      GetTripData();
    } else {
      console.error("Invalid tripid:", tripid);
    }
  }, [tripid]);

  const GetTripData = async () => {
    try {
      const docRef = doc(db, "AITrips", tripid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setTrip(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      {/* information section */}
      {<InfoSection trip={trip} />}
      {/* Recommended Hotels */}
      <Hotels trip={trip} />
      {/* Daily plans */}
      <PlacesToVisit trip={trip} />
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Viewtrip;
