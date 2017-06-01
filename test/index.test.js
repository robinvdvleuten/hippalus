import React from 'react';
import { mount } from 'enzyme';
import { Router } from '../src';

const Foo = ({ children }) => {
  return (
    <div>
      <h2>foo</h2>
      {children}
    </div>
  );
};

const Bar = ({ children }) => {
  return (
    <div>
      <h2>bar</h2>
      {children}
    </div>
  );
};

describe('Router', () => {
  it('should render router', () => {
    let router = mount(
      <Router location={{ pathname: '/foo' }}>
        <Foo path="/foo" />
        <Bar path="/bar" />
      </Router>
    );

    expect(router.find(Foo).exists()).toBe(true);
    expect(router.find(Bar).exists()).toBe(false);
  });

  it('should render router with params', () => {
    let router = mount(
      <Router location={{ pathname: '/foo/bar' }}>
        <Foo path="/foo/:id" />
      </Router>
    );

    expect(router.find(Foo).props()).toHaveProperty('id', 'bar');
  });

  it('should render nested router', () => {
    let router = mount(
      <Router location={{ pathname: '/foo/bar' }}>
        <Foo path="/foo/*">
          <Router location={{ pathname: '/foo/bar' }}>
            <Bar path="/foo/bar" />
          </Router>
        </Foo>
      </Router>
    );

    expect(router.find(Foo).exists()).toBe(true);
    expect(router.find(Bar).exists()).toBe(true);
  });
});
