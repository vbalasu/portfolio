import React, { Component } from 'react';
import Faq from './Faq';

class LoginForm extends Component {
  state = {  }
  render() { 
    return ( 
      <div className="container">
      <form method="GET">
        <div className="form-group">
        <br></br>
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" name="user" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          <input type="hidden" name="cid" value="portfolio" />
          <br></br><br></br>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <br /><Faq />
      </form>
    </div>       
     );
  }
}
 
export default LoginForm;