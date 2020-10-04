import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
//import { prettyDOM } from '@testing-library/dom'

test('render blog', () => {
  const blog = {
    author: 'Sanna Niine',
    url: 'metsa.ee',
    title: 'Kuusk',
    likes: 23,
    id: '5ee60853b9bc2e11f88bf065'
  }

  const user = {
    name: 'Saane Niine'
  }

  const component = render(
    <Blog blog={blog} key={blog.id} user={user}/>
  )
  component.debug()

  expect(component.container).toHaveTextContent(
    'Kuusk'
  )

  expect(component.container).toHaveTextContent(
    'Sanna Niine'
  )

  expect(component.container).not.toHaveTextContent(
    'metsa.ee'
  )

  expect(component.container).not.toHaveTextContent(
    '23'
  )

  const element = component.getByText('View details')
  expect(element).toBeDefined()
})

test('render blog details, when button is clicked', () => {
  const blog = {
    author: 'Sanna Niine',
    url: 'metsa.ee',
    title: 'Kuusk',
    likes: 23,
    id: '5ee60853b9bc2e11f88bf065'
  }

  const user = {
    name: 'Saana Niine'
  }

  const component = render(
    <Blog blog={blog} key={blog.id} user={user}/>
  )

  const button = component.getByText('View details')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'metsa.ee'
  )
  expect(component.container).toHaveTextContent(
    '23'
  )

  component.debug()
})

test('clicking the like button', () => {
  const blog = {
    author: 'Sanna Niine',
    url: 'metsa.ee',
    title: 'Kuusk',
    likes: 23,
    id: '5ee60853b9bc2e11f88bf065'
  }

  const user = {
    name: 'Saana Niine'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} key={blog.id} user={user}/>
  )

  const button = component.getByText('View details')
  fireEvent.click(button)

  const likeButton = component.getByText('like')
  likeButton.onclick = mockHandler
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)

  component.debug()
})
