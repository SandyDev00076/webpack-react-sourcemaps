import styles from "./Hello.module.scss";

const Hello = () => {
  function doSomething() {
    console.log("doing something");
  }

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <h1 className={styles.greeting}>Hello</h1>
        <h2 className={styles.secondLine}>
          webpack <strong>roxx</strong>
        </h2>
        <button onClick={doSomething}>Do something</button>
      </div>
    </div>
  );
};

export default Hello;
