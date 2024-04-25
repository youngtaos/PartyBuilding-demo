import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { motion } from "framer-motion/dist/framer-motion";
import { fadeIn, staggerContainer } from "../../../../util/motion";
import { Image } from "antd";
import { SchemaData } from "../Article";
import { SyncOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

interface OverlappingDivsComponentProps {
  data: SchemaData[];
}

const OverlappingDivsComponent: React.FC<OverlappingDivsComponentProps> = ({
  data = [],
}) => {
  const [currentData, setCurrentData] = useState(data);
  const [rotate, setRotate] = useState(0);
  function nextPage() {
    const temp = data;
    const firstData = data[0];
    temp.shift();
    temp.push(firstData);
    setCurrentData(temp?.slice(0, 6).reverse());
    setRotate(rotate + 90);
  }
  useEffect(() => {
    data && data.length && setCurrentData(data?.slice(0, 6).reverse());
  }, [data]);

  return (
    <>
      <motion.div
        className={styles.wrapper}
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
      >
        <div
          className={`paddings yPaddings flexCenter innerWidth ${styles.container}`}
        >
          <div>
            {currentData.map((item, index) => {
              return (
                <motion.div
                  variants={fadeIn("left", "tween", (index + 1) * 0.2, 1)}
                  key={index}
                >
                  <div
                    className={styles.card}
                    style={{
                      top: "50vh",
                      left: `${60}vw`,
                    }}
                  >
                    <Image
                      src={item?.imgSrc}
                      alt="抱歉，获取不到对应图片"
                      width={"30vw"}
                      height={"45vh"}
                      preview={false}
                      fallback=""
                    ></Image>
                    {index === currentData?.length - 1 && (
                      <SyncOutlined
                        className={styles.cardSync}
                        onClick={nextPage}
                        rotate={rotate}
                        style={{ color: "white" }}
                      />
                    )}
                    <div className={styles.cardTittle}>
                      <Link to={`/detail`} state={item}>
                        {item?.title}
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default OverlappingDivsComponent;
