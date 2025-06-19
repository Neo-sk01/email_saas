import { NextResponse } from "next/server";

// Simple version for testing
console.log('Chat route module loaded - ULTRA SIMPLE VERSION');

export async function POST(req: Request) {
    console.log('POST /api/chat request received - ULTRA SIMPLE VERSION');
    try {
        // Parse the request body to access messages
        const body = await req.json();
        console.log('Request body parsed:', JSON.stringify(body).substring(0, 100) + '...');
        
        // Return a simple fixed response
        return NextResponse.json({
            message: "This is a test response from the chatbot API",
            received: true,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error in ultra simple chat route:', error);
        return NextResponse.json({
            error: "Simple error response",
            details: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
