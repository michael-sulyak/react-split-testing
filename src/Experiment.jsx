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
    this.state.activeVariant = this._chooseVariant(true)
  }

  componentDidUpdate(prevProps) {
    const { name, children, userIdentifier, variantName } = this.props
    const isNewExperiment = (
      prevProps.name !== name
      || prevProps.userIdentifier !== userIdentifier
      || prevProps.variantName !== variantName
    )

    if (!isNewExperiment && prevProps.children === children) {
      return
    }

    this.setState({
      activeVariant: this._chooseVariant(prevProps, isNewExperiment),
    })
  }

  getActiveVariant() {
    return this.state.activeVariant
  }

  getActiveVariantName() {
    return this.state.activeVariant && this.state.activeVariant.props.name
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

  _chooseVariant(isNewExperiment) {
    const { variantName, userIdentifier } = this.props

    if (variantName) {
      const variant = this.getVariant(variantName)

      if (isNewExperiment && variant) {
        this._onChoice(variant)
      }

      return variant
    }

    const children = React.Children.toArray(this.props.children)
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

    const randomSeed = getUserIdentifier(userIdentifier)
    const index = weightedRandom(weights, randomSeed)

    if (index === -1) {
      return null
    }

    const variant = variants[index]
    this._onChoice(variant)

    return variant
  }

  _isVariant(element) {
    if (!React.isValidElement(element)) {
      return false
    }

    if (!element.type.isVariant) {
      throw new Error('Experiment children must be Variant components.')
    }

    return true
  }

  _onChoice(variant) {
    const { onChoice, onRawChoice, name } = this.props

    if (onChoice instanceof Function) {
      onChoice(name, variant.props.name)
    }

    if (onRawChoice instanceof Function) {
      onRawChoice(this, variant)
    }
  }

  render() {
    return this.state.activeVariant
  }
}
