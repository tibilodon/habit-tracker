import React from "react";
import Link from "next/link";
import styles from "../styles/nav.module.scss";
import signedIcon from "../assets/account_ico.svg";
import about from "../assets/about_ico.svg";
import notSignedIcon from "../assets/no_account_ico.svg";
import Ico from "./Ico";
import Button from "./Button";
const Nav: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.about}>
        <Link href={"/about"}>
          <div>
            <Ico link="/about" src={about} alt="about ico" />
          </div>
        </Link>
        <Link href={"/"}>
          {/* <button>Home</button> */}
          <Button link="/" text="home" />
        </Link>
      </div>
      <Link href={"/login"}>
        <div>
          <Ico link="/login" src={signedIcon} alt="account icon" />
        </div>
      </Link>
    </nav>
  );
};

export default Nav;
