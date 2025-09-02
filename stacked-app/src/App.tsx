import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from "react"
import { signUpUser, loginUser, insertMetric } from './components/SupabaseClient.tsx'
import './App.css'

function App() {
  const [user, setUser] = useState("")
  const [tEmail, setTemail] = useState("")
  const [tPassword, setTpassword] = useState("")
  const [username, setUsername] = useState("")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [metricType, setMetricType] = useState(5) 

  async function handleSubmit() {
    const user = await signUpUser(tEmail, tPassword, username)
    console.log("Signed up user:", user)
  }

  async function handleLogin() {
    const user = await loginUser(email, password);

    if (user) {
      setUser(user.id)
    }

    console.log("Logged in for user: " + user?.id);
  }

  async function handleMetricSubmit() {
    await insertMetric(user, metricType)
  }

  return (
    <div className='content'>
      <h1>Stacked.dev</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="email"
        value={tEmail}
        onChange={(e) => setTemail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={tPassword}
        onChange={(e) => setTpassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Sign Up</button>

      <h1>Login</h1>
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Log in</button>

      <h1>Insert metric</h1>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Pick a stack</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={metricType}
          onChange={(e) => setMetricType(e.target.value)}
          label="Age"
        >
          <MenuItem value={5}>$ Spent</MenuItem>
          <MenuItem value={6}>Gym time</MenuItem>
          <MenuItem value={7}>Social activities</MenuItem>
        </Select>
      </FormControl>
      <button onClick={handleMetricSubmit}>Submit metric</button>
    </div>
  )
}

export default App
