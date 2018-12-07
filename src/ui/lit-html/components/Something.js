import { html } from 'lit-html'
import { Nested } from './Nested';

export const Something = html`
  <span> SOMETHING </span>
  ${Nested}
`
