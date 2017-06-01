// @flow
import React from 'react';
import Regexp from 'path-to-regexp';

const getMatchingChildren = (children, location) => {
  return React.Children.map(children, child => {
    var path = child.props.path || '', keys = [];
    var matches = Regexp(path, keys).exec(location.pathname);

    if (!matches) {
      return null;
    }

    var props = {};
    for (var i = 1, length = matches.length; i < length; ++i) {
      var key = keys[i - 1],
        value = typeof matches[i] === 'string'
          ? decodeURIComponent(matches[i])
          : matches[i];

      if (key && typeof key.name !== 'number') {
        props[key.name] = value;
      }
    }

    return React.cloneElement(child, props);
  });
};

export const Router = (props: { children: React.Children, location: Location }) => {
  var active = getMatchingChildren(props.children, props.location || window.location);

  return active[0] || null;
};
