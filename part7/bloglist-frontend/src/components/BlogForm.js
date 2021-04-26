import React, { useState } from "react"

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const submitBlog = async e => {
    e.preventDefault()
    createBlog({ title, author, url })
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return (
    <div>
      <form onSubmit={submitBlog}>
        title:{" "}
        <input
          id="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <div>
          author:{" "}
          <input
            id="author"
            value={author}
            onChange={e => setAuthor(e.target.value)}
          />
        </div>
        <div>
          url:{" "}
          <input id="url" value={url} onChange={e => setUrl(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default BlogForm
