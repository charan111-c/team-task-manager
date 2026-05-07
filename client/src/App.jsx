import { useState } from "react";
import axios from "axios";

function App() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);

  const login = async () => {

    try {

      const res = await axios.post(
        "https://team-task-manager-production-ce59.up.railway.app/api/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      setLoggedIn(true);

      alert("Login Success");

    } catch (err) {

      alert("Login Failed");
    }
  };

  // DASHBOARD
  if (loggedIn) {

    return (

      <div style={{
        padding: "40px",
        fontFamily: "Arial",
        background: "#f4f4f4",
        minHeight: "100vh"
      }}>

        <h1>Team Task Manager Dashboard</h1>

        {/* CREATE PROJECT BUTTON */}
        <button
          style={{
            padding: "12px",
            marginTop: "20px",
            background: "black",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Create Project
        </button>

        {/* CARDS */}
        <div style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
          flexWrap: "wrap"
        }}>

          <div style={{
            padding: "20px",
            background: "white",
            borderRadius: "10px",
            width: "220px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)"
          }}>
            <h2>Total Projects</h2>
            <p style={{ fontSize: "30px" }}>3</p>
          </div>

          <div style={{
            padding: "20px",
            background: "white",
            borderRadius: "10px",
            width: "220px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)"
          }}>
            <h2>Total Tasks</h2>
            <p style={{ fontSize: "30px" }}>10</p>
          </div>

          <div style={{
            padding: "20px",
            background: "white",
            borderRadius: "10px",
            width: "220px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)"
          }}>
            <h2>Completed</h2>
            <p style={{ fontSize: "30px" }}>5</p>
          </div>

        </div>

        {/* TASK LIST */}
        <div style={{
          marginTop: "40px",
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)"
        }}>

          <h2>Recent Tasks</h2>

          <ul style={{
            lineHeight: "2"
          }}>
            <li>Design Login Page - ✅ Completed</li>
            <li>Create Backend APIs - 🔄 In Progress</li>
            <li>Deploy Project to Railway - ⏳ Pending</li>
          </ul>

        </div>

      </div>
    );
  }

  // LOGIN PAGE
  return (

    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#f4f4f4"
    }}>

      <div style={{
        display: "flex",
        flexDirection: "column",
        width: "320px",
        gap: "15px",
        background: "white",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}>

        <h1 style={{ textAlign: "center" }}>
          Team Task Manager
        </h1>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "12px"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "12px"
          }}
        />

        <button
          onClick={login}
          style={{
            padding: "12px",
            background: "black",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Login
        </button>

      </div>

    </div>
  );
}

export default App;