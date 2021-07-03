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
          <h5>1. What does this app do?</h5>
          <p>This app allows you to track your crypto portfolio's value in US dollars.</p>
          <h5>2. Where do the prices come from?</h5>
          <p>The prices are provided by <a href="https://coingecko.com">Coingecko</a>. 
          The top 250 crypto assets by market value are included.</p>
          <h5>3. How to manage my holdings?</h5>
          <p>The app provides a simple spreadsheet interface to manage your holdings. 
            Each row of the spreadsheet is a specific crypto asset held at a specific location 
            - for example, Bitcoin (BTC) held on Coinbase.
            Unlike other portfolio trackers that have a fixed interface, this app lets you 
            customize the spreadsheet as you wish.</p>
          <h5>4. How to lookup prices?</h5>
          <p>Just like Excel or Google sheets, you use VLOOKUP formulas to look up the prices of specific currencies
            or tokens. You reference the <pre>coingecko</pre> sheet to specify the range. 
            For example, the following formula returns the price of bitcoin: 
            <pre>=VLOOKUP("BTC",coingecko!A:B,2,"false")</pre>
            To get the latest prices, simply refresh the page.
          </p>
          <h5>5. What calculations can I perform?</h5>
          <p>This app includes a powerful formula engine. You can use any of the functions 
            listed <a href="https://handsontable.github.io/hyperformula/guide/built-in-functions.html">on this page</a>. 
            You can even nest functions inside other functions. You are only limited by your imagination!</p>
          <h5>6. How can I add more rows?</h5>
          <p>Simply right-click (or hold your finger if you are using a smartphone) to reveal a context menu.
            Choose "Insert row below" to insert a new row. You may need to adjust the formulas in the 
            Total row (at the bottom of the sheet) to include the new row(s).
          </p>
          <h5>7. How to save my changes?</h5>
          <p>After you are finished making changes, simply click on the Save button.
          Each change needs to be authenticated. You will receive a one-time password (OTP) at the email address 
          you specified. Paste in the OTP and click on save again.</p>
          <h5>8. Is my portfolio private?</h5>
          <p>Your default portfolio is simply named "portfolio" and does not require authentication to view. 
            Notice that the URL of your browser shows a content id (eg. cid=portfolio). You can create as many portfolios
            as you like, including private portfolios (see #9 below).
          </p>
          <h5>9. How to create private portfolios?</h5>
          Simply change the content id (cid) appearing in the browser's address bar to some long string that only you know,
          and is difficult for others to guess. This will generate a new portfolio that you can edit and save as usual.
          Be sure to note down the cid you specify, as you will need it to return to this private portfolio.
          If you wish, you can bookmark the page for convenience.
          <p></p>
        </details>
      </React.Fragment>
     );
  }
}
 
export default Faq;