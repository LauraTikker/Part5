import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const change = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const url = baseUrl + '/' + newObject.newblog.id
  const response = await axios.put(url, newObject.newblog, config)
  return response.data
}

const deleteBlog = async deletedObject => {
  const config = {
    headers: { Authorization: token }
  }
  const url = baseUrl + '/' + deletedObject.blog.id
  const response = await axios.delete(url, config)
  console.log(response)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)

  const sortedBlogs = response.data.sort((a, b) => a.likes > b.likes ? -1 : a.likes < b.likes ? 1 : 0)

  return sortedBlogs
}

export default { getAll, setToken, create, change, deleteBlog }