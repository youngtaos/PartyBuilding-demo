import { Avatar, Badge } from "antd";
import axios from "axios";
import qs from "qs";
import { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";

type PeopleProps = {
  name: string;
  setParam: React.Dispatch<React.SetStateAction<string>>;
};

type PeopleInfoType = {
  articleNum: number | string;
  avatar: string | null;
  id: number;
  name: string;
  posts: number;
};

const People: React.FC<PeopleProps> = ({ name, setParam }) => {
  const [peopleInfo, setPeopleInfo] = useState<PeopleInfoType>({
    articleNum: 0,
    avatar: "",
    id: 0,
    name: "",
    posts: 0,
  });
  const handleGetPeopleInfoByName = (name: string) => {
    axios
      .post(
        "/api/people/getPeopleInfoByName",
        qs.stringify({ name: JSON.stringify(name) }),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((res: any) => {
        setPeopleInfo(res.data.data[0]);
      });
  };
  const selectPeople = (name: string) => {
    setParam(name);
  };
  useEffect(() => {
    handleGetPeopleInfoByName(name);
  }, [name]);
  return (
    <div style={{ cursor: "pointer" }}>
      {peopleInfo?.avatar ? (
        <Avatar
          shape="square"
          icon={<UserOutlined />}
          src={peopleInfo.avatar}
          onClick={() => {
            setParam(peopleInfo.name);
          }}
        />
      ) : (
        <Avatar
          shape="square"
          icon={<UserOutlined />}
          onClick={() => {
            setParam(peopleInfo.name);
          }}
        />
      )}
    </div>
  );
};

export default People;
