"use client";

import React, { useEffect } from "react";

const AboutError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    //* We can pass this error to a logging service
    console.error(error);
  });
  return (
    <div>
      <h1>Something went wrong. Please try again later.</h1>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
};

export default AboutError;
