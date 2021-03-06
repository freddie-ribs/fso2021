import service from "../service"
const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

export const addBlog = newBlog => async dispatch => {
  const newAnecdote = await service.create(newBlog)
  dispatch({
    type: "CREATE_BLOG",
    payload: {
      content: newAnecdote.content,
      votes: newAnecdote.votes,
      id: newAnecdote.id,
    },
  })
}

export const likeBlog = anecdote => async dispatch => {
  const votedAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1,
  }
  const updatedAnecdote = await service.update(votedAnecdote)
  const id = updatedAnecdote.id
  dispatch({ type: "VOTE", payload: { id } })
}

export const initializeAnecdotes = () => async dispatch => {
  const anecdotes = await service.getAll()
  dispatch({
    type: "INIT",
    payload: anecdotes,
  })
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      return state.map(blog =>
        blog.id === action.payload.id
          ? { ...blog, votes: blog.votes + 1 }
          : blog
      )
    case "CREATE_BLOG":
      const newBlog = asObject(action.payload.content)
      const updatedState = [...state, newBlog]
      return updatedState
    case "INIT":
      return action.payload
    default:
      return state
  }
}

export default reducer
