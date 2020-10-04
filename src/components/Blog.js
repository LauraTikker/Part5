import React, { useState } from 'react'
import blogService from '../services/blogs'
import '../App.css'


const Blog = ({ blog, showNotice, user, removePost }) => {
  const [view, setView] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const toggleVisibility = () => {
    setView(!view)
  }

  const details = () => {
    if (view) {
      return (
        <div className="blog-details">
          <div>Url: {blog.url}</div>
          <div id='likes'>Likes: {likes} <button id='likes-button' onClick={handleLikes}>like</button></div>
          <div>{deleteButton()}</div>
        </div>
      )
    }
  }

  const deleteButton = () => {
    if (user)  {
      if (blog.author === user.name) {
        return (<button className="delete-blog" onClick={deleteBlog}>remove</button>)
      }
    } else {
      return null
    }
  }

  const deleteBlog = async (event) => {
    event.preventDefault()
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (result) {
      try {
        const deletedPost = await blogService.deleteBlog({ blog })
        removePost(deletedPost)
        showNotice(`The blog ${blog.author} has been removed`, 'notice')
      } catch (exception){
        showNotice('The blog could not be removed', 'error')
      }
    }
  }

  const handleLikes = async (event) =>  {
    event.preventDefault()
    const newblog = {
      author: blog.author,
      url: blog.url,
      title: blog.title,
      likes: likes + 1,
      id: blog.id
    }

    try {
      const changedBlog = await blogService.change({
        newblog
      })
      setLikes(changedBlog.likes)
    } catch (exception) {
      showNotice('Could not update likes', 'error')
    }
  }


  return (
    <div className="blog">
      {`${blog.title} ${blog.author}`}
      <button onClick={toggleVisibility} id='blog-details-button' className="blog-details-button">View details</button>
      {details()}
    </div>
  )
}
export default Blog
