import React, { useEffect, useState, useRef, createContext, useMemo, ReactNode } from "react";

type V = any | null;

export const UserContext = createContext<{
    user: V;
    setUser: (u: any) => void;
  }>({
    user: null,
    setUser: () => {}
});


const getUser = (url: string) => 
    new Promise((resolve, reject) => {
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    reject(new Error(`Failed to fetch data from ${url}: ${response.status}`));
                } else {
                    response.json()
                        .then((data) => {
                            return fetch(`${process.env.NEXT_PUBLIC_HANKO_API_URL}/users/${data.id}`);
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
    
    const url = "";

    useEffect(() =>{
        if (!user) {
            console.log("getting user details from hanko")
            getUser(`${process.env.NEXT_PUBLIC_HANKO_API_URL}/me`)
            .then((userr: any) => {
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