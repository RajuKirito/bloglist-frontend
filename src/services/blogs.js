import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (content) => {
  console.log(content);
  // console.log(token);
  const request = axios.post(baseUrl, content.content, {
    headers: {
      Authorization: "Bearer " + content.token
    }
  });
  return request.then((res) => res.data);
};

const updateLikes = (props) => {
  const newBlog = {
    likes: props.blog.likes + 1,
    title: props.blog.title,
    url: props.blog.url,
    author: props.blog.author
  };
  const request = axios.put(`${baseUrl}/${props.blog.id}`, newBlog, {
    headers: {
      Authorization: "Bearer " + props.token
    }
  });
  return request.then((res) => res.data);
};

const deleteBlog = async (props) => {
  console.log("Here with blog ", props.blog.id, " ", props.blog.title);
  const confirm = window.confirm(
    `Do you really want to delete ${props.blog.title} by ${props.blog.author}?`
  );
  if (confirm) {
    await axios.delete(`${baseUrl}/${props.blog.id}`, {
      headers: {
        Authorization: "Bearer " + props.token
      }
    });
  }
};

export default { getAll, create, updateLikes, deleteBlog };
