import React, { useState } from "react";
import "./Mask.css";
import Login from "../Login";

interface MaskedComponentProps {
  children?: React.ReactNode;
  isMask: boolean;
}

const MaskedComponent: React.FC<MaskedComponentProps> = ({
  children,
  isMask,
}) => {
  return (
    <div className={`mask ${!isMask ? "visible" : ""}`}>
      <div className="slider">{children}</div>
    </div>
  );
};

export default MaskedComponent;
