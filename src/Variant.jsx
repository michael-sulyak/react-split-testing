import React, { Component } from 'react'
import PropTypes from 'prop-types'
import getWeight from './utils/getWeight'


export default class Variant extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    weight: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }

  static isVariant = true

  getName() {
    return this.props.name
  }

  getWeight() {
    return getWeight(this.props.weight)
  }

  render() {
    return this.props.children
  }
}
