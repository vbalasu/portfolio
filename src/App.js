//import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import MainPage from './components/MainPage'; 

function App() {
  let queryString = window.location.search;
  console.log('queryString', queryString);
  let urlParams = new URLSearchParams(queryString);
  let user = urlParams.get('user');
  let cid = urlParams.get('cid');
  let token = urlParams.get('token');
  console.log({user:user, cid:cid, token:token});
  return (
    <div className="App">
      <NavBar />
      <MainPage user={user} cid={cid} token={token} />
    </div>
  );
}

export default App;
