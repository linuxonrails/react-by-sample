import * as React from 'react';
import { Color } from './color';

interface Props {
  color : Color;
}

export const ColorDisplayer = (props : Props) => {
  // `rgb(${props.color.red},${props.color.green}, ${props.color.blue}) })`
  // 'rgb(' + props.color.red + ', 40, 80)'
  var divStyle = {
    height: '80px',
    backgroundColor: `rgb(${props.color.red},${props.color.green}, ${props.color.blue})`
  };

  return (
    <div>
      <div style={divStyle} />
    </div>
  );
}
