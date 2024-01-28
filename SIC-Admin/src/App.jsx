import { useState, useEffect } from "react";
import Orders from "./Components/Orders";
import Data from "./Components/Data";

function App() {
  const [login, setLogin] = useState(() => {
    // Check if the user is already logged in using localStorage
    const storedLogin = localStorage.getItem("login");
    return storedLogin ? parseInt(storedLogin, 10) : 0;
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [value, setValue] = useState(() => {
    // Check if the value is stored in localStorage
    const storedValue = localStorage.getItem("value");
    return storedValue ? parseInt(storedValue, 10) : 0;
  });

  const handleValue = (k) => {
    setValue(k);
    // Store the value in localStorage
    localStorage.setItem("value", k.toString());
  };

  const handleLogin = () => {
    // Replace this condition with your actual authentication logic
    if (username === "admin" && password === "admin") {
      setLogin(1);
      // Store the login information in localStorage
      localStorage.setItem("login", "1");
    } else {
      setError("Invalid username or password");
    }
  };

  const handleLogout = () => {
    // Clear login information and value from localStorage
    localStorage.removeItem("login");
    localStorage.removeItem("value");
    setLogin(0);
    setValue(0);
  };

  useEffect(() => {
    // Add any additional logic you need when the login state changes
  }, [login]);

  return (
    <>
      {login === 0 ? (
        <div>
          <h2>Login Form</h2>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={handleLogin}>Login</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      ) : (
        <div>
          <h2>Welcome, Admin!</h2>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={() => handleValue(1)}>Data</button>
          <button onClick={() => handleValue(0)}>Orders</button>

          {value === 0 ? <Orders /> : <Data />}

        </div>
      )}
    </>
  );
}

export default App;

