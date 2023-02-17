const BlogForm = ({
  handleCreateBlog,
  title,
  url,
  author,
  handleTitle,
  handleUrl,
  handleAuthor
}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="title"
            onChange={handleTitle}
          />
        </div>
        <div>
          url:
          <input type="text" value={url} name="url" onChange={handleUrl} />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="author"
            onChange={handleAuthor}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default BlogForm;
