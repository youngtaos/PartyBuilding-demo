import { relative } from "path";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Modal } from "antd";

const People = () => {
  const the_people: Array<string> = [
    "陈宁",
    "裴仰军",
    "周伟",
    "陈国荣",
    "利节",
    "陈刘奎",
    "都进学",
    "冯骊骁",
    "祝华正",
    "张倩",
    "彭军",
    "翟渊",
    "于安宁",
    "姚瑶",
    "金尚柱",
    "屈治华",
    "胡燕",
    "张咪",
    "周召敏",
    "周述敏",
    "杨怡康",
    "晏丹",
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={styles.PeopleWrapper}>
      <p>支部成员</p>
      <div className={styles.list}>
        {the_people.map((item, index) => {
          if (index === 11) {
            return (
              <div className={styles.more} key={index} onClick={showModal}>
                ……
              </div>
            );
          }
          return (
            <div className={styles.item} key={index}>
              {item}
            </div>
          );
        })}
      </div>
      <Modal
        title="支部全体成员"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <div className={styles.modalList}>
          {the_people.map((item, index) => {
            return (
              <div className={styles.Modalitem} key={index}>
                {item}
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
};

export default People;
