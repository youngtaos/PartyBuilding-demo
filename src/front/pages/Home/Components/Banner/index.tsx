import React, { useState } from "react";
import styles from "./styles.module.scss";
import banner2 from "../../../../static/img/banner2.jpg";
import OverlappingDivsComponent from "../Book/index";
import { SchemaData } from "../Article";
import Typewriter from "../Typewriter";

const Banner: React.FC<{
  schema: SchemaData[];
}> = (props) => {
  return (
    <div className={styles.wrapper}>
      <Typewriter text={"cqust"} speed={1000} />
      <OverlappingDivsComponent data={props.schema} />
    </div>
  );
};

export default Banner;
