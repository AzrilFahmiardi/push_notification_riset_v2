// src/app/api/send-notification/route.js
import { NextResponse } from 'next/server';
import { sendMulticastMessage } from '@/firebase/sendMessages';

export async function POST(request) {
  try {
    const { title, body, data } = await request.json();
    
    if (!title || !body) {
      return NextResponse.json(
        { message: 'Title and body are required' },
        { status: 400 }
      );
    }
    
    const result = await sendMulticastMessage(title, body, data);
    
    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(result, { status: 500 });
    }
  } catch (error) {
    console.error('Error in send notification API:', error);
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 500 }
    );
  }
}