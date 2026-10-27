'use client';

import { useState } from 'react';
import { CreateAssetSchema } from '@/types/asset';
import { ZodError } from 'zod';

export default function Week1Lab() {
  const [validationResult, setValidationResult] = useState<string>('');

  const runDiagnostic = (type: 'good' | 'bad') => {
    // Senior Fix: Keep payload initialization inside the client-side event thread.
    // This stops Next.js from evaluating dynamic 'new Date()' states during component tree boot.
    const badPayload = {
      name: 'T', // Fails min-length validation
      category: 'BANANA', // Fails category enum validation
      location: 'Front yard',
      acquiredAt: '2026-10-27', // String format to mimic standard incoming JSON payloads
      status: 'ACTIVE',
    };

    const goodPayload = {
      name: 'Kubota BX2380',
      category: 'MACHINERY',
      location: 'Shed',
      acquiredAt: new Date().toISOString(), // Standard clean serializable format
      status: 'ACTIVE',
    };

    const targetPayload = type === 'good' ? goodPayload : badPayload;

    try {
      // Normalize our dates cleanly into live Date objects right before parsing
      const processedPayload = {
        ...targetPayload,
        acquiredAt: new Date(targetPayload.acquiredAt)
      };

      const validatedData = CreateAssetSchema.parse(processedPayload);

      setValidationResult(
        `✅ SUCCESS: Data is correctly typed! \n\nChecked Asset Name: '${validatedData.name}'`
      );
    } catch (error) { // Senior Fix: Explicitly declare the `error` variable parameter here!
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map(
          (err) => `[Field: ${err.path.join('.')}] -> ${err.message}`
        );
        setValidationResult(`❌ VALIDATION ERROR: \n\n${errorMessages.join('\n')}`);
      } else {
        setValidationResult(`💥 UNEXPECTED RUNTIME ERROR: ${(error as Error).message}`);
      }
    }
  };

  return (
    <main className="p-8 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Week 1 Lab: Advanced Typing & Validation</h1>
      <p className="text-gray-600 dark:text-gray-400">
        Test how your inferred type schemas catch validation and runtime anomalies instantly.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => runDiagnostic('bad')}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Test Corrupted Payload
        </button>
        <button
          onClick={() => runDiagnostic('good')}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Test Valid Payload
        </button>
      </div>

      <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded text-sm whitespace-pre-wrap min-h-16 border">
        {validationResult || "Click a button above to run the schema validator..."}
      </pre>
    </main>
  );
}
