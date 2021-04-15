import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { likeBlog } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const vote = id => {
    dispatch(likeBlog(id))
  }

  return (
    <>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </>
  )
}

export default AnecdoteList
