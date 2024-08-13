"use client";

import React, { useState } from "react";
import { useZxing } from "react-zxing";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const BarcodeDetectionApp = () => {
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const { ref } = useZxing({
    onDecodeResult(decodedResult) {
      setResult(decodedResult.getText());
      setIsScanning(false);
    },
    onError(error) {
      setError(`Error scanning: ${error.message}`);
      setIsScanning(false);
    },
  });

  const startScanning = () => {
    setIsScanning(true);
    setResult("");
    setError("");
  };

  const stopScanning = () => {
    setIsScanning(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="mb-4 text-2xl font-bold">Book Barcode Scanner</h1>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="relative mb-4">
        {isScanning && (
          <video
            ref={ref}
            className="h-auto w-full max-w-md rounded-lg border-2 border-gray-300"
          />
        )}
      </div>
      <div className="mb-4 flex space-x-4">
        <Button onClick={startScanning} disabled={isScanning}>
          Start Scanning
        </Button>
        <Button
          onClick={stopScanning}
          disabled={!isScanning}
          variant="secondary"
        >
          Stop Scanning
        </Button>
      </div>
      {result && (
        <div className="mt-4">
          <h2 className="mb-2 text-xl font-semibold">Detected Barcode:</h2>
          <p className="text-lg">{result}</p>
        </div>
      )}
    </div>
  );
};

export default BarcodeDetectionApp;
