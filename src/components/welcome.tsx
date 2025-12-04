
"use client";

import React from 'react';
import { TEMPLATES, TEMPLATE_DATA } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { Scale } from 'lucide-react';
import { EditorSidebarTrigger } from './ui/editor-sidebar';
import { SidebarTrigger } from './ui/sidebar';

interface WelcomeProps {
    dispatch: React.Dispatch<any>;
}

const Welcome: React.FC<WelcomeProps> = ({ dispatch }) => {
    
    const handleTemplateSelect = (templateId: string, subTemplateId: string) => {
        dispatch({
            type: 'SET_SELECTED_SUB_TEMPLATE',
            payload: { templateId, subTemplateId }
        });
    };

    return (
      <section className="flex flex-1 flex-col bg-muted/30 h-screen">
        <div className="no-print z-10 flex h-14 flex-shrink-0 items-center gap-2 border-b bg-background/80 p-2 backdrop-blur-sm">
            <SidebarTrigger />
            <EditorSidebarTrigger />
        </div>
        <ScrollArea className="flex-1">
            <div className="p-6 md:p-10">
                <div className="flex flex-col items-center text-center mb-10">
                     <div className="p-3 mb-4 bg-primary text-primary-foreground rounded-full">
                        <Scale className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-bold text-primary">እንኳን ወደ አዲስ ክራውን በደህና መጡ</h1>
                    <p className="mt-2 text-lg text-muted-foreground max-w-2xl">
                        የህግ ሰነዶችን በቀላሉ እና በፍጥነት ለማዘጋጀት የሚያስችልዎ መድረክ። ለመጀመር ከታች ካሉት የአብነት ምድቦች ይምረጡ ወይም የጎን ምናሌን ይጠቀሙ።
                    </p>
                    <Badge variant="secondary" className="mt-4">"begin by collapsing template menu or manually search yourself from sidebar"</Badge>
                </div>

                <div className="grid gap-6">
                    {TEMPLATES.map(template => (
                        <Card key={template.id} className="overflow-hidden">
                            <CardHeader className="bg-muted/50">
                                <CardTitle className="flex items-center gap-3 text-primary">
                                    <template.icon className="w-6 h-6" />
                                    <span className="text-xl">{template.label}</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {template.subTemplates.map(subTemplate => {
                                    const subTemplateData = TEMPLATE_DATA[subTemplate.id];
                                    // Get the first sentence of the guide for a minimal description.
                                    const description = subTemplateData?.templateDescription?.split('\n')[2] || 'Click to get started.';

                                    return (
                                        <Button
                                            key={subTemplate.id}
                                            variant="outline"
                                            className="h-auto w-full text-left flex flex-col items-start p-4 justify-start hover:bg-accent/10"
                                            onClick={() => handleTemplateSelect(template.id, subTemplate.id)}
                                        >
                                            <div className="flex items-center gap-2 font-bold text-base">
                                                <subTemplate.icon className="w-5 h-5 text-accent" />
                                                <span>{subTemplate.label}</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-2 font-normal whitespace-normal">
                                                {description}
                                            </p>
                                        </Button>
                                    );
                                })}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </ScrollArea>
      </section>
    );
};

export default Welcome;
