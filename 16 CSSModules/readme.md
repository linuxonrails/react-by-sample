# 16 CSS Modules

In this sample we are going to add CSS Modules to the colorpicker components.

We will take a startup point sample _08 Colorpicker_:

Summary steps:

- Create a simple color slide component.
- Replace the color slider inputs with the new slider.
- Check result.


## Prerequisites

Install [Node.js and npm](https://nodejs.org/en/) (v6.6.0 or newer) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

## Steps to build it

- Copy the content from _08 ColorPicker_ and execute:

  ```
  npm install
  ```

- Install [`style-loader`](https://www.npmjs.com/package/style-loader) with:

  ```
  npm install --save style-loader
  ```

- Install [`css-loader`](https://www.npmjs.com/package/css-loader) with:

  ```
  npm install --save css-loader
  ```

- Setup `/\.css$/` loader:

  ```js
  {
    test: /\.css$/,
    loaders: [
      'style?sourceMap',
      'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
    ]
  }
  ```

- Install [`typed-css-modules`](https://github.com/Quramy/typed-css-modules) with:

  ```
  npm install --save typed-css-modules
  ```

  and [`webpack-shell-plugin`](https://www.npmjs.com/package/webpack-shell-plugin):

  ```
  npm install --save-dev webpack-shell-plugin
  ```

  and patch _./webpack.config.js_:

  ```javascript
  var path = require('path');
  var webpack = require('webpack');
  var HtmlWebpackPlugin = require('html-webpack-plugin');

  const WebpackShellPlugin = require('webpack-shell-plugin');

  // ...

      {
        test: /\.css$/,
        loaders: [
          'style?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5],typed-css-modules'
        ]
      },

  // ...

    plugins: [
      new WebpackShellPlugin({
        onBuildStart: ['tcm src -o css_typings'],
      }),
      // Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
      new HtmlWebpackPlugin({
        filename: 'index.html', // Name of file in ./dist/
        template: 'index.html', // Name of template in ./src
        hash: true
      })
    ]
  }
  ```

- We can create _./src/colordisplayer.css_ and use this in _./src/colordisplayer.tsx_:

  ```css
  .colordisplayer {
    margin: auto;
    border: 1px solid gray;
    width: 120px;
    margin-bottom: 1em;
  }
  ```

  ```jsx
  import * as React from 'react';
  import { Color } from './color';
  import * as styles from './colordisplayer.css';

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
      <div className={styles.colordisplayer}>
        <div style={divStyle} />
      </div>
    );
  }
  ```

- Another example with _./src/app.css_ and _./src/app.tsx_:

  ```css
  .app {
    margin: auto;
    width: 70%;
    min-width: 230px;
  }
  ```

  ```jsx
  // ...
  import * as styles from './app.css';

  // ...

  public render() {
    return (
      <div className={styles.app}>

  // ...
  ```

- Update _./tsconfig.json_:

  ```json
  "rootDirs": ["src", "css_typings"],
  ```

- Let's give a try and check that everything is still working as expected.

  ```
  npm start
  ```

- Install [`react-css-modules`](https://github.com/gajus/react-css-modules) with:

  ```
  npm install --save-dev react-css-modules @types/react-css-modules
  ```

  > @types/react-css-modules [has a BUG](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/12844) but its very easy to fix:
  > replace in node_modules/@types/react-css-modules/index.d.ts
  > `export = CSSModules;`
  > with
  > `export default CSSModules;`

## Decorators

- We will use [decorators](https://www.typescriptlang.org/docs/handbook/decorators.html).
Add the next line in _./tsconfig.json_ after the noLib option:

  ```json
  "experimentalDecorators": true,
  ```

- Create a new `Table` component and stylesheets file:

  _./src/table.css_

  ```css
  .table {
    color: red;
  }
  ```

  _./src/table.tsx_

  ```jsx
  import * as React from 'react';
  import * as styles from './table.css';
  import CSSModules from 'react-css-modules';

  @CSSModules(styles)
  export class Table extends React.Component<{}, {}> {
    render () {
      return (
        <div styleName='foobar'>
          This should be in red color!
        </div>
      );
    }
  }
  ```

  _./src/app.tsx_

  ```jsx
  // ...
  import { Table } from './table';
  // ...
  public render() {
    return (
      <div className={styles.app}>
        <Table />
        <ColorDisplayer
          color={this.state.color}
        />
        //...
  ```




  npm install sass-loader node-sass webpack --save-dev
