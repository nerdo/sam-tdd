import React from 'react'
import { Nested } from './Nested';

export function Something () {
  return (
    <React.Fragment>
      <span> SOMETHING </span>
      <Nested />
    </React.Fragment>
  )
}
