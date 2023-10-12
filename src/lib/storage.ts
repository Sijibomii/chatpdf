import { Storage } from '@google-cloud/storage';
import fs from 'fs';

export async function downloadFromGoogleCloudStorage(file_key: string) {
  const storage = new Storage();
  const bucket = storage.bucket('hanko-sijibomi-pdf');

  const file = bucket.file(file_key);

  const file_name = `/tmp/sijibomi${Date.now()}.pdf`; 

  return new Promise((resolve, reject) => {
    file
      .createReadStream()
      .on('error', (error: any) => {
        reject(error);
      })
      .on('end', () => {
        resolve(file_name);
      })
      .pipe(fs.createWriteStream(file_name));
  });
}

// Usage example:
// downloadFromGoogleCloudStorage('uploads/your-file-key.pdf')
