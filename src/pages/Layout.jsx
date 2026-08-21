import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import OrderPopup from "../components/OrderPopup/OrderPopup";

const Layout = () => {
  const [orderPopup, setOrderPopup] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleOrderPopup = (place = null) => {
    setSelectedPlace(place);
    setOrderPopup(true);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300 flex flex-col justify-between font-sans">
      <Navbar handleOrderPopup={handleOrderPopup} />
      <main className="flex-1 pt-14">
        <Outlet context={{ handleOrderPopup }} />
      </main>
      <Footer />
      <OrderPopup
        orderPopup={orderPopup}
        setOrderPopup={setOrderPopup}
        selectedPlace={selectedPlace}
      />
    </div>
  );
};

export default Layout;
