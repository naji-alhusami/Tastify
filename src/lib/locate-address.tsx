import { Button } from "@/components/ui/button";
import React, { useState } from "react";

interface AddressLocatorProps {
  setAddress: (open: string | null) => void;
}

const AddressLocator: React.FC<AddressLocatorProps> = ({ setAddress }) => {
  const determineAddress = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            const fullAddress = data.display_name;
            setAddress(fullAddress);
          } catch (error) {
            console.error("Error fetching address:", error);
            setAddress(null);
          }
        },
        (error) => {
          console.error("Error getting current location:", error);
          setAddress(null);
        }
      );
    }
  };

  return (
    <div>
      <Button onClick={determineAddress}>Locate Me</Button>
    </div>
  );
};

export default AddressLocator;
