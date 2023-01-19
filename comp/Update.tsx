"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Button from "./Button";
import Input from "./Input";
import styles from "../styles/update.module.scss";

interface Data {
  data: {
    title: string;
    content: string;
    id: number;
    author: {
      id: number;
      name: string;
      email: string;
    };
    // userEmail: string;
  };
}

interface FormData {
  title: string;
  content: string;
  id: number;
}

const Update: React.FC<Data> = ({ data }) => {
  const { data: session } = useSession();
  // const { title, content, id } = data;
  const router = useRouter();
  const refreshData = () => {
    router.refresh();
  };
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState<FormData>({
    title: "",
    content: "",
    id: 1,
  });
  // console.log(data);

  const handleSubmit = async (data: FormData) => {
    // console.log("DATA:", data);

    try {
      fetch(`api/habit/${data.id}`, {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
      }).then(() => {
        setEdit(!edit);
        refreshData();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateHabit = async (data: FormData) => {
    // console
    setForm({ ...data });
    setEdit(!edit);
  };
  if (session && session.user?.email === data.author.email) {
    return (
      <div className={styles.wrap}>
        {edit ? (
          <>
            <form
              className={styles.wrap}
              onSubmit={e => {
                e.preventDefault();
                handleSubmit(form);
              }}
            >
              <Input
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                placeholder="Title"
                rows={2}
                spanText="Title"
              />{" "}
              <Input
                placeholder="description"
                value={form.content}
                onChange={e => setForm({ ...form, content: e.target.value })}
                rows={4}
                spanText="Description"
              />
              {/* <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
              /> */}
              {/* <textarea
                placeholder="Content"
                value={form.content}
                onChange={e => setForm({ ...form, content: e.target.value })}
              /> */}
              {/* {edit && <button type="submit">done</button>} */}
              {edit && <Button text="Done" type="submit" />}
            </form>
          </>
        ) : null}
        {/* <button onClick={() => updateHabit(data)}>
          {!edit ? "edit" : "cancel"}
        </button> */}
        <Button
          text={!edit ? "edit" : "cancel"}
          type="button"
          onClick={() => updateHabit(data)}
        />
      </div>
    );
  } else {
    return null;
  }
};

export default Update;
