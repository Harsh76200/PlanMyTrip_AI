import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Route, View } from "lucide-react";
import CreateTrip from "./create-trip";
import Header from "./components/custom/header";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Viewtrip from "./view-trip/[tripid]/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create-trip",
    element: <CreateTrip />,
  },
  {
    path: "/view-trip/:tripid",
    element: <Viewtrip />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="527178025190-8qg2lmd9k10832vlm17hv7aema87sen7.apps.googleusercontent.com">
      <Header />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
    ;
  </StrictMode>
);
