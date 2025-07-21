import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

async function getData() {
  // This fetch will be executed on the server for every request.
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/1', { cache: 'no-store' });
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    // In a real app, you'd want to handle this error more gracefully
    return { error: 'Failed to fetch data.' };
  }
}

export default async function SSRPage() {
  const data = await getData();

  if (data.error) {
    return (
      <div className="container max-w-screen-2xl flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
        <p className="text-red-500">{data.error}</p>
      </div>
    );
  }

  const { title, completed } = data;

  return (
    <div className="container max-w-screen-2xl flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>Server-Side Rendering (SSR)</CardTitle>
          <CardDescription>
            This page is rendered on the server for every request. The data below is fetched on the server from a test API and sent as a complete HTML page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Todo Title: {title}</p>
          <p>Completed: {completed ? 'Yes' : 'No'}</p>
        </CardContent>
      </Card>
    </div>
  );
}