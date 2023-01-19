"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "../../styles/profile.module.scss";
import Loader from "../../comp/Loader";
import Button from "../../comp/Button";
import { useState } from "react";

const Login = () => {
  //auth
  const [logging, setLogging] = useState(false);
  const { data: session, status } = useSession();

  if (!logging && status === "authenticated") {
    return (
      <div className={styles.profile}>
        <h1>Welcome, {session.user?.name}</h1>
        <Button
          text="Sign Out"
          onClick={() => signOut({ callbackUrl: "http://localhost:3000/" })}
        />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className={styles.profile}>
        <h1>You are not logged in.</h1>
        <Button
          text="Sign in with Google"
          onClick={() =>
            // signIn("google", { callbackUrl: "http://localhost:3000/" })
            signIn()
          }
        />
      </div>
    );
  } else if (!session || !status) {
    return <Loader />;
  }
};

export default Login;
