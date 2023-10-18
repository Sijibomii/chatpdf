"use client";

import { useMutation } from "@tanstack/react-query";
import { Inbox, Loader2 } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const FileUpload = () => {

  const router = useRouter();
  const [uploading, setUploading] = React.useState(false);

  const { mutate, isLoading } = useMutation({
    mutationFn: async ({
      file_key,
      file_name,
    }: {
      file_key: string;
      file_name: string;
    }) => {
    
        const response = await fetch("/api/create-chat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                file_key,
                file_name,
              }),
          });
          if (!response.ok) {
            // Handle the error (e.g., throw an error or return an error response)
            console.log("file", response)
            throw new Error("Network response was not ok");
          }
          
          const responseData = await response.json();
          return responseData;
      
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles: any) => {
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        // bigger than 10mb!
        toast.error("File too large");
        return;
      }

      try {
        setUploading(true);
        const formData = new FormData(); 
        
        formData.set("file", file);
   
        const data: any = await fetch("/api/upload", {
                method: "POST", 
                body: formData,   
            })
            .then((response) => {
              if (!response.ok) {
                console.log("fileee", response)
                throw new Error("Network response was not ok");
              }
              return response.json(); 
            })
            .then((data) => {

                return data
              })
            .catch((error) => {
              console.error("Error uploading file:", error);
            });


        if (!data?.file_key || !data.file_name) {
          toast.error("Something went wrong");
          return;
        }
        mutate(data, {
          onSuccess: ({ chat_id }: any) => {
            toast.success("Chat created!");
            router.push(`/chat/${chat_id}`);
          },
          onError: (err: any) => {
            toast.error("Error creating chat");
            console.error(err);
          },
        });
      } catch (error) {

      } finally {
        setUploading(false);
      }
    },
  });
  return (
    <div className="p-2 bg-white rounded-xl">
      <div
        {...getRootProps({
            className:
              "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col",
          })}
      >
        <input {...getInputProps()} />
        {uploading || isLoading ? (
          <>
            {/* loading state */}
            <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            <p className="mt-2 text-sm text-slate-400">
              Spilling Tea to GPT...
            </p>
          </>
        ) : (
          <>
            <Inbox className="w-10 h-10 text-blue-500" />
            <p className="mt-2 text-sm text-slate-400">Drop PDF Here</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;