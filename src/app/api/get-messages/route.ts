import { NextResponse } from "next/server";
import { supabase } from "@/lib/initSupabase";


export const runtime = "edge";

export const POST = async (req: Request) => {

  const { chatId } = await req.json();

  const _messages = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', chatId);
  
  return NextResponse.json(_messages.data); 
};