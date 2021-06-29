import React, { Component } from 'react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';
import { HyperFormula } from 'hyperformula';
import { CSVReader } from 'react-papaparse';

class ViewPortfolio extends Component {
  state = {  }

  componentDidMount() {
    console.log('mounted');
  }

  render() { 
    console.log(this.props);
    return ( <h1>ViewPortfolio</h1> );
  }
}
 
export default ViewPortfolio;