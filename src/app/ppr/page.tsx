import { Suspense } from 'react';

/**
 * PPRPage: Demonstrates Partial Prerendering (PPR) in Next.js 15.
 * The static shell of the page is prerendered at build time.
 * The dynamic parts (Suspense fallbacks) are streamed in at request time.
 */

// A component with a deliberately slow data fetch to demonstrate streaming.
async function SlowComponent() {
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate a slow data fetch
  const data = {
    message: 'This part was streamed in after the initial load!',
  };
  return (
    <div className="p-4 border rounded-lg bg-green-100 dark:bg-green-900/30">
      <p className="font-semibold text-green-800 dark:text-green-300">{data.message}</p>
    </div>
  );
}

// A loading skeleton to show while the slow component is loading.
function LoadingSkeleton() {
  return (
    <div className="p-4 border rounded-lg bg-muted animate-pulse">
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
    </div>
  );
}

export default function PPRPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Partial Prerendering (PPR)</h1>
      <p className="mb-4">This page demonstrates Partial Prerendering. The main content is static and loads instantly, while dynamic parts are streamed in.</p>

      <div className="p-4 border rounded-lg bg-background mb-4">
        <h2 className="text-xl font-semibold mb-2">Static Content</h2>
        <p>This part of the page is prerendered and delivered immediately from the edge.</p>
      </div>

      <h2 className="text-xl font-semibold mb-2">Dynamic Content</h2>
      <Suspense fallback={<LoadingSkeleton />}>
        <SlowComponent />
      </Suspense>

      <p className="mt-4 text-sm text-muted-foreground">
        The section above is dynamically rendered and streamed to the client. You saw a loading skeleton first, which was replaced by the content after a 2-second delay.
      </p>
    </div>
  );
}