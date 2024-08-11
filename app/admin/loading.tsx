import { Loader } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-20">
      <Loader className="mr-2 h-14 w-14 animate-spin" />
    </div>
  );
};

export default loading;
