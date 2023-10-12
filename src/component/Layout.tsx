"use client"

import { ReactNode } from 'react';
import { WaitForUser } from "./WaitForUser"
import { UserProvider } from "./UserContext"

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="body">
            <UserProvider>
                <WaitForUser>
                    {children} 
                </WaitForUser>
            </UserProvider>
        </div>
    )
  }