import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "../../common/Navbar/index";
import Banner from "./Components/Banner";
import Article from "./Components/Article";
import styles from "./styles.module.scss";
import Blank from "./Components/Blank";
import Login from "./Components/Login";

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
  const [isLogin, setIsLogin] = useState(true);
  useEffect(() => {
    axios.get("/api/showData").then((res) => {
      const data = res?.data?.data;
      setSchema(data);
    });
  }, []);
  return (
    <div className={styles.HomeWrapper}>
      <NavBar setIsLogin={setIsLogin}></NavBar>
      {!isLogin ? <Login isLogin={isLogin} setIsLogin={setIsLogin} /> : null}
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
