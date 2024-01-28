import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import UsageCharges from './Components/Usage-Charges';
import Instruments from './Components/Instruments';
import RegistrationForm from './Components/Registration';
import LoginForm from './Components/Login';
import Profile from './Components/Profile';

function App() {
  const [value, setValue] = useState(() => {
    // Use localStorage value or default to 0
    return parseInt(localStorage.getItem('value'), 10) || 0;
  });

  const [user, setUser] = useState(null);

  const [login, setLogin] = useState(() => {
    // Use localStorage value or default to 0
    return parseInt(localStorage.getItem('login'), 10) || 0;
  });

  const handleLogin = (userData) => {
    setLogin(1);
    setValue(6);
    setUser(userData); // Set the user state with the received user data
  };

  useEffect(() => {
    // Update localStorage when the state changes
    localStorage.setItem('value', value.toString());
    localStorage.setItem('login', login.toString());
  }, [value, login]);

  useEffect(() => {
    // Check if there is a user email in localStorage
    const storedUserEmail = localStorage.getItem('userEmail');

    if (storedUserEmail) {
      // If there is a user email, set the user state
      setUser(storedUserEmail);
    } else {
      // If there is no user email, set the user state to null
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    setLogin(0);
    setValue(0);
  };

  const handleButtonClick = (newValue) => {
    setValue(newValue);
  };
  if (value === 0) {
    return (
      <>
        <div className="app">
          <Navbar onButtonClick={handleButtonClick} login={login} onLogin={handleLogout} />
        </div>
        <Home />
      </>
    );
  }
  else if (value === 1) {
    return (
      <>
        <div className="app">
          <Navbar onButtonClick={handleButtonClick} login={login} onLogin={handleLogout} />
        </div>
        <About />
      </>
    );
  }
  else if (value === 2) {
    return (
      <>
        <div className="app">
          <Navbar onButtonClick={handleButtonClick} login={login} onLogin={handleLogout} />
        </div>
        <UsageCharges />
      </>
    );
  }
  else if (value === 3) {
    return (<>
      <div className="app">
        <Navbar onButtonClick={handleButtonClick} login={login} onLogin={handleLogout} />
      </div>
      <Instruments />
    </>
    );
  }
  else if (value === 4) {
    return <>
      <div className="app">
        <Navbar onButtonClick={handleButtonClick} login={login} onLogin={handleLogout} />
      </div>
      <RegistrationForm onLogin={handleLogin} />
    </>
  }
  else if (value === 5) {
    return <>
      <div className="app">
        <Navbar onButtonClick={handleButtonClick} login={login} onLogin={handleLogout} />
      </div>
      <LoginForm onLogin={handleLogin} />
    </>
  }
  else if (value === 6) {
    return <>
      <div className="app">
        <Navbar onButtonClick={handleButtonClick} login={login} onLogin={handleLogout} />
      </div>
      {user && <Profile userEmail={user} />}
    </>
  }
}

export default App;


