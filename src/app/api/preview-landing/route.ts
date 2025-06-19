import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies();
  const hasPreviewCookie = cookieStore.has('preview-landing');
  
  // Toggle the preview cookie
  if (hasPreviewCookie) {
    // Remove the cookie if it exists
    cookies().delete('preview-landing');
    return new NextResponse(JSON.stringify({ 
      message: 'Preview mode disabled', 
      previewMode: false 
    }));
  } else {
    // Set the cookie if it doesn't exist
    cookies().set('preview-landing', 'true', { 
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    return new NextResponse(JSON.stringify({ 
      message: 'Preview mode enabled', 
      previewMode: true 
    }));
  }
}
