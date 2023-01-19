"use client";
import styles from "../styles/box.module.scss";
import { useSession } from "next-auth/react";
import { useState, useEffect, useCallback } from "react";

interface BoxProps {
  children: any;
  isUser: string[];
}

const Box: React.FC<BoxProps> = ({ children, isUser }) => {
  const { data: session }: any = useSession();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const checkActiveUser = () => {
      if (isUser.includes(session?.user.email)) {
        setIsActive(true);
      }
      // console.log("USEFFECT");
    };
    checkActiveUser();
  }, [session, isUser]);

  // useCallback(() => {
  //   const checkActiveUser = () => {
  // if (isUser.includes(session?.user.email)) {
  //   setIsActive(true);
  //   console.log("usecallback");
  // }
  //   };
  //   checkActiveUser();
  // }, [isUser]);

  return (
    <>
      <div className={isActive ? styles.boxActive : styles.box}>{children}</div>
    </>
  );
};

export default Box;
