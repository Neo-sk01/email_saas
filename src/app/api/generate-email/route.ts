import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { companyName, linkedInDescription, blogPosts } = await request.json();

    // Validate required inputs
    if (!companyName) {
      return NextResponse.json(
        { error: 'Company name is required' },
        { status: 400 }
      );
    }

    // Simple test response to verify the route works
    const testEmail = `Subject: Elevate ${companyName}'s Digital Presence with Traffic Social Hub

Dear ${companyName} Team,

I hope this message finds you well. I'm reaching out from Traffic Social Hub, a leading media agency specializing in comprehensive 360-degree media solutions.

We've been following ${companyName}'s impressive journey and believe there's tremendous potential to amplify your brand's digital presence through our data-driven approach.

Our services include:
• Creative and brand development
• Performance media and advertising optimization
• Experience design and user interface creation
• Events and memorable brand experiences

${linkedInDescription ? `Based on your LinkedIn presence, we see great opportunities to enhance your current digital strategy.` : ''}

${blogPosts ? `Your recent content initiatives show strong potential for expansion through our targeted media solutions.` : ''}

We've helped brands like Standard Bank increase their share of voice by 120% on Twitter and grow Telkom's organic engagement by 60%.

Would you be interested in a 15-minute call to discuss how we can help ${companyName} achieve similar results?

Best regards,
Traffic Social Hub Team
hello@trafficsocialhub.com`;

    return NextResponse.json({ email: testEmail });
  } catch (error) {
    console.error('Error generating email:', error);
    return NextResponse.json(
      { error: 'Failed to generate email' },
      { status: 500 }
    );
  }
}
