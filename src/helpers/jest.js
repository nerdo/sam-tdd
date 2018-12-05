/* global jest */
import { implementsInterface } from 'implements-interface'
// import PropTypes from 'prop-types'

export function setupCustomMatchers (expect) {
  expect.extend({
    toImplement (object, Interface) {
      try {
        implementsInterface(object, Interface)
        return {
          message: () => `expected object not to implement ${Interface.name}.`,
          pass: true
        }
      } catch (e) {
        return {
          message: () => e.message,
          pass: false
        }
      }
    }
  })

  // expect.extend({
  //   toMatchPropTypes (props, propTypes, componentName, location = 'prop') {
  //     const messages = []
  //     const spy = jest
  //       .spyOn(global.console, 'error')
  //       .mockImplementation(message => messages.push(message))

  //     // PropTypes.checkPropTypes does some really annoying internal caching by the error message.
  //     // Since React checks prop types at dev time when a component renders, the error message will
  //     // be identical preventing us from detecting it... so I'm de-duping the error messages using
  //     // a timestamp at the end of the component name...
  //     const dedupedComponentName = `${componentName}#${(new Date()).getTime()}`
  //     try {
  //       PropTypes.checkPropTypes(propTypes, props, location, dedupedComponentName)
  //     } finally {
  //       spy.mockRestore()
  //     }

  //     const message = messages.length
  //       ? messages
  //         // Replace the deduped component name with the normal one...
  //         .map(message => message.replace(dedupedComponentName, componentName))
  //         // eslint-disable-next-line quotes
  //         .join("\n")
  //       : 'expected props not to match prop types'

  //     return {
  //       message: () => message,
  //       pass: messages.length === 0
  //     }
  //   }
  // })
}
