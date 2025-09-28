"use client";

import Script from "next/script";

export default function GoogleMapsScript() {
  // For autocomplete, remember to enable "Places API" in Google Cloud Console as well as set api restrictions to website
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) return null;

  return (
    <Script
      src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&channel=beta`}
      strategy="afterInteractive"
    />
  );
}
