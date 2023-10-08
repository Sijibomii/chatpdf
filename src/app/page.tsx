"use client"

import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { register, Hanko } from "@teamhanko/hanko-elements";
import { supabase } from "@/lib/initSupabase";
import { useUser } from "@/lib/useUser";
import { useUserStore } from "@/lib/userStore";

const hankoApi = process.env.NEXT_PUBLIC_HANKO_API_URL;

export default function Home() {

  const router = useRouter();
  const user = useUser();
  const [hanko, setHanko] = useState<Hanko>();
  const [userDta, setUserData] = useState<any>();
  useEffect(() => {
    import("@teamhanko/hanko-elements").then(({ Hanko }) =>
      setHanko(new Hanko(hankoApi))
    );
  }, []);
 
  const redirectAfterLogin = useCallback(() => {
    // successfully logged in, redirect to a page in your application
    // check if this user exists in superbase
    const fetchUser = async () => {
      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', user.email);

        if (error){ console.log('error', error)}
        else {
          setUserData(userData)

          if (userData) {
            // set zustand state to user details
            useUserStore.getState().setUser(userData)
            router.replace("/dashboard");
          }else{
            router.replace("/details");
          }
        }
    }

    fetchUser()
  }, [router]);
 
  useEffect(
    () =>
      hanko?.onAuthFlowCompleted(() => {
        redirectAfterLogin();
      }),
    [hanko, redirectAfterLogin]
  );
 
  useEffect(() => {
    register(hankoApi).catch((error) => {
      // handle error
    });
  }, []);
//  
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <hanko-auth />
    </div>
  );
}
