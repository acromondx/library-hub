import React from "react";

const TruncatedText = ({ text }: { text: string }) => {
  return (
    <div className="max-w-xs md:max-w-md">
      <p className="truncate">{text} </p>
    </div>
  );
};

export default TruncatedText;
