import React from "react";
import styles from "./styles.module.scss";
const handleManagePageRedirect = () => {
  window.location.href = "/admin.html#/data";
};
const NavBar: React.FC = () => {
  return (
    // <div className={styles.NavBarWrapper}>
    //   <div className={styles.words}>
    //     <span
    //       onClick={() => {
    //         handleManagePageRedirect();
    //       }}
    //     >
    //       进入管理页面
    //     </span>
    //   </div>
    // </div>
    <></>
  );
};

export default NavBar;
