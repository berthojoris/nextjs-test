'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Clock } from 'lucide-react';

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

/**
 * LineChart component that fetches posts data from JSONPlaceholder API
 * and displays posts count per user in a line chart format
 */
export default function LineChart() {
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchTime, setFetchTime] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Add artificial delay for PPR demonstration
        await new Promise(resolve => setTimeout(resolve, 4000));
        
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const posts: Post[] = await response.json();
        
        // Count posts per user
        const userPostCount = posts.reduce((acc, post) => {
          acc[post.userId] = (acc[post.userId] || 0) + 1;
          return acc;
        }, {} as Record<number, number>);

        // Prepare chart data
        const categories = Object.keys(userPostCount).map(userId => `User ${userId}`);
        const data = Object.values(userPostCount);

        const options = {
          chart: {
            type: 'line' as const,
            height: 350,
            toolbar: {
              show: false
            },
            zoom: {
              enabled: false
            }
          },
          stroke: {
            curve: 'smooth' as const,
            width: 3
          },
          colors: ['#10B981'],
          dataLabels: {
            enabled: false
          },
          markers: {
            size: 6,
            colors: ['#10B981'],
            strokeColors: '#fff',
            strokeWidth: 2,
            hover: {
              size: 8
            }
          },
          grid: {
            borderColor: '#e7e7e7',
            row: {
              colors: ['#f3f3f3', 'transparent'],
              opacity: 0.5
            }
          },
          xaxis: {
            categories,
            title: {
              text: 'Users',
              style: {
                fontSize: '12px'
              }
            },
            labels: {
              style: {
                fontSize: '11px'
              }
            }
          },
          yaxis: {
            title: {
              text: 'Number of Posts',
              style: {
                fontSize: '12px'
              }
            },
            labels: {
              style: {
                fontSize: '11px'
              }
            }
          },
          tooltip: {
            y: {
              formatter: function(val: number) {
                return val + ' posts';
              }
            }
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 300
              }
            }
          }]
        };

        const series = [{
          name: 'Posts Count',
          data
        }];

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
            Failed to load posts data from API. Please try again later.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-500" />
          Posts Trend
        </CardTitle>
        <CardDescription>
          Posts count per user from JSONPlaceholder API
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <div className="w-full">
            {chartData && (
              <Chart
                options={chartData.options}
                series={chartData.series}
                type="line"
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