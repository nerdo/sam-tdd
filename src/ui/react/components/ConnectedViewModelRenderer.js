import { connect } from 'react-redux'
import { ViewModelRenderer } from './ViewModelRenderer'

const mapStateToProps = (state) => {
  const {
    air,
    water,
    list
  } = state

  return {
    air,
    water,
    list
  }
}

export const ConnectedViewModelRenderer = connect(mapStateToProps)(ViewModelRenderer)
