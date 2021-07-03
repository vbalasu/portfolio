import React, { Component } from 'react';
import { main } from './utility';

class ViewPortfolio extends Component {
  validStates = ['1-ready', '2-waitingForTokenGen', '3-enterToken', '4-sendingData']
  state = {
    status: '1-ready'
  }
  saveButton = async () => {
    console.log('Save button');
    if(this.state.status === '1-ready') {
      this.setState({status: '2-waitingForTokenGen'});
      var response = await fetch(`https://email-authentication.cloudmatica.com/generate/${this.props.user}`);
      var result = await response.json();
      this.setState({status: '3-enterToken'});
      console.log(result);  
    }
    else if (this.state.status === '3-enterToken') {
      this.setState({status: '4-sendingData'});
      console.log('Sending data');
      var token = document.getElementById('token').value
      var body = window.hot1.getPlugin('exportFile').exportAsBlob('csv');
      response = await fetch(`https://portfolio-api.cloudmatica.com/put/${this.props.user}/${this.props.cid}/${token}`, 
        {method: 'PUT', headers: {'Content-Type': 'text/csv'}, body: body});
      result = await response.json();
      if(!result) alert('Unable to save');
      this.setState({status: '1-ready'})
    }
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
        <span>
          { this.state.status === '3-enterToken' ? <input className="m-2 col-sm-5" type="text" id="token" name="token" placeholder="OTP (Check your email)" /> : <div></div> }
          { this.state.status === '2-waitingForTokenGen' || this.state.status === '4-sendingData' ? <button className="btn btn-primary" type="button" disabled>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Please Wait...
            </button>
          : <button className="btn btn-primary" onClick={this.saveButton}>Save</button>
          }
        </span>

        <br /><br />
        <h2>Coingecko Prices</h2>
        <div style={{height:"400px"}}>
          <div id="hot2"></div>
        </div>
      </React.Fragment> );
  }
}
 
export default ViewPortfolio;