import React from 'react'

export const Button = ({ text, onClick }) => {
  return (
    <button className='mt-10' onClick={onClick}>
      {text}
    </button>
  )
}
