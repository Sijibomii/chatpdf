import formidable from 'formidable';
import { NextResponse } from 'next/server';
import { uploadToGoogleStorage } from "@/lib/s3";


export async function POST(req: Request, _: Response) {

    const data = await req.formData();

    const file = data.get('file') as Blob;
   
    const dataFile = await uploadToGoogleStorage(file)
    return NextResponse.json({ 
              file_key: dataFile.file_key,
              file_name: dataFile.file_name
           }, { status: 200 });
         
}
