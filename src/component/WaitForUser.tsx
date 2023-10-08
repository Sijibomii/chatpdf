"use client"

import React, { useContext, ReactNode } from "react"; 
import { UserContext } from "./UserContext";

export const WaitForUser = ({ children }: { children: ReactNode }) => {

    const { user } = useContext(UserContext);

    if(!user) {
        // spinner should be here
        return <div className="flex">loading...</div>;
    }

    return <>{children}</>;
}