"use client";
import React from "react";
import type { NextApiRequest, NextApiResponse } from "next";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import styles from "../styles/form.module.scss";
import Loader from "./Loader";
import Button from "./Button";
import Input from "./Input";

interface User {
  user: any;
}

interface Form {
  habit: {
    title: string;
    content: string;
    userEmail: any;
  };
}

const Form: React.FC<User> = ({ user }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const refreshData = () => {
    router.refresh();
  };
  const [form, setForm] = useState<Form>({
    habit: {
      title: "",
      content: "",
      userEmail: status === "authenticated" && session?.user.email,
    },
  });
  const [userSet, setUserSet] = useState<boolean>(false);

  useEffect(() => {
    const setUserForHabits = () => {
      if (session) {
        setForm({
          ...form,
          habit: {
            ...form.habit,
            userEmail: status === "authenticated" && session?.user.email,
          },
        });
      }
    };
    setUserForHabits();
  }, [session]);

  // useEffect(() => {
  //   const setUser = () => {
  //     if (session && !user.includes(session?.user.email)) {
  //       // console.log("I AM SETTING UP A USER");
  //       const data = {
  //         name: session.user.name,
  //         email: session.user.email,
  //       };
  //       try {
  //         // CREATE
  //         fetch("api/createUser", {
  //           body: JSON.stringify(data),
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           method: "POST",
  //         }).then(() => {
  //           refreshData();
  //         });
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     } else {
  //       // console.log("I AM NOT RUNNING");
  //       return;
  //     }
  //   };

  //   setUser();
  // }, [session, user]);

  if (session && !user.includes(session?.user.email)) {
    try {
      const data = {
        name: session.user.name,
        email: session.user.email,
      };
      // CREATE
      fetch("api/createUser", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }).then(() => {
        refreshData();
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(data: Form) {
    try {
      if (session) {
        // Check input is not blank
        if (data.habit.title) {
          // CREATE
          fetch("api/create", {
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
          }).then(() => {
            setForm({
              habit: {
                title: "",
                content: "",
                userEmail: status === "authenticated" && session?.user.email,
              },
            });
            refreshData();
          });
        } else {
          alert("Title can not be blank");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (!user) {
    return <Loader />;
  }

  return (
    <>
      {session ? (
        <form
          className={styles.form}
          onSubmit={e => {
            e.preventDefault();
            handleSubmit(form);
          }}
        >
          <h1>Add Habit</h1>
          <div className={styles.inputWrap}>
            <Input
              spanText="title"
              placeholder="title"
              rows={2}
              value={form.habit.title}
              onChange={e =>
                setForm({
                  ...form,
                  habit: { ...form.habit, title: e.target.value },
                })
              }
            />{" "}
            <Input
              spanText="description"
              placeholder="description"
              rows={4}
              value={form.habit.content}
              onChange={e =>
                setForm({
                  ...form,
                  habit: { ...form.habit, content: e.target.value },
                })
              }
            />
          </div>
          <Button text="Submit" type={"submit"} />
        </form>
      ) : null}
    </>
  );
};

export default Form;
