import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from "react"
import { insertMetric } from '../components/SupabaseClient.tsx';
import CustomModal from '../components/CustomModal.tsx';
import { supabase } from "../components/SupabaseClient"
import '../App.css'

export default function Home() {
  const [user, setUser] = useState<any>(null)

  const [metricType, setMetricType] = useState(5)
  const [metricInput, setMetricInput] = useState("")

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState(""); 
  const [modalBody, setModalBody] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  async function handleMetricSubmit() {
    if (!user) {
      setModalTitle("Error ❌");
      setModalBody("You must be logged in to stack 📚");
      setIsModalOpen(true);
      return;
    }

    const res = await insertMetric(user.id, metricType, metricInput);

    if (res) {
      setModalTitle("Stacked 💪");
      setModalBody("Congrats! Keep stacking");
      setMetricInput("")
    } else {
      setModalTitle("Error ❌");
      setModalBody("Something went wrong");
    }
    setIsModalOpen(true);
  }

  function GetMetricInputType(type: number) {
    switch (type) {
      case 5: return "$"
      case 6: return "Hrs"
      case 7: return "# of activities"
      default: return ""
    }
  }

  return (
    <div className='content'>
      <h1>Insert metric</h1>

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="metric-label">Pick a stack</InputLabel>
        <Select
          labelId="metric-label"
          id="metric-select"
          value={metricType}
          onChange={(e) => setMetricType(Number(e.target.value))}
        >
          <MenuItem value={5}>$ Spent</MenuItem>
          <MenuItem value={6}>Gym time</MenuItem>
          <MenuItem value={7}>Social activities</MenuItem>
        </Select>
      </FormControl>

      <input
        type="number"
        placeholder={GetMetricInputType(metricType)}
        value={metricInput}
        onChange={(e) => setMetricInput(e.target.value)}
      />
      <button onClick={handleMetricSubmit}>Submit metric</button>

      <CustomModal
        title={modalTitle}
        body={modalBody}
        showModal={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
