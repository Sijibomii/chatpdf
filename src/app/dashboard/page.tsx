"use client"

import Layout from "@/component/Layout";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/initSupabase";
import { useUserStore, useUserDataStore } from "@/lib/userStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, LogIn } from "lucide-react";
import FileUpload from "@/component/FileUpload";

// post should go in here
export default function Dash() {

  const { user } = useUserStore();

  const { userD } = useUserDataStore()

  const [userDta, setUserData] = useState<any>();
  useEffect(() => {
    const fetchUser = async () => {
      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', user.email);

        if (error){ 
          return
        }
        else if(userData.length === 0){
          // new user
          const { data: insertedUser, error: insertError } = await supabase
            .from('users')
            .insert({
              email: user.email,
              hanko_id: user.id
            })
            .select()
            .single()

          if (insertError.code){
            return
          }
          setUserData(insertedUser)

          if (insertedUser) {
            useUserDataStore.getState().setUser(insertedUser)
            setUserData(insertedUser)
          }
        }
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
  },[user, userD])

  return (
    <Layout>
      <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">Chat with any PDF</h1>
          </div>

          <div className="flex mt-2">
              <>
                <Link href={`/chat/`}>
                  <Button>
                    Go to Chats <ArrowRight className="ml-2" />
                  </Button>
                </Link>
              </>
          </div>

          <p className="max-w-xl mt-1 text-lg text-slate-600">
            Join millions of students, researchers and professinals to instantly
            anwer questions and understand research with AI
          </p>

          <div className="w-full mt-4">
              <FileUpload />
          </div>
        </div>
      </div>
    </div>
      
    </Layout>
  
  )
}