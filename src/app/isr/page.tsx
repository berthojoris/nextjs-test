// src/app/isr/page.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const revalidate = 10; // Revalidate every 10 seconds

async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    // Let the error boundary handle it
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function ISRPage() {
  const data = await getData();
  const { title, completed } = data;

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Incremental Static Regeneration (ISR)</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This page is statically generated, but it will be re-generated in the background after a certain amount of time (10 seconds).</p>
          <p>Todo Title: {title}</p>
          <p>Completed: {completed ? 'Yes' : 'No'}</p>
          <p className="text-sm text-muted-foreground mt-2">Data fetched at: {new Date().toLocaleTimeString()}</p>
        </CardContent>
      </Card>
    </div>
  );
}