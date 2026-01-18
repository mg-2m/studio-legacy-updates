
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Scale, BrainCircuit, Globe, ArrowRight, MessageSquare, Phone, Send, ShieldCheck, Zap } from 'lucide-react';

interface LandingPageProps {
    onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
    const features = [
        {
            icon: <Scale className="h-8 w-8 text-blue-500" />,
            title: "የህግ ሰነድ ማርቀቅ",
            description: "በደቂቃዎች ውስጥ ከ40 በላይ የህግ ሰነዶችን በተለያዩ የህግ መስኮች ይረቁ።"
        },
        {
            icon: <BrainCircuit className="h-8 w-8 text-blue-500" />,
            title: "AI የህግ ምክር",
            description: "በህግ ጉዳዮችዎ ላይ ፈጣን እና አስተማማኝ የሆነ ሰው ሰራሽ የማሰብ ችሎታ ያለው ምክር ያግኙ።"
        },
        {
            icon: <Globe className="h-8 w-8 text-blue-500" />,
            title: "ሁሉን አቀፍ የህግ መረጃ",
            description: "የኢትዮጵያን ህጎች፣ ደንቦች、 እና የፍርድ ቤት ውሳኔዎችን በቀላሉ ይፈልጉ እና ያግኙ።"
        }
    ];

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href')?.substring(1);
        if (targetId) {
            const targetElement = document.getElementById(targetId);
            targetElement?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="bg-gray-50 text-gray-800 font-sans">
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
                <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                         <img src="/logo.png" alt="Addis Crown Logo" className="h-8 w-8" />
                        <span className="text-2xl font-bold text-gray-900">Addis Crown</span>
                    </div>
                    <nav className="hidden md:flex space-x-8 items-center">
                        <a href="#features" onClick={handleSmoothScroll} className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
                        <a href="#about" onClick={handleSmoothScroll} className="text-gray-600 hover:text-blue-600 transition-colors">About Us</a>
                        <a href="#contact" onClick={handleSmoothScroll} className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
                        <Button onClick={onGetStarted} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                            Get Started
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </nav>
                    <div className="md:hidden">
                    </div>
                </div>
            </header>

            <main className="pt-20">
                <section className="bg-white py-20 md:py-32">
                    <div className="container mx-auto px-6 text-center">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
                            የህግ አገልግሎትን ለሁሉም ሰው
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                           Addis Crown የህግ ሰነዶችን ለማዘጋጀት፣ የህግ ምክር ለማግኘት እና የህግ መረጃዎችን ለመፈለግ የሚያስችልዎ ዘመናዊ መድረክ ነው።
                        </p>
                        <Button onClick={onGetStarted} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-transform">
                           Enter Platform / አሁን ይጀምሩ
                        </Button>
                    </div>
                </section>

                <section id="features" className="py-20">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">ዋና ዋና አገልግሎቶቻችን</h2>
                            <p className="text-gray-600 mt-2">Addis Crown የህግ ሂደቶችዎን ቀላል እና ቀልጣፋ ያደርጋል።</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                                    <div className="mb-4">{feature.icon}</div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="about" className="bg-white py-20">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">ስለ እኛ</h2>
                        </div>
                        <div className="max-w-4xl mx-auto text-center text-gray-600 text-lg">
                            <p>Addis Crown በኢትዮጵያ ውስጥ የህግ አገልግሎትን ተደራሽነት ለማሻሻል የተቋቋመ ነው። ልምድ ያላቸው የህግ ባለሙያዎች እና የቴክኖሎጂ ባለሙያዎች ቡድናችን ለህግ ፍላጎቶችዎ አስተማማኝ እና ቀልጣፋ መፍትሄዎችን ለማቅረብ ቁርጠኛ ነው።</p>
                        </div>
                    </div>
                </section>
                 <section className="bg-blue-600 text-white">
                        <div className="container mx-auto px-6 py-16 text-center">
                            <h2 className="text-3xl font-bold mb-4">Are you ready to revolutionize your legal work?</h2>
                            <p className="text-blue-200 mb-8 max-w-2xl mx-auto">Join hundreds of legal professionals who are already leveraging the power of AI to deliver better, faster, and more affordable legal services.</p>
                            <Button onClick={onGetStarted} variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-gray-100 border-transparent text-lg px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-transform">
                            Enter Platform / አሁን ይጀምሩ
                            </Button>
                        </div>
                    </section>
                </main>

            <footer id="contact" className="bg-gray-800 text-white py-12">
                <div className="container mx-auto px-6 text-center">
                    <p>&copy; 2024 Addis Crown. All rights reserved.</p>
                    <div className="flex justify-center space-x-4 mt-4">
                        <a href="#" className="hover:text-blue-400"><Send /></a>
                        <a href="#" className="hover:text-blue-400"><Phone /></a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
