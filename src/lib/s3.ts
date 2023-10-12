import { Storage } from "@google-cloud/storage";
import path from "path";

export async function uploadToGoogleStorage(
  file: File
): Promise<{ file_key: string; file_name: string }> {
  return new Promise((resolve, reject) => {
    try {
        const storage = new Storage({
            keyFilename: path.join(__dirname, '../secrets/winged-ratio-399207-4bc090accd94.json'),
            projectId: "winged-ratio-399207"
        });

        const bucket = storage.bucket('hanko-sijibomi-pdf');

        const file_key = `uploads/${Date.now().toString()}-${file.name}`;

        const fileStream = bucket.file(file_key).createWriteStream({
            resumable: false,
        });

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

        fileStream.end(file.buffer);

    } catch (error) {
      reject(error);
    }
  });
}

export function getGoogleStorage(file_key: string) {
    const url = `https://storage.googleapis.com/${'hanko-sijibomi-pdf'}/${file_key}`;
    return url;
  }
