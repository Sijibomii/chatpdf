"use client"

import { ReactNode } from "react";

const InputErrorMsg = ({ children }: { children: ReactNode }) => {
    return (
      <div className={`flex text-[#f94c4c]`} data-testid="input-error-msg">
        {children}
      </div>
    );
  };
  
  export default InputErrorMsg; 