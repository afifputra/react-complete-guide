const Container = (props) => {
  const { children, styles } = props;
  return <div className={styles.container}>{children}</div>;
};

export default Container;
