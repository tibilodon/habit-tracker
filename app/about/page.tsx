import React from "react";
import styles from "../../styles/about.module.scss";

const About = () => {
  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.content}>
          <h1>Welcome to the Habit logger</h1>
          <p>
            In our rushing society it is important to have solid habits we live
            by, or want to implement. On this site you can record your own
            habits, which other people can also see, in that way we can learn
            from each other. What is important to you might not have even
            crossed the other person's mind, in turn they might implement your
            habit(s) in their life.
          </p>
          <p>
            In order to add your habit(s) you need to login with your Google
            account. A clear, red color will indicate your contribution of
            habit(s), which you can delete and edit as long as you are logged
            in. Many thanks for Your contribution!
          </p>
        </div>
        <footer className={styles.footer}>
          <p>
            With any inquiries please contact:{" "}
            <a href="mailto:tibilodondev@gmail.com">tibilodondev@gmail.com</a>
          </p>
          <p>v1.0.0</p>
        </footer>
      </div>
    </>
  );
};

export default About;
