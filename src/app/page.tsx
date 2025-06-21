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
                <Link href="/mail" className="px-6 py-3 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors">
                  Go to Email Client
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
      <footer className="relative z-10 px-6 py-12 mt-16 border-t border-gray-700 bg-gradient-to-b from-transparent to-gray-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-400 text-sm">
          {/* Column 1: Logo and Copyright */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Image
              src="/6533aa34c693127e8f234ccf_Traffic.svg"
              alt="Traffic AI Email Logo"
              width={100}
              height={100}
              className="mb-4"
            />
            <p>&copy; {new Date().getFullYear()} Traffic AI Email. All rights reserved.</p>
            <div className="mt-2 space-x-4">
              <Link href="/terms-of-service" className="hover:text-white">Terms of Service</Link>
              <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            </div>
          </div>

          {/* Column 2: Call to Action & Social Media */}
          <div className="flex flex-col items-center md:items-center text-center">
            <h3 className="text-lg font-semibold text-white mb-4">Ready to Transform Your Outreach?</h3>
            <Link href="/sign-up" className="px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 mb-6 shadow-lg">
              Get Started Free
            </Link>
            <div className="flex space-x-6">
              {/* Placeholder Social Icons - replace with actual SVG/components later if desired */}
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.002 3.797.048 1.05.056 1.749.217 2.428.465.667.236 1.144.486 1.596.939.453.452.703.929.939 1.596.248.679.409 1.378.465 2.428.047 1.013.048 1.372.048 3.797 0 2.43-.002 2.784-.048 3.797-.056 1.05-.217 1.749-.465 2.428-.236.667-.486 1.144-.939 1.596-.453.452-.929.703-1.596.939-.679.248-1.378.409-2.428.465-1.013.047-1.372.048-3.797.048s-2.784-.002-3.797-.048c-1.05-.056-1.749-.217-2.428-.465-.667-.236-1.144-.486-1.596-.939-.453-.452-.703-.929-.939-1.596-.248-.679-.409-1.378-.465-2.428-.047-1.013-.048-1.372-.048-3.797s.002-2.784.048-3.797c.056-1.05.217-1.749.465-2.428.236-.667.486-1.144.939-1.596.452-.453.929-.703 1.596-.939.679-.248 1.378-.409 2.428-.465C9.526 2.002 9.88 2 12.315 2zm0 2.166c-2.312 0-2.627.01-3.732.068-.973.045-1.502.174-1.859.309-.356.133-.66.298-.93.568-.27.27-.432.574-.568.93-.135.357-.264.886-.309 1.859-.058 1.105-.068 1.42-.068 3.732s.01 2.627.068 3.732c.045.973.174 1.502.309 1.859.133.356.298.66.568.93.27.27.574.432.93.568.357.135.886.264 1.859.309 1.105.058 1.42.068 3.732.068s2.627-.01 3.732-.068c-.973-.045-1.502-.174-1.859-.309-.356-.133-.66-.298-.93-.568-.27-.27-.432-.574-.568-.93-.135-.357-.264-.886-.309-1.859-.058-1.105-.068-1.42-.068-3.732s-.01-2.627-.068-3.732c-.045-.973-.174-1.502-.309-1.859-.133-.356-.298-.66-.568-.93-.27-.27-.574-.432-.93-.568-.357-.135-.886-.264-1.859-.309-1.105-.058-1.42-.068-3.732-.068zm0 1.802a6.83 6.83 0 100 13.66 6.83 6.83 0 000-13.66zm0 4.078a2.75 2.75 0 110 5.5 2.75 2.75 0 010-5.5zm5.83-.249a1.006 1.006 0 00-1.005-1.005h-.002a1.006 1.006 0 101.005 1.005h.002z" clipRule="evenodd" /></svg></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19.615 3.184c-1.04-.24-2.113-.48-3.19-.732C15.0 2.91 13.5 2.5 12 2.5c-1.5 0-3 .41-4.425.952-1.076.252-2.15.492-3.19.732C3.5 3.9 2 5.4 2 7.5v9c0 2.1 1.5 3.6 3.385 3.816c1.04.24 2.113.48 3.19.732C9.0 21.09 10.5 21.5 12 21.5c1.5 0 3-.41 4.425-.952c1.076-.252 2.15-.492 3.19-.732C20.5 20.1 22 18.6 22 16.5v-9c0-2.1-1.5-3.6-3.385-3.816Zm-10.36 8.755l-3.84 2.17c-.31.17-.67.17-.98 0-.31-.17-.5-.5-.5-.86v-4.34c0-.36.19-.69.5-.86.31-.17.67-.17.98 0l3.84 2.17c.31.17.5.5.5.86s-.19.69-.5.86Zm7.52-2.17c.31-.17.67-.17.98 0l3.84 2.17c.31.17.5.5.5.86s-.19.69-.5.86l-3.84 2.17c-.31.17-.67.17-.98 0-.31-.17-.5-.5-.5-.86v-4.34c0-.36.19-.69.5-.86Z" clipRule="evenodd" /></svg></a>
            </div>
          </div>

          {/* Column 3: Newsletter Signup */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-500 mb-4">Join our newsletter for the latest news and updates.</p>
            <form className="w-full max-w-sm">
              <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden">
                <input
                  type="email"
                  placeholder="Your email address"
                  aria-label="Your email address"
                  className="flex-grow px-4 py-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-600 text-xs">
          <p>Built with ❤️ by Traffic AI Email Team</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;