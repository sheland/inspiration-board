// src/components/test/NewPetForm.test.js
import React from 'react';
import NewCardForm from '../NewCardForm';
import { shallow } from 'enzyme';

describe('NewCardForm', () => {
  it('matches an existing snapshot', () => {
    const wrapper = shallow(
      <NewCardForm
        addCardCallback={() => {} }
        />);

    // Assert that it looks like the last snapshot
    expect(wrapper).toMatchSnapshot();
  });
});
