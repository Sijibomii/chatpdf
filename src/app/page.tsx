"use client"

import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
// @ts-ignore
import { register, Hanko } from "@teamhanko/hanko-elements";
import "./global.css"

const hankoApi = process.env.NEXT_PUBLIC_HANKO_API_URL;

export default function Home() {

  const router = useRouter();

  const [hanko, setHanko] = useState<Hanko>();

  useEffect(() => {
    // @ts-ignore
    import("@teamhanko/hanko-elements").then(({ Hanko }) =>
      setHanko(new Hanko(hankoApi))
    );
  }, []);
 
  const redirectAfterLogin = useCallback(() => {
    // successfully logged in, redirect to a page in your application
    router.replace("/dashboard");
  
  }, [router]);
 
  useEffect(
    () =>
      hanko?.onAuthFlowCompleted(() => {
        redirectAfterLogin();
      }),
    [hanko, redirectAfterLogin]
  );
 
  useEffect(() => {
    register(hankoApi as string).catch((error: any) => {
      console.log(error)
    });
  }, []);
//  
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <hanko-auth />
    </div>
  );
}
