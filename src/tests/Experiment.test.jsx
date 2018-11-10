import React from 'react'
import { configure, shallow } from 'enzyme'
import Experiment from '../Experiment'
import Variant from '../Variant'
import Adapter from 'enzyme-adapter-react-16'


configure({ adapter: new Adapter() })


it('test variantName', () => {
  let name = ''

  const wrapper = shallow(
    <Experiment
      name="Test"
      variantName={'B'}
      onChoice={(a, b) => name = `${a} ${b}`}
    >
      <Variant name="A">
        <div>test1</div>
      </Variant>
      <Variant name="B"><span>test2</span></Variant>
    </Experiment>,
  )

  expect(name).toEqual('Test B')
  expect(wrapper.contains(<div>test1</div>)).toEqual(false)
  expect(wrapper.contains(<span>test2</span>)).toEqual(true)
})

it('test onChoice', () => {
  let name = ''

  const wrapper = shallow(
    <Experiment
      name="Test"
      onChoice={(a, b) => name = `${a} ${b}`}
      userIdentifier={0}
    >
      <Variant name="A">
        <div>Test A</div>
      </Variant>
      <Variant name="B">
        <div>Test B</div>
      </Variant>
    </Experiment>,
  )

  expect(wrapper.contains(<div>{name}</div>)).toEqual(true)
})

it('test onRawChoice', () => {
  let name = ''

  const wrapper = shallow(
    <Experiment
      name="Test"
      onRawChoice={(a, b) => name = `${a.props.name} ${b.props.name}`}
      userIdentifier={0}
    >
      <Variant name="A">
        <div>Test A</div>
      </Variant>
      <Variant name="B">
        <div>Test B</div>
      </Variant>
    </Experiment>,
  )

  expect(wrapper.contains(<div>{name}</div>)).toEqual(true)
})

it('test componentWillReceiveProps', () => {
  let name = ''
  const onChoice = (a, b) => name = `${a} ${b}`

  const wrapper = shallow(
    <Experiment name="Test" onChoice={onChoice} userIdentifier={24}>
      <Variant name="A">
        <div>A</div>
      </Variant>
      <Variant name="B">
        <div>B</div>
      </Variant>
    </Experiment>,
  )

  // First render
  expect(name).toEqual('Test A')
  expect(wrapper.contains(<div>A</div>)).toEqual(true)

  wrapper.setProps({
    name: 'Test',
    onChoice,
    userIdentifier: 25,
  })

  // With changed userIdentifier
  expect(name).toEqual('Test B')
  expect(wrapper.contains(<div>B</div>)).toEqual(true)

  wrapper.setProps({
    name: 'Test2',
    onChoice,
    userIdentifier: 25,
  })

  // With changed name
  expect(name).toEqual('Test2 B')
  expect(wrapper.contains(<div>B</div>)).toEqual(true)

  let flag = false
  wrapper.setProps({
    name: 'Test2',
    onChoice: () => flag = true,
    userIdentifier: 25,
  })

  // Not be called
  expect(flag).toEqual(false)
  expect(wrapper.contains(<div>B</div>)).toEqual(true)
})

it('test weights', () => {
  let name = ''

  const wrapper = shallow(
    <Experiment
      name="Test"
      onChoice={(a, b) => name = `${a} ${b}`}
      userIdentifier={24}
    >
      <Variant name="A" weight={0}>
        <div>A</div>
      </Variant>
      <Variant name="B">
        <div>B</div>
      </Variant>
    </Experiment>,
  )

  expect(wrapper.contains(<div>B</div>)).toEqual(true)
})


it('test random', () => {
  const stats = { 'A': 0, 'B': 0, 'C': 0 }
  const onChoice = (a, b) => ++stats[b]

  for (let i = 0; i < 100; i++) {
    shallow(
      <Experiment name="Test" onChoice={onChoice} userIdentifier={i}>
        <Variant name="A" weight={1}>
          <div>A</div>
        </Variant>
        <Variant name="B" weight={2}>
          <div>B</div>
        </Variant>
        <Variant name="C" weight={1}>
          <div>C</div>
        </Variant>
      </Experiment>,
    )
  }

  expect(stats).toEqual({ A: 28, B: 55, C: 17 })
})

it('test empty experiment', () => {
  shallow(<Experiment name="Test" />)
})

it('test empty variant', () => {
  shallow(<Experiment name="Test"><Variant name="A" /></Experiment>)
})

it('test wrong variantName', () => {
  const wrapper = shallow(
    <Experiment name="Test" variantName={'C'}>
      <Variant name="A">test1</Variant>
      <Variant name="B">test2</Variant>
    </Experiment>,
  )

  expect(wrapper.contains('test1')).toEqual(false)
  expect(wrapper.contains('test2')).toEqual(false)
})
