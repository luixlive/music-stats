import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { shallow, mount } from 'enzyme';

import AppComponent, {
  App,
} from './../../../app/components/app';
import { AppFooter } from './../../../app/components';
import { AppHeaderContainer } from './../../../app/components/containers';
import initialState from './../../test_utils/initial_state';

describe('App Components - App', () => {
  describe('Behavior', () => {
    const children = [<div key="0" />];
    let wrapper;
    beforeAll(() => {
      const props = { children };
      wrapper = shallow(<App {...props} />);
    });

    it('renders', () => {
      expect(wrapper.length).toEqual(1);
    });

    it('renders the header', () => {
      expect(wrapper.find('div').get(0).props.children[0])
        .toEqual(<AppHeaderContainer />);
    });

    it('renders the children', () => {
      expect(wrapper.find('div').get(0).props.children[1])
        .toEqual(children);
    });

    it('renders the footer', () => {
      expect(wrapper.find('div').get(0).props.children[2])
        .toEqual(<AppFooter />);
    });
  });

  describe('Provider', () => {
    const mockStore = configureStore();
    let store;
    let wrapper;
    beforeAll(() => {
      store = mockStore(initialState);
      const props = { children: [<div key="0" />] };
      // We need the router because sizeDetector is exported with "withRouter"
      wrapper = mount((
        <MemoryRouter>
          <Provider store={store}>
            <AppComponent {...props} />
          </Provider>
        </MemoryRouter>
      ));
    });

    it('renders', () => {
      expect(wrapper.find(AppComponent).length).toEqual(1);
    });
  });
});
