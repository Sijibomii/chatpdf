import { Storage } from "@google-cloud/storage";
import path from "path";
import fs from "fs";

export async function uploadToGoogleStorage(
  file: Blob
): Promise<{ file_key: string; file_name: string }> {
  return new Promise(async (resolve, reject) => {
    try {

        // file does not exist 
        const base64Data = process.env.GOOGLE_SERVICE_CREDENTIAL!
        // Decode the base64 data to a buffer.
        const rawData = Buffer.from(base64Data, 'base64');
        // Parse the buffer as JSON.
        const jsonData = JSON.parse(rawData.toString());
      
        const googleStorageCredentials = {
          type: jsonData["type"],
          project_id: jsonData["project_id"],
          private_key_id: jsonData["private_key_id"],
          private_key: jsonData["private_key"],
          client_email: jsonData["client_email"],
          client_id: jsonData["client_id"],
          auth_uri: jsonData["auth_uri"],
          token_uri: jsonData["token_uri"],
          auth_provider_x509_cert_url: jsonData["auth_provider_x509_cert_url"],
          client_x509_cert_url: jsonData["client_x509_cert_url"],
          universe_domain: jsonData["universe_domain"]
        };

        const storage = new Storage({
            credentials: googleStorageCredentials,
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
