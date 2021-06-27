import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import LoginForm from './components/LoginForm'; 

function App() {
  return (
    <div className="App">
      <NavBar />
      <LoginForm isLoggedIn={false} />
    </div>
  );
}

export default App;
