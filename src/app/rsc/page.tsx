import { formatTimestamp } from '@/lib/utils';
import { Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, FileText, Image, CheckSquare, Clock } from 'lucide-react';

/**
 * RSCPage: A demonstration of React Server Components with real API streaming.
 * This component fetches data from JSONPlaceholder API with staggered delays
 * to showcase progressive loading and streaming capabilities.
 */

// Type definitions for JSONPlaceholder API
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    city: string;
  };
  company: {
    name: string;
  };
}

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface Album {
  id: number;
  userId: number;
  title: string;
}

interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

// Server-side data fetching functions
async function fetchUserProfile(): Promise<{ user: User; timestamp: Date }> {
  await new Promise(resolve => setTimeout(resolve, 1000)); // 1s delay
  
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1', {
      cache: 'no-store' // Ensure fresh data for demonstration
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    
    const user = await response.json();
    return { user, timestamp: new Date() };
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

async function fetchRecentPosts(): Promise<{ posts: Post[]; timestamp: Date }> {
  await new Promise(resolve => setTimeout(resolve, 2000)); // 2s delay
  
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?userId=1&_limit=5', {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch posts data');
    }
    
    const posts = await response.json();
    return { posts, timestamp: new Date() };
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

async function fetchUserAlbums(): Promise<{ albums: Album[]; timestamp: Date }> {
  await new Promise(resolve => setTimeout(resolve, 3000)); // 3s delay
  
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/albums?userId=1&_limit=4', {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch albums data');
    }
    
    const albums = await response.json();
    return { albums, timestamp: new Date() };
  } catch (error) {
    console.error('Error fetching albums:', error);
    throw error;
  }
}

async function fetchUserTodos(): Promise<{ todos: Todo[]; timestamp: Date }> {
  await new Promise(resolve => setTimeout(resolve, 4000)); // 4s delay
  
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?userId=1&_limit=6', {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch todos data');
    }
    
    const todos = await response.json();
    return { todos, timestamp: new Date() };
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
}

// Loading skeleton components
function UserProfileSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
        </div>
      </CardContent>
    </Card>
  );
}

function PostsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3 animate-pulse"></div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function AlbumsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function TodosSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded flex-1 animate-pulse"></div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Server Components
async function UserProfile() {
  try {
    const { user, timestamp } = await fetchUserProfile();
    
    return (
      <Card className="border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
            <User className="w-5 h-5" />
            User Profile
          </CardTitle>
          <CardDescription>
            Fetched at {formatTimestamp(timestamp)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-lg">{user.name}</h3>
              <p className="text-sm text-muted-foreground">@{user.username}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm"><strong>Email:</strong> {user.email}</p>
              <p className="text-sm"><strong>Company:</strong> {user.company.name}</p>
              <p className="text-sm"><strong>Location:</strong> {user.address.street}, {user.address.city}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  } catch (error) {
    return (
      <Card className="border-red-200 dark:border-red-800">
        <CardContent className="pt-6">
          <p className="text-red-600 dark:text-red-400">Failed to load user profile</p>
        </CardContent>
      </Card>
    );
  }
}

async function RecentPosts() {
  try {
    const { posts, timestamp } = await fetchRecentPosts();
    
    return (
      <Card className="border-green-200 dark:border-green-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
            <FileText className="w-5 h-5" />
            Recent Posts
          </CardTitle>
          <CardDescription>
            Fetched at {formatTimestamp(timestamp)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {posts.map((post, index) => (
              <div key={post.id}>
                <h4 className="font-medium text-sm mb-1 capitalize">{post.title}</h4>
                <p className="text-xs text-muted-foreground line-clamp-2">{post.body}</p>
                {index < posts.length - 1 && <Separator className="mt-3" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  } catch (error) {
    return (
      <Card className="border-red-200 dark:border-red-800">
        <CardContent className="pt-6">
          <p className="text-red-600 dark:text-red-400">Failed to load posts</p>
        </CardContent>
      </Card>
    );
  }
}

async function UserAlbums() {
  try {
    const { albums, timestamp } = await fetchUserAlbums();
    
    return (
      <Card className="border-purple-200 dark:border-purple-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
            <Image className="w-5 h-5" />
            Albums
          </CardTitle>
          <CardDescription>
            Fetched at {formatTimestamp(timestamp)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {albums.map((album) => (
              <div key={album.id} className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-sm font-medium capitalize">{album.title}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  } catch (error) {
    return (
      <Card className="border-red-200 dark:border-red-800">
        <CardContent className="pt-6">
          <p className="text-red-600 dark:text-red-400">Failed to load albums</p>
        </CardContent>
      </Card>
    );
  }
}

async function UserTodos() {
  try {
    const { todos, timestamp } = await fetchUserTodos();
    const completedCount = todos.filter(todo => todo.completed).length;
    
    return (
      <Card className="border-orange-200 dark:border-orange-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
            <CheckSquare className="w-5 h-5" />
            Todos
            <Badge variant="secondary" className="ml-auto">
              {completedCount}/{todos.length} completed
            </Badge>
          </CardTitle>
          <CardDescription>
            Fetched at {formatTimestamp(timestamp)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                  todo.completed 
                    ? 'bg-green-500 border-green-500' 
                    : 'border-gray-300 dark:border-gray-600'
                }`}>
                  {todo.completed && (
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className={`text-sm capitalize ${
                  todo.completed 
                    ? 'line-through text-muted-foreground' 
                    : ''
                }`}>
                  {todo.title}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  } catch (error) {
    return (
      <Card className="border-red-200 dark:border-red-800">
        <CardContent className="pt-6">
          <p className="text-red-600 dark:text-red-400">Failed to load todos</p>
        </CardContent>
      </Card>
    );
  }
}

export default function RSCPage() {
  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          React Server Components with Real API Streaming
        </h1>
        <p className="text-lg text-muted-foreground mb-4">
          This page demonstrates RSC streaming with real JSONPlaceholder API data.
          Each section loads progressively with different delays to showcase streaming capabilities.
        </p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>Loading times: Profile (1s) → Posts (2s) → Albums (3s) → Todos (4s)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Profile - Loads first (1s) */}
        <Suspense fallback={<UserProfileSkeleton />}>
          <UserProfile />
        </Suspense>

        {/* Recent Posts - Loads second (2s) */}
        <Suspense fallback={<PostsSkeleton />}>
          <RecentPosts />
        </Suspense>

        {/* User Albums - Loads third (3s) */}
        <Suspense fallback={<AlbumsSkeleton />}>
          <UserAlbums />
        </Suspense>

        {/* User Todos - Loads last (4s) */}
        <Suspense fallback={<TodosSkeleton />}>
          <UserTodos />
        </Suspense>
      </div>

      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">How RSC Streaming Works:</h3>
        <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
          <li>• The page shell loads immediately with loading skeletons</li>
          <li>• Each Suspense boundary streams content as server components complete</li>
          <li>• Users see progressive loading instead of waiting for all data</li>
          <li>• Server-side rendering with real API integration and error handling</li>
        </ul>
      </div>
    </div>
  );
}