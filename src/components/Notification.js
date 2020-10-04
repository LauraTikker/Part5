import React from 'react'

const Notification = ({ message, errorType }) => {

  if (message === null) {
    return null
  }

  if (errorType === 'notice') {
    return (
      <div className="notice">
        {message}
      </div>
    )
  }

  if (errorType === 'error')  {
    return (
      <div className="error">
        {message}
      </div>
    )
  }

}

export default Notification