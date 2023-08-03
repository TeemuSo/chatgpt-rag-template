import { Outlet, NavLink, Link } from "react-router-dom";

import github from "../../assets/github.svg";

import styles from "./Layout.module.css";

const Layout = () => {
    return (
        <div className={styles.layout}>
            <header className={styles.header} role={"banner"}>
                <div className={styles.headerContainer}>
                    <Link to="/" className={styles.headerTitleContainer}>
                        <a href="https://github.com/TeemuSo/chatgpt-rag-template" target={"_blank"} className={styles.headerTitle}>
                            Based on ChatGPT RAG template
                        </a>
                        <a href="https://github.com/TeemuSo/chatgpt-rag-template" target={"_blank"} title="Github repository link">
                            <img
                                src={github}
                                alt="Github logo"
                                aria-label="Link to github repository"
                                width="20px"
                                height="20px"
                                className={styles.githubLogo}
                            />
                        </a>
                    </Link>
                </div>
            </header>

            <Outlet />
        </div>
    );
};

export default Layout;
