import React from 'react'
import { Nested } from './Nested';

export const Something = React.memo(() => {
  return (
    <span className="something">
      <span> SOMETHING </span>
      <Nested />
    </span>
  )
})
