
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import type { AppState, Action } from "@/lib/types";

// --- Types (assuming they are defined as before) ---
interface SocraticNode {
    id: string;
    legalText: string;
    rhetoric: string;
}

interface SocraticResponse {
    currentNode: SocraticNode;
    nextNode?: SocraticNode;
}

// --- Mock Function (as before) ---
const getNextSocraticNodeMock = async (nodeId: string, answers: object): Promise<SocraticResponse> => {
    console.log(`Mocking request for node: ${nodeId} with answers:`, answers);
    const sampleNodes: Record<string, SocraticNode> = {
        'cl_q_is_contract_written': {
            id: 'cl_q_is_contract_written',
            legalText: "A contract can be made in writing or orally.",
            rhetoric: "What is the form of the contract in question?"
        },
        'cl_q_is_consent_valid': {
            id: 'cl_q_is_consent_valid',
            legalText: "Consent must be freely given.",
            rhetoric: "Was there any pressure or misunderstanding when agreeing?"
        }
    };
    return { currentNode: sampleNodes[nodeId] || sampleNodes['cl_q_is_contract_written'] };
};

interface SocraticViewProps {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

export function SocraticView({ state, dispatch }: SocraticViewProps) {
    const [currentNode, setCurrentNode] = useState<SocraticNode | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const initialNodeId = 'cl_q_is_contract_written';
        const fetchInitialNode = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await getNextSocraticNodeMock(initialNodeId, {});
                setCurrentNode(response.currentNode);
            } catch (err) {
                setError("Failed to load initial question. Please try again later.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchInitialNode();
    }, []);

    const handleAnswer = (answer: any) => {
        if (!currentNode) return;

        dispatch({ type: 'UPDATE_FACT_VALUE', payload: { factId: currentNode.id, field: 'answer', value: answer } });
        console.log(`State updated: { ${currentNode.id}: "${answer}" }`);

        const fetchNextNode = async () => {
            try {
                setLoading(true);
                setError(null);
                const nextId = "cl_q_is_consent_valid"; // Hardcoded for MVP
                const response = await getNextSocraticNodeMock(nextId, { [currentNode.id]: answer });
                setCurrentNode(response.currentNode);
            } catch (err) {
                setError("Failed to load next question.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchNextNode();
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
    if (!currentNode) return <div className="p-8 text-center">End of conversation.</div>;

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <div className="mb-4 p-4 border-l-4 border-primary bg-muted/20 rounded-r-lg">
                <h3 className="font-semibold text-lg">Legal Context:</h3>
                <p className="text-sm text-muted-foreground">{currentNode.legalText}</p>
            </div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">{currentNode.rhetoric}</h2>
            </div>
            <div className="flex gap-4">
                <Button onClick={() => handleAnswer('Written')}>Written</Button>
                <Button onClick={() => handleAnswer('Oral')} variant="secondary">Oral</Button>
            </div>
        </div>
    );
}
