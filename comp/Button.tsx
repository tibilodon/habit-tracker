"use client";
import React from "react";
import styles from "../styles/button.module.scss";
import { usePathname } from "next/navigation";

interface Btn {
  text: string;
  link?: string;
  type?: any | string;
  onClick?: () => void;
}

const Button: React.FC<Btn> = ({ text, link, type, onClick }) => {
  const pathName = usePathname();

  return (
    <>
      <button
        className={pathName === `${link}` ? styles.btnActive : styles.btn}
        onClick={onClick}
        type={type}
      >
        {text}
      </button>
    </>
  );
};

export default Button;
