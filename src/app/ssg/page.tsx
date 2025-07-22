// src/app/ssg/page.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatTimestamp } from "@/lib/utils";

export default function SSGPage() {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Static Site Generation (SSG)</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This page is statically generated at build time. The content is pre-rendered and served from a CDN, making it extremely fast.</p>
                    <p>The data on this page was fetched at: {formatTimestamp(new Date())}</p>
        </CardContent>
      </Card>
    </div>
  );
}