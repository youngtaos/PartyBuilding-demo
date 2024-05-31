import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, List, Modal, Input, Select, Card } from "antd";
import { useDispatch } from "react-redux";
import qs from "qs";
import { cloneDeep } from "lodash";
import {
  DeletePeopleAcion,
  updatePeopleAction,
  changePeopleInfoAction,
} from "../../../Store/action";
import { PeopleInfoType } from "..";
import styles from "../styles.module.scss";
import InfoModal from "./infoModal";
import {
  EditOutlined,
  EllipsisOutlined,
  ExclamationCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import Item from "antd/es/list/Item";
import { Link } from "react-router-dom";

interface PropsType {
  peopleInfo: Array<PeopleInfoType>;
}

const PeopleList = (props: PropsType) => {
  const { peopleInfo } = props;
  const [ModalData, setModalData] = useState({
    isModalOpen: false,
    item: { id: 0, name: "", articleNum: 0, posts: 0, avatar: "", comment: "" },
    index: 0,
  });
  const [open, setOpen] = useState(false);
  const [modal, contextHolder] = Modal.useModal();
  const changePeopleInfo = (data: any) => {
    const action = changePeopleInfoAction(data);
    dispatch(action);
  };
  const [temp, setTemp] = useState({
    id: 0,
    name: "",
    articleNum: 0,
    posts: 0,
    avatar: "",
    comment: "",
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
  const getPeopleList = () => {
    axios.get("/api/people/getPeopleInfo").then((res) => {
      const data = res?.data.data;
      if (data) {
        changePeopleInfo(data);
      }
    });
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

  const handleCommentChange = (e: any) => {
    let data = cloneDeep(temp);
    data.comment = e.target.value;
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
        getPeopleList();
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
        // window.location.reload();
        getPeopleList();
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

  useEffect(() => {
    getPeopleList();
  }, []);
  return (
    <div className={styles.list}>
      <div className={styles.postsList}>
        {peopleInfo
          .filter((item) => item.posts !== 0)
          .map((people: PeopleInfoType, index: number) => {
            return (
              <Card
                style={{
                  width: 200,
                  margin: 10,
                }}
                size={"small"}
                hoverable={true}
                cover={
                  <div style={{ overflow: "hidden", height: "180px" }}>
                    <img
                      alt="example"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "top",
                      }}
                      src={people.avatar}
                      height={160}
                    />
                  </div>
                }
                actions={[
                  <EditOutlined
                    key="edit"
                    onClick={() => {
                      openModal(people, index);
                    }}
                  />,
                  <SettingOutlined
                    key="setting"
                    onClick={() => {
                      confirm(index, people.id);
                      // handleDeletePeople(index, item.id);
                    }}
                  />,
                  <EllipsisOutlined key="ellipsis" />,
                ]}
              >
                <Meta
                  avatar={<Avatar src={people.avatar} />}
                  title={
                    <Link to={"/peopleDetail"} state={people}>
                      <div style={{ color: "red" }}>{people.name}</div>
                    </Link>
                  }
                  description={postsName[people.posts]}
                />
              </Card>
            );
          })}
      </div>
      <div className={styles.postsList}>
        {peopleInfo
          .filter((item) => item.posts === 0)
          .map((people: PeopleInfoType, index: number) => {
            return (
              <Card
                style={{
                  width: 200,
                  margin: 10,
                  flexShrink: 0,
                }}
                size={"small"}
                hoverable={true}
                cover={<img alt="example" src={people.avatar} height={160} />}
                actions={[
                  <EditOutlined
                    key="edit"
                    onClick={() => {
                      openModal(people, index);
                    }}
                  />,
                  <SettingOutlined
                    key="setting"
                    onClick={() => {
                      confirm(index, people.id);
                      // handleDeletePeople(index, item.id);
                    }}
                  />,
                  <EllipsisOutlined key="ellipsis" />,
                ]}
              >
                <Meta
                  avatar={<Avatar src={people.avatar} />}
                  title={
                    <Link to={"/peopleDetail"} state={people}>
                      <div style={{ color: "red" }}>{people.name}</div>
                    </Link>
                  }
                  description={postsName[people.posts]}
                />
              </Card>
            );
          })}
      </div>
      {contextHolder}
      <InfoModal
        ModalData={ModalData}
        handleOk={handleOk}
        handleCancel={handleCancel}
        handleInputChange={handleInputChange}
        temp={temp}
        handleSelectChange={handleSelectChange}
        handleCommentChange={handleCommentChange}
      />
    </div>
  );
};

export default PeopleList;
