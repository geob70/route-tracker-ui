"use client";

import { useState } from "react";

type Props = {
  data: Record<string, unknown>;
  title?: string;
};

export default function JsonViewer({ data, title = "JSON Output" }: Props) {
  const [expanded, setExpanded] = useState(true);

  const toggle = () => setExpanded((prev) => !prev);

  return (
    <div className="bg-gray-100 rounded-lg p-4 shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-lg">{title}</h2>
        <button
          onClick={toggle}
          className="text-sm text-blue-600 hover:underline"
        >
          {expanded ? "Collapse" : "Expand"}
        </button>
      </div>

      {expanded && (
        <pre className="overflow-x-auto text-sm bg-white p-3 rounded border border-gray-300">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      )}
    </div>
  );
}
