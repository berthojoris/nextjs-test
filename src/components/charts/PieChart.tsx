'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart as PieChartIcon, Clock } from 'lucide-react';

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface Album {
  id: number;
  title: string;
  userId: number;
}

/**
 * PieChart component that fetches albums data from JSONPlaceholder API
 * and displays user distribution in a pie chart format
 */
export default function PieChart() {
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchTime, setFetchTime] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Add artificial delay for PPR demonstration
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        const response = await fetch('https://jsonplaceholder.typicode.com/albums');
        
        if (!response.ok) {
          throw new Error('Failed to fetch albums');
        }

        const albums: Album[] = await response.json();
        
        // Count albums per user
        const userAlbumCount = albums.reduce((acc, album) => {
          acc[album.userId] = (acc[album.userId] || 0) + 1;
          return acc;
        }, {} as Record<number, number>);

        // Prepare chart data
        const series = Object.values(userAlbumCount);
        const labels = Object.keys(userAlbumCount).map(userId => `User ${userId}`);

        const options = {
          chart: {
            type: 'pie' as const,
            height: 350,
            toolbar: {
              show: false
            }
          },
          labels,
          colors: [
            '#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444',
            '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1'
          ],
          legend: {
            position: 'bottom' as const,
            fontSize: '12px'
          },
          dataLabels: {
            enabled: true,
            formatter: function(val: number) {
              return Math.round(val) + '%';
            }
          },
          tooltip: {
            y: {
              formatter: function(val: number) {
                return val + ' albums';
              }
            }
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 300
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        };

        setChartData({ series, options });
        setFetchTime(new Date().toLocaleTimeString());
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-red-500">Error Loading Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Failed to load album data from API. Please try again later.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChartIcon className="h-5 w-5 text-purple-500" />
          Albums Distribution
        </CardTitle>
        <CardDescription>
          User album distribution from JSONPlaceholder API
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="w-full">
            {chartData && (
              <Chart
                options={chartData.options}
                series={chartData.series}
                type="pie"
                height={300}
              />
            )}
            <div className="mt-4 pt-4 border-t">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Fetched at {fetchTime}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}