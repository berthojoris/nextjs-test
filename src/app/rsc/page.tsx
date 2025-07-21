/**
 * RSCPage: A demonstration of a React Server Component.
 * This component is rendered entirely on the server and sends only HTML to the client.
 * It cannot use hooks like useState or useEffect.
 */

// Simulate a server-only data fetch.
async function getServerData() {
  // In a real app, this would fetch from a database or an API.
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
  return {
    message: 'Hello from the server!',
    timestamp: new Date().toISOString(),
  };
}

export default async function RSCPage() {
  const data = await getServerData();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">React Server Component (RSC)</h1>
      <p className="mb-2">This page is a React Server Component, rendered on the server.</p>
      <div className="p-4 border rounded-lg bg-green-100 dark:bg-green-900/30">
        <p className="font-semibold text-green-800 dark:text-green-300">Server Message: {data.message}</p>
        <p className="font-semibold text-green-800 dark:text-green-300">Render Timestamp: {data.timestamp}</p>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Notice how there is no loading spinner. The data is fetched and rendered before the page is sent to the browser.
      </p>
    </div>
  );
}