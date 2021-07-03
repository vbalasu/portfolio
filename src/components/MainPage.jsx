import React, { Component } from 'react';
import LoginForm from './LoginForm';
import ViewPortfolio from './ViewPortfolio';

class MainPage extends Component {
  state = {  }
  render() { 
    if (this.props.user !== null && this.props.cid !== null) {
      return ( <ViewPortfolio user={this.props.user} cid={this.props.cid} /> );
    }
    else return ( 
      <LoginForm />
    )
  }
}
 
export default MainPage;