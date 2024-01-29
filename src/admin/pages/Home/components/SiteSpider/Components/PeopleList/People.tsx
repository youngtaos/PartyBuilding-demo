import { Avatar, Badge } from "antd";
import axios from "axios";
import qs from "qs";
import { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";

type PeopleProps = {
  name: string;
};

type PeopleInfoType = {
  articleNum: number | string;
  avatar: string | null;
  id: number;
  name: string;
  posts: number;
};

const People: React.FC<PeopleProps> = ({ name }) => {
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
  useEffect(() => {
    console.log(name, "gggg");
    handleGetPeopleInfoByName(name);
  }, [name]);
  return (
    <>
      {peopleInfo?.avatar ? (
        <Badge count={peopleInfo?.articleNum}>
          <Avatar
            shape="square"
            icon={<UserOutlined />}
            src={peopleInfo.avatar}
          />
        </Badge>
      ) : (
        <Badge count={peopleInfo?.articleNum}>
          <Avatar shape="square" icon={<UserOutlined />} />
        </Badge>
      )}
    </>
  );
};

export default People;
