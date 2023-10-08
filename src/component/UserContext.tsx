"use client"

import React, { useEffect, useState, useRef, createContext, useMemo, ReactNode } from "react";

type V = any | null;

export const UserContext = createContext<{
    user: V;
    setUser: (u: any) => void;
  }>({
    user: null,
    setUser: () => {}
});

function getCookie(cookieName: string) {
    const name = `${cookieName}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
        }
    }
    return null;
}

const getUser = (url: string) => 
    new Promise((resolve, reject) => {
        fetch(url, {
            method: 'GET', 
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('hanko')}`
              })
          })
            .then((response) => {
                if (!response.ok) {
                    reject(new Error(`Failed to fetch data from ${url}: ${response.status}`));
                } else {
                    response.json()
                        .then((data) => {
                            return fetch(`${process.env.NEXT_PUBLIC_HANKO_API_URL}/users/${data.id}`, {
                                method: 'GET', 
                                headers: new Headers({
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${getCookie('hanko')}`
                                  })
                              });
                        })
                        .then((response) => {
                            if (!response.ok) {
                              throw new Error(`Failed to fetch user profile: ${response.status}`);
                            }
                            return response.json();
                          })
                          .then((userProfile) => {
                            // Resolve with the user profile
                            resolve(userProfile);
                          })
                        .catch((error) => {
                            // Handle JSON parsing error
                            reject(new Error(`Error parsing JSON: ${error.message}`));
                        });
                }
            })
            .catch((error) => {
                // Handle network or fetch error
                reject(new Error(`Fetch error: ${error.message}`));
            });
    });



export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState(null);
    const isLoading = useRef(false);

    useEffect(() =>{
        if (!user) {
            console.log("getting user details from hanko")
            console.log(getCookie('hanko'))
            getUser(`${process.env.NEXT_PUBLIC_HANKO_API_URL}/me`)
            .then((userr: any) => {
                console.log(userr)
                setUser(userr)
            })
            .catch((err) => {
                console.log(err)
              })
              .finally(() => {
                isLoading.current = false;
              });
        }
      }, [user]);

    return (
    <UserContext.Provider
        value={useMemo(
        () => ({
            user,
            setUser,
        }),
        [user]
        )}
    >
        {children}
    </UserContext.Provider>
    );

}