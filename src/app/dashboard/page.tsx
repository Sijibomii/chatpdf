"use client"

import PageLayout from "@/component/PageLayout";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/initSupabase";

import { useUserStore, useUserDataStore } from "@/lib/userStore";
import Onboarding from "@/component/Onboarding";

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
          }
        }
    }
    if(user){
      fetchUser()
    }
  },[user])
  return (
    <PageLayout>
    { userDta == null || userDta.length == 0 ? ( 
      <Onboarding />
    ) : ( 
      <Onboarding />
          // <p>hello world</p>
        )}
    </PageLayout>
  
  )
}