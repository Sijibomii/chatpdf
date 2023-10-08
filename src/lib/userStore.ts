import {create} from "zustand";
import { combine } from "zustand/middleware";

// user coming from hanko
export const useUserStore = create(
    combine(
      {
        user: null,
      },
      (set: any) => ({
          setUser: (user: any) => {
              set({
                user
            });
          }
      })
    )
);

// user details comming from supabase
export const useUserDataStore = create(
  combine(
    {
      user: null,
    },
    (set: any) => ({
        setUser: (user: any) => {
            set({
              user
          });
        }
    })
  )
);