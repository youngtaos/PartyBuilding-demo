import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
import styles from "./styles.module.scss";
import { motion } from "framer-motion/dist/framer-motion";
import { fadeIn, staggerContainer } from "../../../../util/motion";
import { Image } from "antd";
import { SchemaData } from "../Article";

interface OverlappingDivsComponentProps {
  data: SchemaData[];
}

const OverlappingDivsComponent: React.FC<OverlappingDivsComponentProps> = ({
  data,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [data.length]);

  return (
    <motion.div
      className={styles.wrapper}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
    >
      {/* <a id="skill" className="anchor2"></a> */}
      <div
        className={`paddings yPaddings flexCenter innerWidth ${styles.container}`}
      >
        <div>
          {data
            .slice(0, 6)
            .reverse()
            .map((item, index) => {
              // if (index >= 8) {
              //   return null;
              // }
              return (
                <motion.div
                  variants={fadeIn("right", "tween", (index + 1) * 0.2, 1)}
                  className={styles.skill}
                  key={index}
                >
                  <div
                    className={styles.card}
                    style={{
                      top: `${index * 10 + 280}px`,
                      left: `${index * 10 + 100}px`,
                    }}
                  >
                    <Image
                      src={item?.imgSrc}
                      alt="抱歉，获取不到对应图片"
                      width={380}
                      height={220}
                      preview={false}
                      fallback=""
                    ></Image>

                    <div className={styles.cardTittle}>{item?.title}</div>
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>
    </motion.div>
  );
};

export default OverlappingDivsComponent;
