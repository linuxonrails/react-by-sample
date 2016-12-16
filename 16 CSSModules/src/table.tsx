const css = require('react-css-modules');
const styles = require('./table.css');

import * as React from 'react';

@css(styles)
class Table extends React.Component<{}, {}> {
  render() {
    return (
      <div styleName='foobar'>
        This should be in red color!
      </div>
    );
  }
}

export { Table };
