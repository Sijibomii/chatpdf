"use client"

import PageLayout from "@/component/PageLayout";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/initSupabase";

import { useUserStore, useUserDataStore } from "@/lib/userStore";

// post should go in here
export default function Dash() {

  const { user } = useUserStore();
  const [userDta, setUserData] = useState<any>();
  useEffect(() => {
    const fetchUser = async () => {
      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', user.email);

        if (error){ console.log('error', error)}
        else {
          setUserData(userData)

          if (userData) {
            useUserDataStore.getState().setUser(userData)
            setUserData(userData)
            console.log(userData)
          }
        }
    }
    if(user){
      console.log(user)
      fetchUser()
    }
  },[user])
  return (
    <PageLayout>
    { userDta == null || userDta.length == 0 ? ( <>loadings...</>) : ( 
          <p>hello world</p>
        )}
    </PageLayout>
  
  )
}