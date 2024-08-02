import { NextResponse, NextRequest } from 'next/server';
import authenticate from '../../lib/auth';
import { google, drive_v3 } from 'googleapis';
import { Readable } from 'stream';

// Define the type for file metadata
interface FileMetadata {
    name: string;
    parents?: string[];
}

// Define the type for media
interface Media {
    mimeType: string;
    body: Readable;
}

// Define the type for the upload response
interface UploadResponse {
    message: string;
    fileId?: string;
    error?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const auth = await authenticate();
        if (!auth.client) {
            throw new Error('Authentication failed');
        }

        const drive = google.drive({ version: 'v3', auth: auth.client });

        // Read the request body
        const data = await request.arrayBuffer();
        const buffer = Buffer.from(data);

        const readableStream = bufferToStream(buffer);

        // Create file metadata
        const fileMetadata: drive_v3.Schema$File = {
            name: request.headers.get('X-Filename') || 'test-file.xlsx', 
            parents: ['11bkguJ0OXw9k6m73PSM7EH_1HcknxD1w'], // Use your actual folder ID
        };

        // Create media for the file upload
        const media: Media = {
            mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            body: readableStream,
        };

        // Upload file to Google Drive
        const response = await drive.files.create({
            requestBody: fileMetadata,
            media: media,
            fields: 'id',
        });

        return NextResponse.json({
            message: 'File uploaded successfully',
            fileId: response.data.id,
        } as UploadResponse);
    } catch (error) {
        console.error('Error during authentication or file upload:', error);
        return NextResponse.json({
            message: 'Error during authentication or file upload',
            error: (error as Error).message,
        } as UploadResponse);
    }
}

const bufferToStream = (buffer: Buffer): Readable => {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null); // Indicate end of stream
    return stream;
};
