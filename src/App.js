import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import './App.css'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorType, setErrorType] = useState('notice')
  const [user, setUser] = useState(null)

  useEffect(() =>  {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = React.createRef()

  const handleLogin = async (event) =>  {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      setUser(user)
      console.log(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showNotice('Wrong username or password', 'error')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const showNotice = (message, errorType) => {
    setErrorMessage(message)
    setErrorType(errorType)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const addPost = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    setBlogs(blogs.concat(blogObject))
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel='Log in'>
        <LoginForm
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
          password={password}
          username={username}
        />
      </Togglable>
    )
  }

  const removePost = (blogObject) => {
    setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
  }

  const blogForm = () => {
    return (
      <div>
        <div className="logged-in-user">{user.name}  logged in <button className="log-out-button" onClick={handleLogout}>Log out</button></div>
        <Togglable buttonLabel='Create new post' ref={blogFormRef}>
          <BlogForm
            showNotice={showNotice}
            addPost={addPost}
          />
        </Togglable>
      </div>
    )
  }

  return (
    <div className="document">
      <Notification message={errorMessage} errorType={errorType}/>
      {user === null ? loginForm()
        : blogForm()}
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} removePost={removePost} showNotice={showNotice} />
      )}
    </div>
  )
}

export default App