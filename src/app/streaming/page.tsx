// src/app/streaming/page.tsx
// Demonstrates real-world streaming with JSONPlaceholder API data

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Suspense } from 'react';
import { User, FileText, CheckSquare, Clock } from 'lucide-react';

// Types for API responses
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

// Component that fetches posts with 2 second delay
async function PostsComponent() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
    const posts: Post[] = await response.json();
    
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Latest Posts</h3>
          <Badge variant="secondary">Loaded after 2s</Badge>
        </div>
        {posts.map((post) => (
          <div key={post.id} className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
            <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
              {post.title}
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-400 line-clamp-2">
              {post.body}
            </p>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    return (
      <div className="p-4 border rounded-lg bg-red-50 dark:bg-red-900/20">
        <p className="text-red-600 dark:text-red-400">Failed to load posts</p>
      </div>
    );
  }
}

// Component that fetches users with 3 second delay
async function UsersComponent() {
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=3');
    const users: User[] = await response.json();
    
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <User className="h-5 w-5 text-green-600" />
          <h3 className="text-lg font-semibold">Active Users</h3>
          <Badge variant="secondary">Loaded after 3s</Badge>
        </div>
        {users.map((user) => (
          <div key={user.id} className="p-4 border rounded-lg bg-green-50 dark:bg-green-900/20">
            <h4 className="font-semibold text-green-800 dark:text-green-300">
              {user.name}
            </h4>
            <p className="text-sm text-green-700 dark:text-green-400">
              {user.email}
            </p>
            <p className="text-xs text-green-600 dark:text-green-500 mt-1">
              {user.company.name}
            </p>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    return (
      <div className="p-4 border rounded-lg bg-red-50 dark:bg-red-900/20">
        <p className="text-red-600 dark:text-red-400">Failed to load users</p>
      </div>
    );
  }
}

// Component that fetches todos with 4 second delay
async function TodosComponent() {
  await new Promise(resolve => setTimeout(resolve, 4000));
  
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
    const todos: Todo[] = await response.json();
    
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <CheckSquare className="h-5 w-5 text-purple-600" />
          <h3 className="text-lg font-semibold">Todo Items</h3>
          <Badge variant="secondary">Loaded after 4s</Badge>
        </div>
        {todos.map((todo) => (
          <div key={todo.id} className="p-3 border rounded-lg bg-purple-50 dark:bg-purple-900/20">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${
                todo.completed ? 'bg-green-500' : 'bg-gray-300'
              }`} />
              <span className={`text-sm ${
                todo.completed 
                  ? 'text-purple-600 dark:text-purple-400 line-through' 
                  : 'text-purple-800 dark:text-purple-300'
              }`}>
                {todo.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    return (
      <div className="p-4 border rounded-lg bg-red-50 dark:bg-red-900/20">
        <p className="text-red-600 dark:text-red-400">Failed to load todos</p>
      </div>
    );
  }
}

// Loading skeleton component
function LoadingSkeleton({ title }: { title: string }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-gray-400 animate-spin" />
        <h3 className="text-lg font-semibold text-gray-500">{title}</h3>
        <Badge variant="outline">Loading...</Badge>
      </div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-4 border rounded-lg bg-muted animate-pulse">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}

export default function StreamingPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            Real-World Streaming Demo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            This page demonstrates streaming with real API data from JSONPlaceholder. 
            Each section loads at different intervals to simulate real-world scenarios 
            where different data sources have varying response times.
          </p>
          
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {/* Posts Section - Loads after 2 seconds */}
            <Suspense fallback={<LoadingSkeleton title="Loading Posts" />}>
              <PostsComponent />
            </Suspense>
            
            {/* Users Section - Loads after 3 seconds */}
            <Suspense fallback={<LoadingSkeleton title="Loading Users" />}>
              <UsersComponent />
            </Suspense>
            
            {/* Todos Section - Loads after 4 seconds */}
            <Suspense fallback={<LoadingSkeleton title="Loading Todos" />}>
              <TodosComponent />
            </Suspense>
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
              How Streaming Works:
            </h4>
            <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
              <li>• Initial page content loads immediately</li>
              <li>• Posts section streams in after 2 seconds</li>
              <li>• Users section streams in after 3 seconds</li>
              <li>• Todos section streams in after 4 seconds</li>
              <li>• Each section shows loading state until data arrives</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}