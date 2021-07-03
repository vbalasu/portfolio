import React, { Component } from 'react';

class Faq extends Component {
  state = {  }
  render() { 
    return ( 
      <React.Fragment>
        <br />
        <details>
          <summary>Frequently asked questions</summary>
          <br />
          <h6>Question 1</h6>
          <p>Answer 1</p>
          <h6>Question 2</h6>
          <p>Answer 2</p>
        </details>
      </React.Fragment>
     );
  }
}
 
export default Faq;