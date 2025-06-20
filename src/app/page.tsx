"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// import { auth } from '@clerk/nextjs/server';
// import { redirect } from 'next/navigation';
// We'll need to ensure Vanta and Three are loaded globally, e.g. in layout.tsx
// If Vanta is not typed, you might need to declare it:
// declare const VANTA: any;


const LandingPage = () => {
  // const { userId } = auth();

  // if (userId) {
  //   redirect("/mail");
  // }

  const vantaRef = useRef(null);

  useEffect(() => {
    let vantaEffect: any = null;
    // Ensure window and VANTA are available
    if (typeof window !== 'undefined' && (window as any).VANTA && (window as any).THREE) {
      vantaEffect = (window as any).VANTA.WAVES({
        el: vantaRef.current,
        THREE: (window as any).THREE, // Pass THREE to Vanta
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x0055ff, // Example: A nice blue
        shininess: 35.00,
        waveHeight: 15.00,
        waveSpeed: 0.75,
        zoom: 0.65
      });
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    // The body tag and its classes (bg-[#0A0C10] text-white) should be applied
    // in layout.tsx or globals.css for the main application body/html element.
    // For this component, we start with the main div.
    <div className="relative min-h-screen overflow-hidden bg-[#0A0C10] text-white"> {/* Added bg and text color here for now */}
      <div ref={vantaRef} id="vanta-bg" className="absolute inset-0 z-0 opacity-60"></div>
      
      <nav className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
                <Image 
                    src="/6533aa34c693127e8f234ccf_Traffic.svg" 
                    alt="Traffic AI Email Logo"
                    width={160} // Increased size as per previous request (5x of original 32px assumption)
                    height={160}
                    className="group-hover:scale-110 transition-transform duration-200"
                />
                {/* Text logo removed as per previous request */}
            </Link>
          </div>
          <div className="hidden md:flex space-x-8 text-sm">
            <Link href="/#features" className="text-gray-300 hover:text-white transition-colors">Features</Link>
            <Link href="/#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</Link>
            {/* Pricing and Support links can be added back if needed */}
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/sign-in" className="text-sm text-gray-300 hover:text-white transition-colors">Sign In</Link>
            <Link href="/sign-up" className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Try Free
            </Link>
          </div>
        </div>
      </nav>
      
      <main className="relative z-10 px-6 pt-16 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-3 py-1 mb-6 text-xs font-semibold bg-blue-600/20 text-blue-400 rounded-full">
                AI-Powered Sales Automation
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
                Transform Your Outreach with Traffic AI Email
              </h1>
              <p className="text-lg text-gray-400 mb-8 max-w-lg">
                Import, enrich, and engage leads with hyper-personalized emails at scale. Let AI handle the heavy lifting.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/sign-up" className="px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  Start Free Trial
                </Link>
                <Link href="/demo" className="px-6 py-3 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors">
                  See Demo
                </Link>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex flex-col">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">Thousands of happy users</span>
                </div>
                <div className="h-10 border-l border-gray-700"></div>
                <div className="text-sm text-gray-400">
                  <span className="block font-medium text-white">10X Your Sales</span>
                  with AI precision
                </div>
              </div>
            </div>
            <div className="relative"> 
              <div className="absolute -inset-4 bg-blue-500 opacity-10 blur-3xl rounded-full"></div>
              <div className="relative bg-gray-800 rounded-xl overflow-hidden shadow-2xl border border-gray-700">
                <div className="p-6 min-h-[300px] flex items-center justify-center">
                     <Image 
                        src="/6533aa34c693127e8f234ccf_Traffic.svg" 
                        alt="Traffic AI Email Illustration"
                        width={200} 
                        height={200}
                        className="opacity-50"
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Placeholder for Features, How It Works, CTA, and Footer sections from previous version */}
      {/* These will be integrated in subsequent steps */}
      <footer className="relative z-10 px-6 py-12 mt-16 border-t border-gray-700">
        <div className="max-w-7xl mx-auto text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Traffic AI Email. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <Link href="/terms-of-service" className="hover:text-white">Terms of Service</Link>
            <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;