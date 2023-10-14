import formidable from 'formidable';
import { NextResponse } from 'next/server';
import { uploadToGoogleStorage } from "@/lib/s3";

export const config = {
    api: {
      bodyParser: false, 
    },
};

export async function POST(req: Request, _: Response) {

    const data = await req.formData();
    console.log("form data: ",data)
    const file = data.get('file') as Blob;
    console.log("################################## . uploading.......")
    console.log(file)
    const dataFile = await uploadToGoogleStorage(file)
    return NextResponse.json({ 
              file_key: dataFile.file_key,
              file_name: dataFile.file_name
           }, { status: 200 });
         
}
