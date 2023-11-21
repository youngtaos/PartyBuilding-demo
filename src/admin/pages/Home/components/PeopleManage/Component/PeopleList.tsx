import React, { useState } from "react";
import axios from "axios";
import { Avatar, List, Modal, Input, Select } from "antd";
import { useDispatch } from "react-redux";
import qs from "qs";
import { cloneDeep } from "lodash";
import { DeletePeopleAcion, updatePeopleAction } from "../../../Store/action";
import { PeopleInfoType } from "..";
import styles from "../styles.module.scss";
import InfoModal from "./infoModal";
import { ExclamationCircleOutlined } from "@ant-design/icons";

interface PropsType {
  peopleInfo: Array<PeopleInfoType>;
}

const PeopleList = (props: PropsType) => {
  const { peopleInfo } = props;
  const [ModalData, setModalData] = useState({
    isModalOpen: false,
    item: { id: 0, name: "", articleNum: 0, posts: 0, avatar: "" },
    index: 0,
  });
  const [open, setOpen] = useState(false);
  const [modal, contextHolder] = Modal.useModal();
  const [temp, setTemp] = useState({
    id: 0,
    name: "",
    articleNum: 0,
    posts: 0,
    avatar: "",
  });
  const [postsName, setPostsName] = useState([
    "党员",
    "宣传委员",
    "组织委员",
    "支部书记",
  ]);
  const dispatch = useDispatch();

  const deletePeople = (index: number) => {
    const action = DeletePeopleAcion(index);
    dispatch(action);
  };
  const updatePeople = (index: number, people: PeopleInfoType) => {
    const action = updatePeopleAction(index, people);
    dispatch(action);
  };

  const openModal = (item: PeopleInfoType, index: number) => {
    setModalData({ isModalOpen: true, item, index });
    setTemp(item);
  };

  const handleOk = () => {
    let data = cloneDeep(ModalData);
    data.item = temp;
    data.isModalOpen = false;
    setModalData(data);
    handleUpdatePeople(data.index, data.item);
  };

  const handleCancel = () => {
    let data = cloneDeep(ModalData);
    data.isModalOpen = false;
    setModalData(data);
  };

  const handleSelectChange = (value: number) => {
    let data = cloneDeep(temp);
    data.posts = value;
    setTemp(data);
  };

  const handleInputChange = (e: any) => {
    let data = cloneDeep(temp);
    data.name = e.target.value;
    setTemp(data);
  };

  const handleDeletePeople = (index: number, id: number) => {
    axios
      .post(
        "/api/people/DeletePeopleById",
        qs.stringify({
          id,
        }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      )
      .then(() => {
        deletePeople(index);
      });
  };

  const handleUpdatePeople = (index: number, value: PeopleInfoType) => {
    axios
      .post(
        "/api/people/updatePeople",
        qs.stringify({
          id: value.id,
          name: value.name,
          posts: value.posts,
        }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      )
      .then(() => {
        updatePeople(index, value);
      });
  };

  const confirm = (index: number, id: number) => {
    modal.confirm({
      title: "注意",
      icon: <ExclamationCircleOutlined />,
      content: "您确定要移除该成员吗",
      okText: (
        <div
          onClick={() => {
            handleDeletePeople(index, id);
          }}
        >
          确认
        </div>
      ),
      cancelText: "取消",
    });
  };
  return (
    <div className={styles.list}>
      <List
        itemLayout="horizontal"
        dataSource={peopleInfo}
        renderItem={(item: PeopleInfoType, index: number) => (
          <List.Item
            actions={[
              <a
                key="list-loadmore-edit"
                onClick={() => {
                  openModal(item, index);
                }}
              >
                编辑
              </a>,
              <a
                key="list-loadmore-more"
                onClick={() => {
                  confirm(index, item.id);
                  // handleDeletePeople(index, item.id);
                }}
              >
                移除
              </a>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} size={60} />}
              title={item.name}
              description={postsName[item.posts]}
            />
          </List.Item>
        )}
      />
      {contextHolder}
      <InfoModal
        ModalData={ModalData}
        handleOk={handleOk}
        handleCancel={handleCancel}
        handleInputChange={handleInputChange}
        temp={temp}
        handleSelectChange={handleSelectChange}
      />
    </div>
  );
};

export default PeopleList;
