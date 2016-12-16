import * as React from 'react';
import { Table } from './table';
import {Color} from './color';
import {ColorPicker} from './colorpicker';
import {ColorDisplayer} from './colordisplayer';

// const styles = require('./app.css');

interface State {
  color : Color;
}

export class App extends React.Component<{}, State> {
  constructor(props) {
    super(props);

    this.state = {color: {red: 90, green: 50, blue: 70}};
  }

  setColorState(newColor : Color) {
    this.setState({color: newColor});
  }

  public render() {
    return (
      <div>
        <Table />
      </div>
    );
  }
}
