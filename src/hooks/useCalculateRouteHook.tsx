export type Payload = {
  origin: [number, number];
  destination: [number, number];
  threshold: number;
  recipient: string;
};

export default function useCalculateRouteHook(): {
  onCalculateRoute: (routes: Payload[]) => Promise<void>;
} {
  const onCalculateRoute = async (routes: Payload[]) => {
    // TODO: sent api url to env variable
    fetch(process.env.NEXT_PUBLIC_API_URL + "/api/monitor-routes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(routes),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Workflow started:", data);
        alert(
          "Route is being monitored. You will receive an email if delays exceed the threshold."
        );
      })
      .catch((err) => {
        console.error("Failed to start workflow:", err);
        alert("Failed to start monitoring. Please try again.");
      });
  };

  return {
    onCalculateRoute,
  };
}
