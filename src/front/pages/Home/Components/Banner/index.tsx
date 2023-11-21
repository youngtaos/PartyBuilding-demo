import React from "react";
import { Carousel } from "antd";
import styles from "./styles.module.scss";
import banner1 from "../../../../static/img/banner1.jpg";
import banner2 from "../../../../static/img/banner2.jpg";
import banner3 from "../../../../static/img/banner3.jpg";
import banner4 from "../../../../static/img/banner4.jpg";

const Banner: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.imgBox}>
        <img src={banner2} alt=""></img>
      </div>
    </div>
  );
};

export default Banner;
