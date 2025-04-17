"use client";

import { Button } from "@heroui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 px-4 text-center h-[70vh]">
      <h2 className="text-3xl font-bold text-red-600">Something went wrong!</h2>
      <p className="text-gray-500 max-w-md">
        An unexpected error occurred. Please try again to refetch the data.
      </p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
