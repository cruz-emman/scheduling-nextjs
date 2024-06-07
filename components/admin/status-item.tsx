import React from "react";

interface StatusProps {
  status: {
    label: string;
    value: string;
  };
}

export const StatusItem = ({ status }: StatusProps) => {
  return (
    <div className="flex items-center cursor-pointer rounded-md py-1 px-2  hover:bg-gray-200">
      <p className="text-sm">
      {status.label}
      </p>
    </div>
  );
};
