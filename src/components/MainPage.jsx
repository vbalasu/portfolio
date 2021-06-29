import React, { Component } from 'react';
import LoginForm from './LoginForm';
import ViewPortfolio from './ViewPortfolio';
import ModifyPortfolio from './ModifyPortfolio';

class MainPage extends Component {
  state = {  }
  render() { 
    if (this.props.user !== null && this.props.cid !== null) {
      if(this.props.token == null) return ( <ViewPortfolio user={this.props.user} cid={this.props.cid} /> );
      else return ( <ModifyPortfolio user={this.props.user} cid={this.props.cid} token={this.props.token} /> );
    }
    else return ( 
      <LoginForm />
    )
  }
}
 
export default MainPage;