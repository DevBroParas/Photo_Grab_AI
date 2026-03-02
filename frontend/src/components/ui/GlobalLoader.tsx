
const GlobalLoader = () => {
  return (
    <div style={styles.container}>
      <div style={styles.spinner}></div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafb",
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "5px solid #ddd",
    borderTop: "5px solid #3b82f6",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

export default GlobalLoader;