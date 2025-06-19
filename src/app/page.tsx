import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/theme-toggle"
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import Image from 'next/image'
import { ArrowRight, Sparkles, Mail, Search, Keyboard, Zap, Star } from 'lucide-react'

const LandingPage = async () => {
    const { userId } = auth()
    const cookieStore = cookies()
    const previewMode = cookieStore.get('preview-landing')
    
    // Only redirect if the user is authenticated AND not in preview mode
    if (userId && !previewMode) {
        return redirect('/mail')
    }
    return (
        <>
            {/* Hero Background */}
            <div className="absolute inset-0 z-[-2] bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900"></div>
            <div className="absolute inset-0 z-[-1] opacity-30 dark:opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_80%)]"></div>
            </div>

            {/* Navigation */}
            <header className="container mx-auto py-6 px-4">
                <nav className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Mail className="h-6 w-6" />
                        <span className="font-bold text-xl">NormalHuman</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link href="/sign-in" className="text-sm hover:underline">Sign In</Link>
                        <Link href="/sign-up" className="text-sm hover:underline">Sign Up</Link>
                        <ModeToggle />
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <main className="container mx-auto px-4">
                <div className="flex flex-col items-center pt-20 md:pt-32 text-center">
                    <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                        <Sparkles className="h-3.5 w-3.5 mr-2 text-blue-600" />
                        <span className="text-xs font-medium">New: AI Email Assistant</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-300 dark:to-white max-w-4xl">
                        The AI-powered email client for the modern professional
                    </h1>

                    <p className="text-xl mb-10 text-gray-600 dark:text-gray-300 max-w-2xl">
                        Experience email reimagined with our minimalist interface, powerful AI tools, and new email marketing assistant to help you communicate more effectively.
                    </p>

                    <div className="flex gap-4 mb-16">
                        <Button size="lg" className="gap-2 rounded-full px-8 bg-blue-600 hover:bg-blue-700">
                            <Link href="/mail" className="flex items-center">Try it now <ArrowRight className="h-4 w-4 ml-1" /></Link>
                        </Button>
                        <Link href="/mail?tab=ai-email">
                            <Button variant="outline" size="lg" className="gap-2 rounded-full px-8">
                                <Sparkles className="h-4 w-4" /> AI Email Assistant
                            </Button>
                        </Link>
                    </div>

                    {/* App Screenshot */}
                    <div className="relative w-full max-w-5xl">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 shadow-2xl">
                            <Image 
                                src='/demo.png' 
                                alt='Email client with AI assistant' 
                                width={1200} 
                                height={675} 
                                className='w-full h-auto' 
                                priority
                            />
                            <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                                <div className="flex items-center gap-1">
                                    <Sparkles className="h-3 w-3" />
                                    AI Assistant Tab
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <section className="py-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Powerful features to transform your email workflow</h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Our email client combines minimalist design with cutting-edge AI tools
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* AI Email Assistant Feature */}
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg transition-all hover:shadow-xl hover:scale-[102%]">
                            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-5">
                                <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">AI Email Assistant</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Our newest feature crafts perfect marketing emails using your company data, LinkedIn profiles, and blog content.
                            </p>
                        </div>

                        {/* Other Features */}
                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg transition-all hover:shadow-xl hover:scale-[102%]">
                            <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-5">
                                <Search className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Full-text search</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Quickly find any email with our powerful search functionality powered by machine learning algorithms.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg transition-all hover:shadow-xl hover:scale-[102%]">
                            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-5">
                                <Keyboard className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Shortcut-focused</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Navigate your inbox efficiently with our intuitive keyboard shortcuts designed for power users.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg transition-all hover:shadow-xl hover:scale-[102%]">
                            <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-5">
                                <Zap className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">AI-driven RAG</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Let our AI prioritize and categorize your emails, so you can focus on what's important.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg transition-all hover:shadow-xl hover:scale-[102%]">
                            <div className="h-12 w-12 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mb-5">
                                <Star className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Premium Features</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Access advanced features like marketing email generation, email analytics, and more with our premium plan.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 mb-10">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
                        <h2 className="text-3xl font-bold mb-4">Ready to transform your email experience?</h2>
                        <p className="text-xl mb-8 max-w-2xl mx-auto">Start using our AI-powered email client today and see the difference it makes in your productivity.</p>
                        <Button size="lg" variant="secondary" className="rounded-full px-8">
                            <Link href="/mail">Get Started</Link>
                        </Button>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-gray-200 dark:border-gray-800 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex justify-center items-center gap-4 mb-4">
                        <Link href="/sign-in" className="hover:underline">Sign In</Link>
                        <Link href="/sign-up" className="hover:underline">Sign Up</Link>
                        <Link href="/terms-of-service" className="hover:underline">Terms</Link>
                        <Link href="/privacy" className="hover:underline">Privacy</Link>
                    </div>
                    <p>© {new Date().getFullYear()} NormalHuman. All rights reserved.</p>
                </footer>
            </main>
        </>
    )
}

export default LandingPage