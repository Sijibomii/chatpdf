"use client"

import { ReactNode } from 'react';
import { WaitForUser } from "./WaitForUser"
import { UserProvider } from "./UserContext"
import Providers from './Providers';
import { Toaster } from "react-hot-toast"

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="body">
            <UserProvider>
                <WaitForUser>
                    <Providers>
                        {children} 
                        <Toaster />
                    </Providers>
                </WaitForUser>
            </UserProvider>
        </div>
    )
  }