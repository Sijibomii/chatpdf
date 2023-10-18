import { Storage } from "@google-cloud/storage";
import path from "path";
import fs from "fs";

export async function uploadToGoogleStorage(
  file: Blob
): Promise<{ file_key: string; file_name: string }> {
  return new Promise(async (resolve, reject) => {
    try {
        const filePath = './cred.json'; 
        
        fs.access(filePath, fs.constants.F_OK, (err) => {
          if (err) {
            // file does not exist 
            const base64Data = process.env.GOOGLE_SERVICE_CREDENTIAL!
            // Decode the base64 data to a buffer.
            const rawData = Buffer.from(base64Data, 'base64');
            // Parse the buffer as JSON.
            const jsonData = JSON.parse(rawData.toString());
            
            fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
          }
        });

        const storage = new Storage({
            keyFilename: filePath,
            projectId: "winged-ratio-399207"
        });

        const bucket = storage.bucket('hanko-sijibomi-pdf');

        const file_key = `uploads/${Date.now().toString()}-${file.name}`;

        const fileStream = bucket.file(file_key).createWriteStream({
            resumable: false,
        });


        const arrayBuffer = await new Response(file).arrayBuffer();
        const fileBuffer = Buffer.from(arrayBuffer);

        fileStream
        .on('error', (error: any) => {
            reject(error);
        })
        .on('finish', () => {
            resolve({
            file_key,
            file_name: file.name,
            });
        });
      
        fileStream.end(fileBuffer);

    } catch (error) {
      reject(error);
    }
  });
}

export function getGoogleStorage(file_key: string) {
    const url = `https://storage.googleapis.com/${'hanko-sijibomi-pdf'}/${file_key}`;
    return url;
  }
