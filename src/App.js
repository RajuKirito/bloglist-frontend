import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Toggler from "./components/Toggler";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [blogs]);

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("blogUser"));
    setUser(user);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("blogUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
      setUser(user);
    } catch (exception) {
      setMessage("invalid credentials");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  const loginForm = () => {
    return (
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        password={password}
        handleUsername={({ target }) => setUsername(target.value)}
        handlePassword={({ target }) => setPassword(target.value)}
      />
    );
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      await blogService.create({
        content: {
          title: title,
          url: url,
          author: author
        },
        token: user.token
      });

      blogService.getAll().then((blogs) => setBlogs(blogs));

      setMessage(title + " by " + author + " added successfully");
      setTimeout(() => {
        setMessage("");
      }, 5000);

      setTitle("");
      setUrl("");
      setAuthor("");
    } catch (exception) {
      setMessage("Can't add note");
      setTimeout(() => {
        setMessage("");
      }, 5000);

      console.log(exception);
    }
  };

  const createBlog = () => {
    return (
      <Toggler openButtonLabel="create blog" closeButtonLabel="cancel">
        <BlogForm
          handleCreateBlog={handleCreateBlog}
          title={title}
          url={url}
          author={author}
          handleTitle={({ target }) => setTitle(target.value)}
          handleUrl={({ target }) => setUrl(target.value)}
          handleAuthor={({ target }) => setAuthor(target.value)}
        />
      </Toggler>
    );
  };

  return (
    <div>
      <Notification message={message} />
      <h2>blogs</h2>
      {!user ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.username} is signed in{" "}
            <button
              onClick={() => {
                window.localStorage.removeItem("blogUser");
                setUser(null);
              }}
            >
              Logout
            </button>
          </p>

          {createBlog()}

          {blogs
            .sort((blog1, blog2) => blog2.likes - blog1.likes)
            .map((blog) => (
              <Blog key={blog.id} blog={blog} user={user} />
            ))}
        </div>
      )}
    </div>
  );
};

export default App;
