import React, { useState } from "react";
import "./Mask.css";
import Login from "../Login";

interface MaskedComponentProps {
  children?: React.ReactNode;
  isLogin: boolean;
}

const MaskedComponent: React.FC<MaskedComponentProps> = ({
  children,
  isLogin,
}) => {
  return (
    <div>
      <div className={`mask ${!isLogin ? "visible" : ""}`}>{children}</div>
    </div>
  );
};

export default MaskedComponent;
