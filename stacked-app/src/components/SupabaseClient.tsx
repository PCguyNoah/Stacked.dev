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
    return error.message
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
      return profileError.message;
    } else {
      console.log("Profile created for:", username)
    }
  }
  // not sure if we want to return the user yet
  // return user
  return "success!"
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

export async function insertMetric(userId: string, metricId: number, metric: number) {
  const currentDate = new Date();
  
  if (userId) {
    try {
      await supabase.from("daily_metric_entries").insert([
      {
        user_id: userId,
        metric_id: metricId,
        entry_date: currentDate.toDateString(),
        value: metric
      }
    ])
      console.log("ADDED RECORD");
      return metricId;
    }
    catch (e) {
      console.log("ERROR: ", e);
      return null;
    }
  }
  return null;
}


