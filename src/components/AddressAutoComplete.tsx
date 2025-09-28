"use client";

import { useEffect, useRef, useState } from "react";

type Coordinates = {
  lat: number;
  lng: number;
};

type Props = {
  label: string;
  onCoordinatesSelected: (coords: Coordinates, address: string) => void;
};

export default function AddressAutoComplete({
  label,
  onCoordinatesSelected,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [address, setAddress] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        typeof window !== "undefined" &&
        window.google &&
        window.google.maps &&
        window.google.maps.places
      ) {
        clearInterval(interval);

        if (!inputRef.current) return;

        const autocomplete = new window.google.maps.places.Autocomplete(
          inputRef.current,
          {
            fields: ["formatted_address", "geometry"],
            types: ["geocode"],
          }
        );

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          const formatted = place.formatted_address;
          const location = place.geometry?.location;

          if (formatted && location) {
            const lat = location.lat();
            const lng = location.lng();
            setAddress(formatted);
            onCoordinatesSelected({ lat, lng }, formatted);
          }
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, [onCoordinatesSelected]);

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}:
      </label>
      <input
        ref={inputRef}
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder={`Enter ${label.toLowerCase()} address`}
        className="w-full p-2 border border-gray-300 rounded-lg"
      />
    </div>
  );
}
