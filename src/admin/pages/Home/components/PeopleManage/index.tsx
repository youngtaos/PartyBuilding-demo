import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles.module.scss";
import { Button, Modal, Input, Select } from "antd";
import PeopleList from "./Component/PeopleList";

import axios from "axios";
import qs from "qs";
import { addPeopleAction } from "../../Store/action";
export interface PeopleInfoType {
  id: number;
  name: string;
  articleNum: number;
  posts: number;
  avatar: string;
}

const PeopleManage: React.FC = () => {
  const peopleInfo = useSelector((state: any) => {
    return state.homeManagement.peopleInfo;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [temp, setTemp] = useState({
    id: 0,
    name: "",
    articleNum: 0,
    posts: 0,
    avatar: "",
  });
  const dispatch = useDispatch();
  const addPeople = (people: PeopleInfoType) => {
    const action = addPeopleAction(people);
    dispatch(action);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    handleAddPeople(temp);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSelectChange = (value: number) => {
    let data = temp;
    data.posts = value;
    setTemp(data);
  };

  const handleInputChange = (e: any) => {
    let data = temp;
    data.name = e.target.value;
    setTemp(data);
  };

  const handleAddPeople = (people: PeopleInfoType) => {
    console.log("p", people);
    axios
      .post(
        "/api/people/addPeople",
        qs.stringify({
          name: people?.name,
          posts: people?.posts,
        }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      )
      .then(() => {
        addPeople(people);
        setTemp({
          id: 0,
          name: "",
          articleNum: 0,
          posts: 0,
          avatar: "",
        });
      });
  };

  return (
    <div className={styles.Wrapper}>
      <div className={styles.header}>
        <Button type="primary" onClick={showModal} className={styles.addBtn}>
          新增
        </Button>
      </div>
      <div>
        <PeopleList peopleInfo={peopleInfo} />
        <Modal
          title="新增成员"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="确定"
          cancelText="取消"
        >
          <Input
            onChange={handleInputChange}
            placeholder="请输入新增成员名字"
          />
          <Select
            defaultValue={0}
            style={{ width: 120, marginTop: 20 }}
            onChange={handleSelectChange}
            options={[
              {
                value: 0,
                label: "党员",
              },
              {
                value: 1,
                label: "宣传委员",
              },
              {
                value: 2,
                label: "组织委员",
              },
              {
                value: 3,
                label: "支部书记",
              },
            ]}
          />
        </Modal>
      </div>
    </div>
  );
};

export default PeopleManage;
