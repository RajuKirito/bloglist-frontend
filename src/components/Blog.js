import { useState } from "react";
import blogServices from "../services/blogs";

const Blog = ({ blog, user }) => {
  const [show, setShow] = useState(false);
  const hideWhenVisible = show ? "none" : "";
  const showWhenVisible = show ? "" : "none";

  // const blogStyle;

  const handleToggler = () => {
    setShow(!show);
  };

  const handleUpdateBlog = () => {
    blogServices.updateLikes({ blog: blog, token: user.token });
  };

  const handleDeleteBlog = () => {
    blogServices.deleteBlog({ blog: blog, token: user.token });
  };

  return (
    <div
      style={{
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5
      }}
    >
      <div style={{ display: hideWhenVisible }}>
        {blog.title} {blog.author}
        <button onClick={() => handleToggler()}>show</button>
      </div>
      <div style={{ display: showWhenVisible }} className="blogInvisible">
        {blog.title} {blog.author}
        <button onClick={() => handleToggler()}>hide</button>
        <p>
          <a href={blog.url}>{blog.url}</a>
        </p>
        <p>
          {blog.likes}
          <button onClick={() => handleUpdateBlog()}>like</button>
        </p>
        <p>{blog.creator.username}</p>
        <button onClick={() => handleDeleteBlog()}>Delete</button>
      </div>
    </div>
  );
};

export default Blog;
