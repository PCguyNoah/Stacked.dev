import { createClient, type User } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_API_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function signUpUser(email: string, password: string, username: string) {
  // 1. Create user in Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    console.error("Error signing up:", error.message)
    return null
  }

  const user = data.user
  console.log("User created:", user)

  // 2. Insert into profiles table
  if (user) {
    const { error: profileError } = await supabase
      .from("profiles")
      .insert([{ id: user.id, username }])

    if (profileError) {
      console.error("Error creating profile:", profileError.message)
    } else {
      console.log("Profile created for:", username)
    }
  }

  return user
}

export async function loginUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error("Login error:", error.message)
    return null
  }

  return data.user
}

export async function getUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user;
}

export async function insertMetric(userId: string, metricId: number) {
  const currentDate = new Date();
  
  if (userId) {
    try {
      await supabase.from("daily_metric_entries").insert([
      {
        user_id: userId,
        metric_id: metricId,
        entry_date: currentDate.toDateString(),
        value: 1
      }
    ])
      console.log("ADDED RECORD")
    }
    catch (e) {
      console.log("ERROR: ", e);
    }
  }
}


