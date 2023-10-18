"use client"

import Layout from "@/component/Layout";
import ChatComponent from "@/component/ChatComponent";
import ChatSideBar from "@/component/ChatSideBar";
import PDFViewer from "@/component/PDFViewer";
import { redirect } from "next/navigation";
import { useUserDataStore } from "@/lib/userStore";
import { supabase } from "@/lib/initSupabase";
import React, { useEffect, useState } from "react";

type Props = {
  params: {
    chatId: string;
  };
};

const ChatPage = ({ params }: Props) => { 

  // get user id from zustand
  const { chatId } = params;
  const { user: userr } = useUserDataStore();

  const user = userr as unknown as any[];
  const [chats_, setChats] = useState<any[]>([]);

  const [currentChat_, setCurrentChat] = useState<any>();

  useEffect(()=>{
    if (!user) {
      return redirect("/");
    }

    const fetchChats = async () => {

      const _chats = await supabase
        .from('chats')
        .select('*')
        .eq('user_id', user[0].hanko_id);
      
        if (!_chats) {
          return redirect("/");
        }

        setChats(_chats.data as unknown as any[])

        // if (!_chats.find((chat: any) => chat.id === parseInt(chatId))) {
        //   return redirect("/");
        // }
        const currentChat = _chats!.data!.find((chat: any) => chat.id === chatId);

        setCurrentChat(currentChat)
    }

    fetchChats();

  },[chatId, user])


  return (
    <Layout>
      <div className="flex max-h-screen overflow-scroll">
      <div className="flex w-full max-h-screen overflow-scroll">
        {/* chat sidebar */}
        <div className="flex-[1] max-w-xs">
          <ChatSideBar chats={chats_} chatId={chatId} />
        </div>
        {/* pdf viewer */}
        <div className="max-h-screen p-4 oveflow-scroll flex-[5]">
          <PDFViewer pdf_url={currentChat_?.pdf_url || ""} />
        </div>
        {/* chat component */}
        <div className="flex-[3] border-l-4 border-l-slate-200">
          <ChatComponent chatId={chatId} />
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default ChatPage;