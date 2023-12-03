import React, { useState, useEffect } from "react";
import { motion } from "framer-motion/dist/framer-motion";
import { textVariant, fadeIn, fadeShow } from "../../../../util/motion";
import styles from "./styles.module.scss";
interface TypewriterProps {
  text: string;
  speed?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 50 }) => {
  const [displayText, setDisplayText] =
    useState<string>("智能技术与工程学院教工第一党支部");

  return (
    <motion.div
      variants={textVariant}
      className={styles.wrapper}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
    >
      <div className={styles.one}>
        {displayText
          .split("")
          .splice(0, 9)
          .map((item, index) => {
            return (
              <motion.div
                className={styles.font}
                variants={fadeShow("down", "tween", (index + 1) * 0.2, 1)}
                key={index}
              >
                {item}
              </motion.div>
            );
          })}
      </div>

      <div className={styles.two}>
        {displayText
          .split("")
          .splice(9, 14)
          .map((item, index) => {
            return (
              <motion.div
                className={styles.font}
                variants={fadeShow("up", "tween", (index + 1) * 0.2, 1)}
                key={index}
              >
                {item}
              </motion.div>
            );
          })}
      </div>
    </motion.div>
  );
};

export default Typewriter;
