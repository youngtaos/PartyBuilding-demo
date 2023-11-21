import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Image, Modal } from "antd";
import axios from "axios";

interface peopleType {
  id: number;
  name: string;
  articleNum: number;
  posts: number;
  avatar: string;
}

const People = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [people, setPeople] = useState<peopleType[]>([
    {
      id: 0,
      name: "",
      articleNum: 0,
      posts: 0,
      avatar: "",
    },
  ]);
  useEffect(() => {
    axios.get("/api/people/getPeopleInfo").then((res) => {
      const data = res.data.data;
      setPeople(data);
    });
  }, []);

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
        {people &&
          people.map((item, index) => {
            if (index === 11) {
              return (
                <div className={styles.more} key={index} onClick={showModal}>
                  ……
                </div>
              );
            }
            return (
              <div className={styles.item} key={index}>
                {item.name}
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
        okText="确定"
        cancelText="取消"
      >
        <div className={styles.modalList}>
          {people &&
            people.map((item, index) => {
              return (
                <div className={styles.Modalitem} key={index}>
                  {/* <Image src={item.avatar} alt=""></Image> */}
                  {item.name}
                </div>
              );
            })}
        </div>
      </Modal>
    </div>
  );
};

export default People;
