import React, { Component } from 'react'
import PropTypes from 'prop-types'
import weightedRandom from './utils/weightedRandom'
import getUserIdentifier from './utils/getUserIdentifier'
import getWeight from './utils/getWeight'


export default class Experiment extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onChoice: PropTypes.func,
    onRawChoice: PropTypes.func,
    userIdentifier: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    variantName: PropTypes.string,
  }

  constructor(props) {
    super(props)

    this.state = {}
    this.state.activeVariant = this._chooseVariant(this.props, true)
  }

  componentWillReceiveProps(nextProps) {
    const { name, children, userIdentifier, variantName } = this.props
    const isNewExperiment = (
      nextProps.name !== name
      || nextProps.userIdentifier !== userIdentifier
      || nextProps.variantName !== variantName
    )

    if (!isNewExperiment && nextProps.children === children) {
      return
    }

    this.setState({
      activeVariant: this._chooseVariant(nextProps, isNewExperiment),
    })
  }

  getActiveVariant() {
    return this.state.activeVariant
  }

  getName() {
    return this.props.name
  }

  getVariant(variantName) {
    const children = React.Children.toArray(this.props.children)

    return children.find(element => (
      this._isVariant(element) && element.props.name === variantName
    ))
  }

  _chooseVariant(props, isNewExperiment) {
    if (props.variantName) {
      const variant = this.getVariant(props.variantName)

      if (isNewExperiment && variant) {
        this._onChoice(props, variant)
      }

      return variant
    }

    const children = React.Children.toArray(props.children)
    const activeVariantName = this.state.activeVariant && this.state.activeVariant.props.name
    const variants = [], weights = []

    for (const element of children) {
      if (!this._isVariant(element)) {
        continue
      }

      if (!isNewExperiment && activeVariantName === element.props.name) {
        return element
      }

      variants.push(element)
      weights.push(getWeight(element.props.weight))
    }

    const randomSeed = getUserIdentifier(props.userIdentifier)
    const index = weightedRandom(weights, randomSeed)

    if (index === -1) {
      return null
    }

    const variant = variants[index]
    this._onChoice(props, variant)

    return variant
  }

  _isVariant(element) {
    if (!React.isValidElement(element)) {
      return false
    }

    if (element.type.displayName !== 'ExperimentVariant') {
      throw new Error('Experiment children must be Variant components.')
    }

    return true
  }

  _onChoice(props, variant) {
    if (props.onChoice instanceof Function) {
      props.onChoice(props.name, variant.props.name)
    }

    if (props.onRawChoice instanceof Function) {
      props.onRawChoice(this, variant)
    }
  }

  render() {
    return this.state.activeVariant
  }
}
