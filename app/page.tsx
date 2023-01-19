import prisma from "../lib/prisma";
import Form from "../comp/Form";
import Delete from "../comp/Delete";
import Update from "../comp/Update";
import styles from "../styles/home.module.scss";
import Box from "../comp/Box";

export const dynamic = "force-dynamic";

const getPosts = async (): Promise<any> => {
  const habits = await prisma?.user.findMany({
    select: {
      name: true,
      id: true,
      email: true,
      habit: {
        select: {
          title: true,
          content: true,
          author: true,
          id: true,
        },
      },
    },
  });
  return habits;
};

const Home = async () => {
  const habits = await getPosts();
  //@ts-ignore
  const checkUser = habits.map(emails => emails.email);

  // console.log(habits);

  return (
    <>
      <div className={styles.home}>
        <Form user={checkUser} />
        <h1>Habits</h1>
        <div className={styles.layout}>
          {/*@ts-ignore*/}
          {habits.sort().map(data => (
            <Box isUser={data.email} key={data.id}>
              <h2>{data.name}</h2>
              {/*@ts-ignore*/}
              {data.habit.map(item => (
                <div className={styles.wrap} key={item.id}>
                  <div className={styles.contentWrap}>
                    <div className={styles.itemWrap}>
                      <h3>Title</h3>
                      <p>{item.title}</p>
                    </div>
                    <div className={styles.itemWrap}>
                      <h3>Description</h3>
                      <p>{item.content}</p>
                    </div>
                  </div>
                  <div className={styles.btn}>
                    <Update data={item} />

                    <Delete userEmail={item.author.email} id={item.id} />
                  </div>
                </div>
              ))}
            </Box>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
