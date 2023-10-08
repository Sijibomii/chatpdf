import {create} from "zustand";
import { combine } from "zustand/middleware";


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