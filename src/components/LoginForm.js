import PropTypes from "prop-types";

const LoginForm = ({
  handleLogin,
  username,
  password,
  handleUsername,
  handlePassword
}) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username:
        <input
          type="text"
          value={username}
          name="Username"
          onChange={handleUsername}
        />
      </div>
      <div>
        password:
        <input
          type="password"
          value={password}
          name="password"
          onChange={handlePassword}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

//Does nothing to our app. Just prints on console if any of these types are missing
LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsername: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
};

export default LoginForm;
