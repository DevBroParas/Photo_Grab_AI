const Login = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/api/auth/google";
  };

  const handleGithubLogin = () => {
    window.location.href = "http://localhost:8080/api/auth/github";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Event AI Photo App</h1>
      <button onClick={handleGoogleLogin}>Login with Google</button>
      <br /><br />
      <button onClick={handleGithubLogin}>Login with GitHub</button>
    </div>
  );
};

export default Login;