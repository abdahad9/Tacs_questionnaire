import { NextResponse,NextRequest } from 'next/server';
import authenticate from '../lib/auth';
import { google } from 'googleapis';
export async function GET(request: Request) {
  // const 'body': "dasd" = await request.json();

    try {
      const auth = await authenticate();
      const drive = google.drive({ version: 'v3', auth: auth });
      // console.log('Authenticated successfully:', auth);

      // Test if we can list files
    let filesList;

    try {
      const response = await drive.files.list();
      filesList = response.data.files;
    } catch (fileError) {
      filesList = { error: 'Error listing files', details: fileError.message };
    }

    // Return the detailed information
    if (drive) {
      return NextResponse.json({
        message: 'Authenticated successfully',
        auth: drive,
        // details
      });
    } else {
      return NextResponse.json({
        message: 'Authentication failed',
        // details
      });
    }
      // return NextResponse.json({
      //   'auth': "inside",
      //   'data': auth
      // });
    } catch (error) {
      console.error('Error during authentication:', error);
      return NextResponse.json({
        'body': "outside",
        'data': error.message
      });
    }
    return NextResponse.json({
      'body': "dasdss",
    });
  }