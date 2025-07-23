import { Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, FileText, CheckSquare, MessageCircle } from 'lucide-react';

/**
 * PPRPage: Demonstrates Partial Prerendering (PPR) in Next.js 15 with real API data.
 * The static shell of the page is prerendered at build time.
 * The dynamic parts (Suspense fallbacks) are streamed in at request time using JSONPlaceholder API.
 */

// TypeScript interfaces for API data
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    city: string;
    zipcode: string;
  };
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

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
  postId: number;
}

// Component to fetch and display recent posts with 1.5s delay
async function RecentPosts() {

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5', {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    const posts: Post[] = await response.json();
    const fetchTime = new Date().toLocaleTimeString();

    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-500" />
            Recent Posts
          </CardTitle>
          <CardDescription>
            Latest blog posts from JSONPlaceholder API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-sm line-clamp-2">{post.title}</h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {post.body}
                </p>
                <Badge variant="outline" className="mt-2 text-xs">
                  Post #{post.id}
                </Badge>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Fetched at {fetchTime}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  } catch (error) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-red-500">Error Loading Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Failed to load posts from API. Please try again later.
          </p>
        </CardContent>
      </Card>
    );
  }
}

// Component to fetch and display users with 2.5s delay
async function UserProfiles() {

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=4', {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    const users: User[] = await response.json();
    const fetchTime = new Date().toLocaleTimeString();

    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-green-500" />
            User Profiles
          </CardTitle>
          <CardDescription>
            Active users from our community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {users.map((user) => (
              <div key={user.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-semibold">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{user.name}</p>
                  <p className="text-xs text-muted-foreground">@{user.username}</p>
                  <p className="text-xs text-muted-foreground">{user.company.name}</p>
                  <p className="text-xs text-muted-foreground">{user.address.city}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Fetched at {fetchTime}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  } catch (error) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-red-500">Error Loading Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Failed to load user profiles from API. Please try again later.
          </p>
        </CardContent>
      </Card>
    );
  }
}

// Component to fetch and display todos with 3.5s delay
async function TodoList() {

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=8', {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }

    const todos: Todo[] = await response.json();
    const fetchTime = new Date().toLocaleTimeString();

    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5 text-purple-500" />
            Todo Items
          </CardTitle>
          <CardDescription>
            Task management from our productivity suite
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {todos.map((todo) => (
              <div key={todo.id} className="flex items-center space-x-3 p-2 rounded">
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                  todo.completed
                    ? 'bg-purple-500 border-purple-500'
                    : 'border-gray-300 dark:border-gray-600'
                }`}>
                  {todo.completed && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className={`text-sm flex-1 ${
                  todo.completed
                    ? 'line-through text-muted-foreground'
                    : 'text-foreground'
                }`}>
                  {todo.title}
                </span>
                <Badge variant={todo.completed ? "secondary" : "outline"} className="text-xs">
                  User {todo.userId}
                </Badge>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Fetched at {fetchTime}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  } catch (error) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-red-500">Error Loading Todos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Failed to load todo items from API. Please try again later.
          </p>
        </CardContent>
      </Card>
    );
  }
}

// Component to fetch and display comments with 4.5s delay
async function RecentComments() {

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=6', {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }

    const comments: Comment[] = await response.json();
    const fetchTime = new Date().toLocaleTimeString();

    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-orange-500" />
            Recent Comments
          </CardTitle>
          <CardDescription>
            Latest community discussions and feedback
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {comments.map((comment) => (
              <div key={comment.id} className="border-l-4 border-orange-500 pl-4 py-2">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-sm line-clamp-1">{comment.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    Post #{comment.postId}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{comment.email}</p>
                <p className="text-xs text-foreground line-clamp-2">{comment.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Fetched at {fetchTime}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  } catch (error) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-red-500">Error Loading Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Failed to load comments from API. Please try again later.
          </p>
        </CardContent>
      </Card>
    );
  }
}

// Loading skeleton components
function PostsSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
        </div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-l-4 border-gray-300 pl-4">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse mb-2"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse mb-1"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3 animate-pulse mb-2"></div>
              <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function UsersSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
        </div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-40 animate-pulse"></div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
              <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
              <div className="flex-1 space-y-1">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function TodosSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-28 animate-pulse"></div>
        </div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-52 animate-pulse"></div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3 p-2 rounded">
              <div className="w-4 h-4 rounded border-2 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded flex-1 animate-pulse"></div>
              <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function CommentsSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-36 animate-pulse"></div>
        </div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-56 animate-pulse"></div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border-l-4 border-gray-300 pl-4 py-2">
              <div className="flex items-center justify-between mb-1">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
                <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
              </div>
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-40 animate-pulse mb-1"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse mb-1"></div>
              <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function PPRPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Static Header - Prerendered */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Partial Prerendering (PPR)
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Experience Next.js 15's Partial Prerendering with real-time data streaming from JSONPlaceholder API.
          Watch as different sections load progressively with realistic delays.
        </p>
      </div>

      {/* Static Info Card - Prerendered */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Static Shell - Instantly Available
          </CardTitle>
          <CardDescription>
            This content is prerendered at build time and served immediately from the edge.
            The dynamic sections below will stream in progressively as their data becomes available.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">1.5s</div>
              <div className="text-sm text-muted-foreground">Posts Load</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">2.5s</div>
              <div className="text-sm text-muted-foreground">Users Load</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">3.5s</div>
              <div className="text-sm text-muted-foreground">Todos Load</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">4.5s</div>
              <div className="text-sm text-muted-foreground">Comments Load</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dynamic Content Grid - Streamed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Posts Section */}
        <Suspense fallback={<PostsSkeleton />}>
          <RecentPosts />
        </Suspense>

        {/* Users Section */}
        <Suspense fallback={<UsersSkeleton />}>
          <UserProfiles />
        </Suspense>

        {/* Todos Section */}
        <Suspense fallback={<TodosSkeleton />}>
          <TodoList />
        </Suspense>

        {/* Comments Section */}
        <Suspense fallback={<CommentsSkeleton />}>
          <RecentComments />
        </Suspense>
      </div>

      {/* Static Footer - Prerendered */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              🚀 <strong>PPR Benefits:</strong> Instant static shell delivery + Progressive dynamic content streaming
            </p>
            <p className="text-xs text-muted-foreground">
              Data fetched from <a href="https://jsonplaceholder.typicode.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">JSONPlaceholder API</a> with artificial delays to demonstrate streaming
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}