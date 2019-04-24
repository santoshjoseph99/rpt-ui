import React from 'react';
import { shallow, mount } from 'enzyme';
import CommentPage from './CommentPage';
import Button from '@material-ui/core/Button';

class Fixture extends React.Component {
  constructor() {
    super();
    this.state = {
      foo: false,
    };
  }

  render() {
    return (
      <div />
    );
  }
}

const wrapper = shallow(<Fixture />); // mount/render/shallow when applicable
console.log('wrapper: ', wrapper)
expect(wrapper).toHaveState('foo');
expect(wrapper).toHaveState('foo', false);
expect(wrapper).toHaveState({ foo: false });

it('renders without crashing', () => {
  shallow(<CommentPage />);
});

it('renders user logged out components', () => {
  const sut = shallow(<CommentPage />);
  console.log('sut', sut)
  expect(sut).toHaveText('Log In');
  // expect(sut).toHaveState({ loggedIn: false });
  // expect(sut.find(Button)).to.have.lengthOf(2);
});
