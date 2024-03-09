import React from 'react'
import './Button.css'
const Button = ({handleChange, nextURL, prevURL}) => {
  return (
    <div className='btn'>
        <button onClick={() => handleChange(false)} disabled={!prevURL}>前へ</button>
        <button onClick={() => handleChange(true)} disabled={!nextURL}>次へ</button>
    </div>
  )
}

export default Button