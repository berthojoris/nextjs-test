import { Card, CardContent, CardHeader } from '@/components/ui/card';

/**
 * Skeleton components for chart loading states
 */

export function PieChartSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-40 animate-pulse"></div>
        </div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-56 animate-pulse"></div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center h-64">
          <div className="w-48 h-48 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
        </div>
        <div className="mt-4 pt-4 border-t">
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
        </div>
      </CardContent>
    </Card>
  );
}

export function LineChartSkeleton() {
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
        <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
        <div className="mt-4 pt-4 border-t">
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
        </div>
      </CardContent>
    </Card>
  );
}