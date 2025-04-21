import { NextResponse } from 'next/server';
import admin from '@/firebase/admin'; // Pastikan path ini sesuai dengan lokasi file admin.js Anda

export async function POST(request) {
  try {
    const { token, topic } = await request.json();

    if (!token || !topic) {
      return NextResponse.json({ success: false, message: 'Token and topic are required' }, { status: 400 });
    }

    const response = await admin.messaging().subscribeToTopic(token, topic);
    console.log('Successfully subscribed to topic:', response);
    return NextResponse.json({ success: true, response });
  } catch (error) {
    console.error('Error subscribing to topic:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}