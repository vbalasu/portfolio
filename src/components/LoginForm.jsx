import React, { Component } from 'react';

class LoginForm extends Component {
  state = {  }
  render() { 
    if (this.props.isLoggedIn) return (<p>Hello user</p>)
    else return ( <span className="text-left">Please log in</span> );
  }
}
 
export default LoginForm;