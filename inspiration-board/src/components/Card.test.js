import React from 'react';
import Card from './Card';
import { shallow } from 'enzyme';

describe('card', ()=> {
  it('will match the Card Snapshot', ()=> {
    const wrapper = shallow(
      <Card
      key = {1}
      cardText="dog"
      cardEmoji="heart_eyes"
      cardId = {1}
      deleteCardCallback = {()=> {}}
      />);
      expect(wrapper).toMatchSnapshot();

    });
  });
