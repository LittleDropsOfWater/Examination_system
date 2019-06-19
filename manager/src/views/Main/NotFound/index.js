import styles from "./index.scss";
function NotFound() {
  return (
    <div className={styles.wrap}>
      <div className={styles.error}>
        {" "}
        <span>Page not found</span>
        <span>404</span>
        <span>Swim Home, Friend</span>
      </div>
      <div className={styles.sun} />
      <div className={styles.clouds}>
        <div />
        <div />
        <div />
      </div>
      <div className={styles.birds} />
      <div className={styles.sea}>
        <div className={`${styles.wave} ${styles.w_1}`} />
        <div className={`${styles.wave} ${styles.w_2}`} />
        <div className={styles.fish}>
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.grass}>
          <span> </span>
          <span> </span>
          <span> </span>
        </div>
        <div className={styles.grass}>
          <span> </span>
          <span> </span>
          <span> </span>
        </div>
        <div className={styles.grass}>
          <span> </span>
          <span> </span>
          <span> </span>
        </div>
        <div className={styles.grass}>
          <span> </span>
          <span> </span>
          <span> </span>
        </div>
        <div className={styles.circle}>
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className={styles.circle}>
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className={styles.circle}>
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className={styles.circle}>
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className={styles.grass_tw} />
        <div className={styles.grass_tw} />
        <div className={styles.grass_tw} />
      </div>
    </div>
  );
}
export default NotFound;
