"use client";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "../styles/ico.module.scss";

interface Icon {
  alt: string;
  link: string;
  src: any;
}

const Ico: React.FC<Icon> = ({ alt, link, src }) => {
  const pathName = usePathname();
  return (
    <>
      <Image
        priority
        crossOrigin="anonymous"
        src={src}
        alt={alt}
        width={40}
        height={40}
        className={pathName === `${link}` ? styles.icoActive : styles.ico}
      />
    </>
  );
};

export default Ico;
