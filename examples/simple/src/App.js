import React, { Component } from 'react'
import { Experiment, Variant } from 'react-split-testing'


export default class App extends Component {
  constructor(props) {
    super(props)

    this.experiment = React.createRef()

    this.onClick = this.onClick.bind(this)
    this.onChoice = this.onChoice.bind(this)
    this.onRawChoice = this.onRawChoice.bind(this)
  }

  onClick() {
    const variantName = this.experiment.current.getActiveVariant().props.name
    alert(
      `Experiment name: "${this.experiment.current.getName()}"\n` +
      `Variant name: "${variantName}"`
    )
  }

  onChoice(experimentName, variantName) {
    console.log(
      `Experiment name: "${experimentName}"\n` +
      `Variant name: "${variantName}"`
    )
  }

  onRawChoice(experiment, variant) {
    console.log(
      `Experiment name: "${experiment.getName()}"\n` +
      `Variant name: "${variant.props.name}"\n` +
      `Variant weight: ${variant.props.weight}`
    )
  }

  render() {
    return (
      <div className="App">
        <div className="block">
          <h1>Experiment #1</h1>
          <Experiment
            ref={this.experiment}
            name="Experiment #1"
            onChoice={this.onChoice}
          >
            <Variant name="A">
              <div>Section A</div>
              <button onClick={this.onClick}>Click me</button>
            </Variant>
            <Variant name="B" weight={2}>
              <div>Section B</div>
              <button onClick={this.onClick}>Click me</button>
            </Variant>
            <Variant name="C">
              <div>Section C</div>
              <button onClick={this.onClick}>Click me</button>
            </Variant>
          </Experiment>
        </div>

        <div className="block">
          <h1>Experiment #2</h1>
          <span>(userIdentifier="something")</span>
          <Experiment
            name="Experiment #2"
            userIdentifier="something"
            onRawChoice={this.onRawChoice}
          >
            <Variant name="A">
              <div>Section A</div>
            </Variant>
            <Variant name="B" weight={2}>
              <div>Section B</div>
            </Variant>
          </Experiment>
        </div>

        <div className="block">
          <h1>Experiment #3</h1>
          <span>(variantName="B")</span>
          <Experiment name="Experiment #3" variantName="B">
            <Variant name="A">
              <div>Section A</div>
            </Variant>
            <Variant name="B">
              <div>Section B</div>
            </Variant>
          </Experiment>
        </div>

        <a
          href="https://github.com/expert-m/react-split-testing/tree/master/examples/simple"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >GitHub</a>
      </div>
    )
  }
}
