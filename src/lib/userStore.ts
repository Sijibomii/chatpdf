import {create} from "zustand";
import { combine } from "zustand/middleware";

// user coming from superbase
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