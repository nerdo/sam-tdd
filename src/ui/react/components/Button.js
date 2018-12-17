import React from 'react'

export const Button = React.memo((props) => {
  const { onClick, children } = props

  let button

  if (onClick) {
    button = <button onClick={onClick}>{children}</button>
  } else {
    button = <button disabled>{children}</button>
  }

  return button
})
