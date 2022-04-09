import styles from "./Hello.module.scss";

const Hello = () => {
  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <h1 className={styles.greeting}>Hello</h1>
        <h2 className={styles.secondLine}>
          webpack <strong>roxx</strong>
        </h2>
      </div>
    </div>
  );
};

export default Hello;
