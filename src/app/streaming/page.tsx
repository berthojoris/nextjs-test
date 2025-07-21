// src/app/streaming/page.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from 'react';

// A component that simulates a slow data fetch
async function SlowComponent() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return <p>This part was streamed in after a delay.</p>;
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
          <Suspense fallback={<p>Loading slow component...</p>}>
            <SlowComponent />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}