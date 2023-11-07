import { handleUpload } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import db from '../../../../lib/db'

export async function POST(request) {
  const body = await request.json();
  const title = body.title; 

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif'],
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log('blob upload completed', blob, tokenPayload);
 
        try {
          await db.none('INSERT INTO images(title, url) VALUES($1, $2)', [title, blob.url]);
        } catch (error) {
          console.error('Error saving to database', error);
          throw new Error('Could not update database with new image');
        }
      },
    });
 
    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error).message },
      { status: 400 },
    );
  }
}