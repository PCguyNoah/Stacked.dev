import { useState } from "react"
import { signUpUser, loginUser } from '../components/SupabaseClient.tsx';
import { PostgrestError } from '@supabase/supabase-js';
import  CustomModal  from '../components/CustomModal.tsx';
import '../App.css'
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const [user, setUser] = useState<any>(null)
  const [tEmail, setTemail] = useState("")
  const [tPassword, setTpassword] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState(""); 
  const [modalBody, setModalBody] = useState("");
  let navigate = useNavigate();

  async function handleSignUp() {
    const response = await signUpUser(tEmail, tPassword, username)
    if (PostgrestError) {
      setIsModalOpen(true);
      setModalTitle("Signup Error ❌");
      setModalBody(response);
    } 
    else {
      console.log("Signed up user:", response)
    }
  }

  async function handleLogin() {
    const res = await loginUser(email, password);

    if (res.user) {
      setUser(res.user.id);
      navigate('/home')
    } else {
      setIsModalOpen(true);
      setModalTitle("Login Error ❌");
      setModalBody(res.error.message);
    }

    console.log("Logged in for user: " + user?.id);
  }
  return (

    <div className="content">
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
      <button onClick={handleSignUp}>Sign Up</button>

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

      <CustomModal
        title={modalTitle}
        body={modalBody}
        showModal={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
    )
}