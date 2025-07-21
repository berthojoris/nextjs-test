import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="container max-w-screen-2xl flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
          <CardDescription>This is a sample page using Shadcn UI.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Get started by editing <code>src/app/page.tsx</code></p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Learn More</Button>
          <Button>Get Started</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
