import React, { Component } from 'react';
import { main } from './utility';



class ViewPortfolio extends Component {
  state = {  };

  componentDidMount() {
    console.log('mounted');
    main();
  }

  render() { 
    console.log(this.props);
    return ( 
      <React.Fragment>
        <h1>ViewPortfolio</h1>
        <div style={{height:"400px"}}>
          <div id="hot1"></div>
        </div>
        <div style={{height:"400px"}}>
          <div id="hot2"></div>
        </div>
      </React.Fragment> );
  }
}
 
export default ViewPortfolio;