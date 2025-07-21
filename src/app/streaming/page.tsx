// src/app/streaming/page.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from 'react';

// A component that simulates a slow data fetch
async function SlowComponent() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return (
    <div className="p-4 border rounded-lg bg-green-100 dark:bg-green-900/30">
      <p className="font-semibold text-green-800 dark:text-green-300">This part was streamed in after a delay.</p>
    </div>
  );
}

export default function StreamingPage() {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Streaming & Suspense</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This page demonstrates streaming. The initial UI is sent immediately, and slower parts of the UI are streamed in as they become ready.</p>
                    <Suspense fallback={
            <div className="p-4 border rounded-lg bg-muted animate-pulse">
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          }>
            <SlowComponent />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}