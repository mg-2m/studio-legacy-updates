
"use client";

import React from 'react';

export function Welcome() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
            <h1 className="text-4xl font-bold mb-2">Welcome to Addis Crown</h1>
            <p className="text-lg text-muted-foreground">
                Your AI-powered legal assistant for Ethiopian law.
            </p>
            <p className="mt-4">
                Please select a legal module from the sidebar to begin building your case.
            </p>
        </div>
    );
}
