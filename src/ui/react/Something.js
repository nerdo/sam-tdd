import React from 'react'
import { Nested } from './Nested';

export const Something = React.memo(() => {
  return (
    <React.Fragment>
      <span> SOMETHING </span>
      <Nested />
    </React.Fragment>
  )
})
