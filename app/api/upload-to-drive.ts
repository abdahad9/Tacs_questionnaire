import { google } from 'googleapis';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

const CREDENTIALS_PATH = path.join(process.cwd(), 'config/service-account-key.json');

const authorize = () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_PATH,
    scopes: ['https://www.googleapis.com/auth/drive.file'],
  });
  return auth.getClient();
};

const uploadToDrive = async (auth, filePath, fileName) => {
  const drive = google.drive({ version: 'v3', auth });
  const fileMetadata = {
    name: fileName,
  };
  const media = {
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    body: fs.createReadStream(filePath),
  };
  const response = await drive.files.create({
    requestBody: fileMetadata,
    media: media,
    fields: 'id',
  });
  return response.data.id;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    console.log('helloworld');
  if (req.method === 'POST') {
    const auth = await authorize();

    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: 'Failed to parse form' });
        return;
      }

      const file = files.file as formidable.File;
      const filePath = file.filepath;
      const fileName = file.originalFilename;

      try {
        const fileId = await uploadToDrive(auth, filePath, fileName);
        res.status(200).json({ fileId });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to upload file to Google Drive' });
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
