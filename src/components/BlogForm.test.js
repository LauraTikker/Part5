import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'
import BlogService from '../services/blogs'

jest.mock('BlogService')

test('render blogForm', () => {

  const newBlogPost = [{
    author: 'Georg Fox'
  }]

  BlogService.create.mockResolvedValue(newBlogPost)

  const mockShowNoteHandler = jest.fn()

  const mockAddPostHandler = jest.fn()

  const component = render (
    <BlogForm showNotice={mockShowNoteHandler} addPost={mockAddPostHandler}/>
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'Animals of the world' }
  })

  fireEvent.change(author, {
    target: { value: 'Georg Fox' }
  })

  fireEvent.change(url, {
    target: { value: 'www.animalsoftheworld.com' }
  })
  fireEvent.submit(form)

  component.debug()

  expect(mockAddPostHandler.mock.calls).toHaveLength(1)
  expect(mockShowNoteHandler.mock.calls).toHaveLength(1)
  expect(mockAddPostHandler.mock.calls[0][0].content).toBe('Animals of the world' )
})