import React, { Component } from 'react';
import { main } from './utility';

class ViewPortfolio extends Component {
  state = { 
    mode: 'view'
   };
  editMode = () => {
    console.log('Edit mode');
    this.setState({mode: 'edit'});
  }

  componentDidMount() {
    console.log('mounted');
    main(this.props.user, this.props.cid);
  }
  componentDidUpdate() {
    console.log('updated')
  }

  render() { 
    console.log(this.props);
    return ( 
      <React.Fragment>
        <h2>Crypto Portfolio</h2>
        <div style={{height:"400px"}}>
          <div id="hot1"></div>
        </div>
        <button className="btn btn-primary" onClick={this.editMode}>Save</button>
        <br /><br />
        <h2>Crypto Prices</h2>
        <div style={{height:"400px"}}>
          <div id="hot2"></div>
        </div>
      </React.Fragment> );
  }
}
 
export default ViewPortfolio;