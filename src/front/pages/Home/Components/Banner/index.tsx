import React, { useState } from "react";
import styles from "./styles.module.scss";
import banner2 from "../../../../static/img/banner2.jpg";
import OverlappingDivsComponent from "../Book/index";
import { SchemaData } from "../Article";

const Banner: React.FC<{
  schema: SchemaData[];
}> = (props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.imgBox}>
        <OverlappingDivsComponent data={props.schema} />

        <img src={banner2} alt=""></img>
      </div>
    </div>
  );
};

export default Banner;
