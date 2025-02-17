"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient<Database>();

export async function ValidateUsername(username: string) {

  if (/\s/.test(username)) {
    alert("Invalid username. Try again")
    return false;
  }

  if (username == "") {
    alert("Please provide username")
    return false;
  }

  
  const { data } = await supabase
  .from("profiles")
  .select("username")
  .eq("username", username)
  .single();

  if (data != null) {
    alert("Username taken")
    return false;
  }
  
  return true;
}

export async function ValidateEmail(email: string) {
  const { data } = await supabase
  .from("profiles")
  .select("email")
  .eq("email", email)
  .single();

  if (data != null) {
    alert("Email already taken")
    return false;
  }

  return true;
}