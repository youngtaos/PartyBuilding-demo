import React from "react";
import styles from './styles.module.scss';

const NavBar: React.FC = ()=>{
    return (
        <div className={styles.NavBarWrapper}>
            <div className={styles.words}>
            <span>登录</span>
            <span>退出</span>
            </div>
        </div>
    )
};

export default NavBar;