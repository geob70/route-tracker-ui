"use client";

import AddressAutoComplete from "@/components/AddressAutoComplete";
import JsonViewer from "@/components/JsonViewer";
import useCalculateRouteHook, { Payload } from "@/hooks/useCalculateRouteHook";
import { useState } from "react";

export default function Home() {
  const [originCoords, setOriginCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [originAddress, setOriginAddress] = useState("");
  const [destCoords, setDestCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [destAddress, setDestAddress] = useState("");
  const [routes, setRoutes] = useState<Payload[]>([]);
  const [threshold, setThreshold] = useState<number>(0);
  const [recipient, setRecipient] = useState<string>("");

  const { onCalculateRoute } = useCalculateRouteHook();

  const addRoute = () => {
    if (originCoords && destCoords) {
      const newRoute: Payload = {
        origin: [originCoords.lat, originCoords.lng],
        destination: [destCoords.lat, destCoords.lng],
        threshold,
        recipient,
      };
      setRoutes((prev) => [...prev, newRoute]);
      // reset fields
      setOriginCoords(null);
      setOriginAddress("");
      setDestCoords(null);
      setDestAddress("");
      setThreshold(0);
      setRecipient("");
    } else {
      alert("Please select both origin and destination.");
    }
  };

  const handleCalculateRoute = () => {
    if (routes.length > 0) {
      onCalculateRoute(routes);
    } else {
      alert("Please add at least one route.");
    }
  };

  return (
    <div className="flex w-full min-h-screen">
      <main className="max-w-xl py-10 px-4 bg-white shadow-md rounded-lg m-10 flex-1">
        <h1 className="text-2xl font-bold mb-8 text-center">
          🚚 Route Planner
        </h1>

        <div>
          <AddressAutoComplete
            label="Origin"
            onCoordinatesSelected={(coords, address) => {
              setOriginCoords(coords);
              setOriginAddress(address);
            }}
          />

          <AddressAutoComplete
            label="Destination"
            onCoordinatesSelected={(coords, address) => {
              setDestCoords(coords);
              setDestAddress(address);
            }}
          />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Delay Threshold (minutes):
            </label>
            <input
              type="number"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              placeholder="Enter delay threshold in minutes"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recipient Email:
            </label>
            <input
              type="email"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Enter recipient email"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            className="mb-4 w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
            onClick={addRoute}
          >
            Add Route
          </button>
          <button
            className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            onClick={handleCalculateRoute}
          >
            Calculate Route
          </button>
        </div>

        <div className="mt-6 space-y-4 text-sm text-gray-700">
          {originCoords && (
            <div>
              <strong>Origin:</strong> {originAddress} <br />
              <strong>Lat:</strong> {originCoords.lat}, <strong>Lng:</strong>{" "}
              {originCoords.lng}
            </div>
          )}
          {destCoords && (
            <div>
              <strong>Destination:</strong> {destAddress} <br />
              <strong>Lat:</strong> {destCoords.lat}, <strong>Lng:</strong>{" "}
              {destCoords.lng}
            </div>
          )}
        </div>
      </main>

      <div className="w-1/3 p-4 bg-gray-50 border-l overflow-y-hidden overscroll-y-auto m-10 rounded-lg">
        <h2 className="text-lg font-semibold mb-4 text-center">Route Data</h2>
        {routes.length === 0 ? (
          <p className="text-sm text-gray-500 text-center">
            No routes calculated yet.
          </p>
        ) : (
          routes.map((route, index) => (
            <JsonViewer key={index} data={route} title={`Route ${index + 1}`} />
          ))
        )}
      </div>
    </div>
  );
}
