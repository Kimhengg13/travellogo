import React from "react";
import { FaMapMarkedAlt } from "react-icons/fa";

const Location = () => {
  return (
    <span id="location">
      <section data-aos="fade-up" className="py-8">
        <div className="container space-y-4">
          <div className="space-y-1">
            <span className="text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-1.5">
              <FaMapMarkedAlt /> Interactive Map
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-gray-900 dark:text-white">
              Explore Destinations Across Cambodia
            </h2>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-card border border-gray-200 dark:border-gray-800">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.7744383196924!2d104.9174453!3d11.5684729!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109513dc7e1927d%3A0x6b10705a61e6878b!2sPhnom%20Penh%2C%20Cambodia!5e0!3m2!1sen!2skh!4v1700000000000!5m2!1sen!2skh"
              width="100%"
              height="380"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Cambodia Map"
            ></iframe>
          </div>
        </div>
      </section>
    </span>
  );
};

export default Location;
