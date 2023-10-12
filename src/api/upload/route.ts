import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { uploadToGoogleStorage } from "@/lib/s3";

export const config = {
    api: {
      bodyParser: false, 
    },
};


export async function POST(req: Request, _: Response) {

    const form = new formidable.IncomingForm(); 

    form.parse(req, async (err: any, fields: any, files: any) => {
        if (err) {
            return NextResponse.json({ error: 'File upload failed.' }, { status: 500 });
        } else {
        const file = files.file; 
        const data = await uploadToGoogleStorage(file)
        
        return NextResponse.json({ 
            file_key: data.file_key,
            file_name: data.file_name
         }, { status: 200 });
        }
    });
}
