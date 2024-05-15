import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function Loading({loading}: {loading:boolean}) {
  return (
    <div className="max-w-[7xl] mx-auto w-full h-full  flex items-center justify-center">
        <ClipLoader 
        loading={loading}
        size={100}
        color="#36d7b7" />
    </div>
  );
}
