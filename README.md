# react-split-testing

[![NPM](https://img.shields.io/npm/v/react-split-testing.svg?style=flat-square)](https://www.npmjs.com/package/react-split-testing)  [![Scrutinizer Code Quality](https://img.shields.io/scrutinizer/g/expert-m/react-split-testing.svg?style=flat-square)](https://scrutinizer-ci.com/g/expert-m/react-split-testing/?branch=master)  [![Build Status](https://img.shields.io/scrutinizer/build/g/expert-m/react-split-testing.svg?style=flat-square)](https://scrutinizer-ci.com/g/expert-m/react-split-testing/build-status/master)  [![GitHub Issues](https://img.shields.io/github/issues/expert-m/react-split-testing.svg?style=flat-square)](https://github.com/expert-m/react-split-testing/issues)  [![Gitter](https://img.shields.io/badge/gitter-join_chat-blue.svg?style=flat-square)](https://gitter.im/expert_m/react-split-testing)  [![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)

Wrap components in [`<Variant />`](#variant-) and nest in [`<Experiment />`](#experiment-). A variant is chosen randomly and saved to local storage.

```js
<Experiment name="My Example">
  <Variant name="A">
    <div>Version A</div>
  </Variant>
  <Variant name="B">
    <div>Version B</div>
  </Variant>
</Experiment>
```

#### [Example](https://github.com/expert-m/react-split-testing/tree/master/examples/simple) ([Demo](https://expert-m.github.io/react-split-testing/))

## Table Of Contents
- [Installation](#installation)
    - [npm](#npm)
    - [yarn](#yarn)
- [Usage](#usage)
- [Server Rendering](#server-rendering)
- [API Reference](#api-reference)
  - [`<Experiment />`](#experiment-)
  - [`<Variant />`](#variant-)
- [License](#license)

## Installation

#### npm
```bash
npm install react-split-testing
```

#### yarn
```bash
yarn add react-split-testing
```

## Usage

```jsx
import { Experiment, Variant } from 'react-split-testing'

class App extends Component {
  render() {
    return (
      <Experiment
        ref="experiment"
        name="My experiment"
        onChoice={(experimentName, variantName) => console.log(experimentName, variantName)}
      >
        <Variant name="A">
          <div>Section A</div>
        </Variant>
        <Variant name="B">
          <div>Section B</div>
        </Variant>
      </Experiment>
    )
  }
}
```

[back to top](#table-of-contents)

---

### Server Rendering
A [`<Experiment />`](#experiment-) with a `userIdentifier` property will choose a consistent [`<Variant />`](#variant-) suitable for server side rendering.

#### Example

```jsx
import { Experiment, Variant } from 'react-split-testing'

class App extends Component {
  render() {
    return (
      <Experiment name="My experiment" userIdentifier={this.props.userIdentifier}>
        <Variant name="A">
          <div>Section A</div>
        </Variant>
        <Variant name="B">
          <div>Section B</div>
        </Variant>
      </Experiment>
    )
  }
}
```

[back to top](#table-of-contents)

---

## API Reference

### `<Experiment />`

Experiment container component. Children must be of type [`Variant`](#variant-).

* **Properties:**
  * `name` - Name of the experiment.
    * **Required**
    * **Type:** `string`
    * **Example:** `"My Example"`
  * `userIdentifier` - Distinct user identifier. Useful for [server side rendering](#server-rendering).
    * **Optional**
    * **Type:** `string`
    * **Example:** `"lMMaTqA8ODe7c36hhf2N"`
  * `variantName` - Name of the variant. When defined, this value is used to choose a variant. This property may be useful for [server side rendering](#server-rendering).
    * **Optional**
    * **Type:** `string`
    * **Example:** `"A"`
  * `onChoice` - Called when a [`Variant`](#variant-) has been chosen for your [`Experiment`](#experiment-).
    * **Optional**
    * **Type:** `function`
    * **Example:** `(experimentName, variantName) => { console.log(experimentName, variantName) }`
  * `onRawChoice` - Same as `onChoice`, but the objects passed are React component instances.
    * **Optional**
    * **Type:** `function`
    * **Example:** `(experiment, variant) => { console.log(experimentName.getName(), variant.props.name) }`

* **Methods:**
  * `getName()` - Returns the [`Experiment`](#experiment-) name.
  * `getActiveVariant()` - Returns the currently displayed [`Variant`](#variant-).
  * `getVariant(variantName)` - Returns the instance of the specified [`Variant`](#variant-) name.

[back to top](#table-of-contents)

---

### `<Variant />`

Variant container component.

* **Properties:**
  * `name` - Name of the variant.
    * **Required**
    * **Type:** `string`
    * **Example:** `"A"`
  * `weight` - The variants will be chosen according to the ratio of the numbers, for example variants `A`, `B`, `C` with weights `1`, `2`, `2` will be chosen 20%, 40%, and 40% of the time, respectively.
    * **Optional**
    * **Type:** `number`
    * **Default:** `1`
    * **Example:** `2`

* **Methods:**
  * `getName()` - Returns the [`Variant`](#variant-) name.
  * `getWeight()` - Returns the [`Variant`](#variant-) weight.

[back to top](#table-of-contents)

---

## License
MIT
