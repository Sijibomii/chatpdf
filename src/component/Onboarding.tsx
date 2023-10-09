"use client"
import { useCallback, useState } from "react";
import { Form, Formik } from "formik";
import InputErrorMsg from "./InputErrorMsg";
import { Input } from "./Input";
import { supabase } from "@/lib/initSupabase";
export const LoginButton= ({
    children,
    loading,
  }: any) => {
    // const query = "";
    
    const clickHandler = useCallback(() => {
      // if (typeof query.next === "string" && query.next) {
      //   // try {
      //   //   localStorage.setItem(loginNextPathKey, query.next);
      //   // } catch {}
      // }
  
    }, []);
  
    return (
      <button
        className="justify-center text-base py-3 mt-2 bg-[#E3A014]"
        disabled={false || loading}
        onClick={clickHandler}
      >
        <div
          className={Array.isArray(children) ? "grid gap-4": ""}
          style={{
            gridTemplateColumns: "1fr auto 1fr",
          }}
        >
          {Array.isArray(children) ? [ ...children] : children}
          <div />
        </div>
      </button>
    );
  };
  

export default function Onboarding(){

    const [current, SetCurrent] = useState({
        username: "",
        display_name: ""
      })

    function findChangedKeys(obj1: any, obj2: any) {
        const changedKeys = [];
      
        for (const key in obj1) {
          if (obj1.hasOwnProperty(key)) {
            if (obj1[key] !== obj2[key]) {
              changedKeys.push(key);
            }
          }
        }
      
        return changedKeys;
    }

    function trimObjectValues(obj: any) {
        const trimmedObject: any = {};
      
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (typeof value === 'string') {
              trimmedObject[key] = value.trim();
            } else {
              trimmedObject[key] = value; // Keep non-string values as is
            }
          }
        }
      
        return trimmedObject;
      }
  
    return (
        <div className="h-[87vh] bg-black">
          <div className="h-full flex items-center justify-center">
          <div className="flex  m-auto flex-col p-14 pt-0 gap-5 sm:rounded-8 z-10 sm:w-400 w-1/3">
              <div className="flex gap-2 flex-col text-center">
                <span className="text-3xl text-[#dee3ea] font-bold">Welcome !!</span>
              </div>
              <Formik
                    initialValues={
                    {
                      username: "",
                      display_name: ""
                    }
                  }
                  validateOnChange
                  validateOnBlur 
                  validate={async (dataa : any) => {
                    const data = trimObjectValues(dataa)
                    const changed = findChangedKeys(current, data)
                    if(changed.length === 0 )return
                    
                    if (changed[0] === "username"){
                        // send req to find user with this username
                        const { data: userData, error } = await supabase
                            .from('users')
                            .select('*')
                            .eq('username', data.username);

                            if (error){ 
                                console.log('error', error)
                            }
                            else {
                                if(userData.length !== 0){
                                    return {
                                        username: "username is taken!!!"
                                    }
                                }
                            }
                    }else{
                        const { data: userData, error } = await supabase
                            .from('users')
                            .select('*')
                            .eq('display_name', data.display_name);

                            if (error){ 
                                console.log('error', error)
                            }
                            else {
                                if(userData.length !== 0){
                                    return {
                                        display_name: "display name is taken!!!"
                                    }
                                }
                            }
                    }
                    SetCurrent(data)
                    // return {};
                  }}
                  
                  onSubmit={async ({ username, display_name }: any) => {
                    
                  }}
                >
                  {({ isSubmitting, errors, handleChange, handleBlur, setFieldValue }: any) => (
                    <Form className={``}>
                      <div className="flex flex-col gap-4">
                      <div className="flex flex-col">
                          <h3 className="text-[#dee3ea] text-sm text-gray">Username:</h3>
                          {errors.username ? (
                            <div className={`flex mt-1`}>
                              <InputErrorMsg>{errors.username}</InputErrorMsg>
                            </div>
                          ) : null }
                            <Input
                              autoFocus
                              className={`username-input`}
                              placeholder={"Enter your Username"}
                              name="username"
                              id="username"
                              type={"username"}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                      </div>
                      <div className="flex flex-col">
                          <h3 className="text-[#dee3ea] text-sm">display Name</h3>
                          {errors.display_name ? (
                            <div className={`flex mt-1`}>
                            <InputErrorMsg>{errors.display_name}</InputErrorMsg>
                          </div>
                          ) : null}
                          <Input
                            className={`username-input`}
                            id="display_name"
                            placeholder={"Enter display Name"}
                            name="display_name"
                            type={"display_name"}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            />
                      </div>
                      
                      <LoginButton loading={isSubmitting}>
                          Submit
                      </LoginButton>
                  </div>
                    </Form>
                  )}
              </Formik>
              
            </div>
          </div>
        </div>
      )
} 