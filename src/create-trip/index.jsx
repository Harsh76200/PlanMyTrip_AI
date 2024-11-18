import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "../constants/options";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../components/ui/button";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { chatSession } from "@/service/AIModel";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";

import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const autocompleteInput = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [formData, setFormData] = useState({});
  const [openDailog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const nevigate = useNavigate();
  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Logs formData on every update
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      getUserProfile(tokenResponse);
      console.log(tokenResponse);
    },
    onError: (error) => {
      console.log("Login Failed:");
      console.log(error);
    },
  });
  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (
      !formData?.location ||
      !formData?.noOfDays ||
      !formData?.traveler ||
      !formData?.budget
    ) {
      toast.error("fill all the fields");
      return;
    }
    //check days less than 12
    if (formData?.noOfDays > 12) {
      toast.error("Please select less than 12 days");
      return;
    }
    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location)
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget);

    // console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    const tripData = await result.response.text();

    console.log("--", tripData);
    setLoading(false);
    saveAITrip(tripData);
  };

  const saveAITrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    // Add a new document in collection "cities"
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user.email,
      id: docId,
    });
    setLoading(false);
    nevigate("/view-trip/" + docId);
  };

  const getUserProfile = (tokenResponse) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        onGenerateTrip();
      });
  };

  useEffect(() => {
    // Load Google Places script
    const loadScript = (url) => {
      const script = document.createElement("script");
      script.src = url;
      script.async = true;
      script.defer = true;
      script.onload = () => setScriptLoaded(true);
      document.body.appendChild(script);
    };

    loadScript(
      `https://maps.gomaps.pro/maps/api/js?key=AlzaSygH3ATNMYFPR2c4cZIiaKJ6ymmAGxfIlfJ&libraries=places`
    );
  }, []);

  useEffect(() => {
    if (scriptLoaded && window.google) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        autocompleteInput.current,
        { types: ["(cities)"] }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        handleInputChange("location", place.formatted_address || "");
      });
    }
  }, [scriptLoaded]);

  return (
    <div className="flex justify-center min-h-screen">
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px:5 mt-10">
        <h2 className="font-bold text-3xl">
          Tell us your travel preferences 🏕️🌴
        </h2>
        <p className="mt-5 text-gray-500 text-xl">
          Just provide some basic information, and our trip planner will
          generate
          <br /> a customized itinerary based on your preferences.
        </p>

        <div className="mt-20">
          <div>
            <h2 className="text-xl my-3 font-medium">
              What is your destination of choice?
            </h2>
            <Input
              ref={autocompleteInput}
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              type="text"
              placeholder="Enter destination"
              className="w-full p-2 rounded bg-white"
            />
          </div>
          <div>
            <h2 className="text-xl mt-10 my-3 font-medium">
              How many days would you like to plan?
            </h2>
            <Input
              type="number"
              placeholder="Enter number of days"
              value={formData.days}
              onChange={(e) => handleInputChange("noOfDays", e.target.value)}
            />
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl my-3 font-medium">
            What is your travel budget?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border rounded-xl hover:bg-gray-50 hover:cursor-pointer hover:shadow-lg ${
                  formData?.budget == item.title
                    ? "shadow-lg border-black border-dashed bg-gray-50"
                    : ""
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-gray-500 text-sm">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl my-3 font-medium">
            Who do you plan on traveling with on your next adventure?
          </h2>
          <div className="grid grid-cols-2 gap-5 mt-5">
            {SelectTravelesList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveler", item.people)}
                className={`p-4 border rounded-xl hover:bg-gray-50 hover:cursor-pointer hover:shadow-lg ${
                  formData?.traveler == item.people
                    ? "shadow-lg border-black border-dashed bg-gray-50"
                    : ""
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-gray-500 text-sm">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className="my-10 justify-end flex">
          <Button disabled={loading} onClick={onGenerateTrip}>
            {loading ? (
              <AiOutlineLoading className="animate-spin h-7 w-7" />
            ) : (
              "Generate Trip"
            )}
          </Button>
          <ToastContainer />
        </div>

        <Dialog open={openDailog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img src="logo.svg" />
                <h2 className="font-bold text-lg mt-7">Sign in with Google</h2>
                <p>Sign in to app with Google Authentication securely</p>
                <Button
                  onClick={login}
                  className="w-full mt-5 flex gap-4 items-center"
                >
                  <FcGoogle className="h-7 w-7" />
                  Sign in with Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default CreateTrip;
