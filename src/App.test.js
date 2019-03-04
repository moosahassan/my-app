import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Profile from './App';

import { shallow, mount, render } from 'enzyme';

import axios from 'axios';
jest.mock('axios');

const user = {
  name: 'John Doe',
  email: 'johndoe@gmail.com',
  username: 'johndoe',
  image: null
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders correctly", () => {
  const wrapper = shallow(
    <App />
  );
  expect(wrapper).toMatchSnapshot();
});

it('calls componentDidMount', () => {
  jest.spyOn(App.prototype, 'componentDidMount')
  const wrapper = shallow(<App />)
  expect(App.prototype.componentDidMount.mock.calls.length).toBe(1)
})

describe ('<Profile />', () => {
  it ('contains h2', () => {
    const wrapper = mount(<Profile user={user} />)
    const value = wrapper.find('h2').text()
    expect(value).toEqual('John Doe')
  })
  it ('accepts user props', () => {
    const wrapper = mount(<Profile key={user.username} user={user} />);
    expect(wrapper.props().user).toEqual(user)
  })
})

it('fetches a list of users', () => {
  const getSpy = jest.spyOn(axios, 'get')
  const wrapper = shallow(
    <App />
  )
  expect(getSpy).toBeCalled()
})
