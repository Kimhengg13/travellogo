import React from "react";
import Places from "../components/Places/Places";
import { useOutletContext } from "react-router-dom";

const PlacesRoute = () => {
  const { handleOrderPopup } = useOutletContext() || {};

  return (
    <div className="pt-8">
      <Places handleOrderPopup={handleOrderPopup} />
    </div>
  );
};

export default PlacesRoute;
