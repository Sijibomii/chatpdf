import { useUserStore } from "@/lib/userStore";
// import { useEffect } from "react";

export default function Navbar(){
    const { user } = useUserStore();

    // useEffect(() => {
        
    // },[user])
    return (
        <div className="bg-[#172635]">
            <div className="py-3 max-w-7xl m-auto flex items-center justify-between">
                <div className="logo text-[#E3A014] text-5xl font-bold">Pxstr</div>

                {user && user.username ? (<h3>{user.username}</h3>): (<></>)}
            </div>
        </div>
    )
} 