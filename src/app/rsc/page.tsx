import { formatTimestamp } from '@/lib/utils';
import { Suspense } from 'react';

/**
 * RSCPage: A demonstration of a React Server Component with streaming.
 * This component uses Suspense to stream server-rendered content.
 */

// Simulate a server-only data fetch.
async function getServerData() {
  // In a real app, this would fetch from a database or an API.
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
  return {
    message: 'Hello from the server!',
    timestamp: new Date(),
  };
}

function LoadingSkeleton() {
  return (
    <div className="p-4 border rounded-lg bg-muted animate-pulse">
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
    </div>
  );
}

async function ServerData() {
  const data = await getServerData();
  return (
    <div className="p-4 border rounded-lg bg-green-100 dark:bg-green-900/30">
      <p className="font-semibold text-green-800 dark:text-green-300">Server Message: {data.message}</p>
            <p className="font-semibold text-green-800 dark:text-green-300">Render Timestamp: {formatTimestamp(data.timestamp)}</p>
    </div>
  );
}

export default function RSCPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">React Server Component (RSC) with Streaming</h1>
      <p className="mb-2">This page demonstrates how Suspense enables streaming server rendering.</p>
      <Suspense fallback={<LoadingSkeleton />}>
        <ServerData />
      </Suspense>
      <p className="mt-4 text-sm text-muted-foreground">
        The initial page is sent immediately with a loading skeleton. The server-rendered content is then streamed in once ready.
      </p>
    </div>
  );
}