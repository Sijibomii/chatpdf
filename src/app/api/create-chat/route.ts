import { supabase } from "@/lib/initSupabase";
import { loadGoogleCloudStorageIntoPinecone } from "@/lib/pinecone";
import { getGoogleStorage } from "@/lib/s3";
import { NextResponse } from 'next/server'
import { cookies } from "next/headers";
import * as jose from "jose";

// /api/create-chat
export async function POST(req: Request, res: Response) {
  const token = cookies().get("hanko")?.value;
  const payload = jose.decodeJwt(token ?? "");
  const userId = payload.sub;

  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const { file_key, file_name } = body;

    await loadGoogleCloudStorageIntoPinecone(file_key);

    const { data: chatData, error } = await supabase
            .from('chats')
            .insert({
                    file_key: file_key,
                    pdf_name: file_name, 
                    pdf_url: getGoogleStorage(file_key),
                    user_id: userId,
                  })
            .select()
            .single();

    return NextResponse.json(
      {
        chat_id: chatData.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}

