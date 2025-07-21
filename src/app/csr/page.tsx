// src/app/csr/page.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function CSRPage() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    // This code runs only on the client
    setTime(new Date().toISOString());
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Client-Side Rendering (CSR)</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This page is initially rendered with a loading state, and the content is fetched and rendered on the client-side.</p>
          <p>Time rendered on client: {time || 'Loading...'}</p>
        </CardContent>
      </Card>
    </div>
  );
}