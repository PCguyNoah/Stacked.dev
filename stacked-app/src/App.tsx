import { Routes, Route, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { supabase } from "./components/SupabaseClient"
import Landing from "./pages/Landing.tsx"
import Home from "./pages/Home.tsx"

function App() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })

    // subscribe to login/logout events
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/home"
        element={user ? <Home /> : <Navigate to="/" replace />}
      />
    </Routes>
  )
}

export default App
