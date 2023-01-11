import React from "react";
import { Carousel } from "antd";
import styles from "./styles.module.scss";
import banner1 from "../../../../static/img/banner1.jpg";
import banner2 from "../../../../static/img/banner2.jpg";
import banner3 from "../../../../static/img/banner3.jpg";
import banner4 from "../../../../static/img/banner4.jpg";

const Banner: React.FC = () => {
  const onChange = (currentSlide: number) => {
    //console.log(currentSlide);
  };

  return (
    <div className={styles.wrapper}>
      <Carousel
        afterChange={onChange}
        autoplay
        dots={true}
        effect="fade"
        easing=" ease "
      >
        <div className={styles.imgBox}>
          <img src={banner1} alt=""></img>
        </div>
        <div className={styles.imgBox}>
          <img src={banner2} alt=""></img>
        </div>
        <div className={styles.imgBox}>
          <img src={banner3} alt=""></img>
        </div>
        <div className={styles.imgBox}>
          <img src={banner4} alt=""></img>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
