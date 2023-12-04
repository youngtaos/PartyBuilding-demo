import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import NavBar from "../../common/Navbar/index";
import Banner from "./Components/Banner";
import Article from "./Components/Article";
import styles from "./styles.module.scss";
import Blank from "./Components/Blank";
import People from "./Components/People";
import { Empty } from "antd";

const defaultSchema = [
  { content: "", title: "​", imgSrc: "", academy: "", message: "", people: "" },
];
interface data {
  content: string;
  title: string;
  imgSrc: string;
  academy: string;
  message: string;
  people: string;
}

const Home: React.FC = () => {
  const [schema, setSchema] = useState<data[]>(defaultSchema);
  useEffect(() => {
    axios.get("/api/showData").then((res) => {
      const data = res?.data?.data;
      console.log(data, "data");
      setSchema(data);
    });
  }, []);
  return (
    <div className={styles.HomeWrapper}>
      <NavBar></NavBar>

      <div>
        <Banner schema={schema}></Banner>
        <div className={styles.main}>
          {!schema ? (
            <Blank />
          ) : (
            <div className="site-card-border-less-wrapper">
              <Article schema={schema} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
