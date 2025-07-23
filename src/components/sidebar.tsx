'use client';

import { Home, Code, Server, File, RefreshCw, Wind, Box, LayoutTemplate, Zap } from 'lucide-react';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

/**
 * Enhanced sidebar component for Next.js rendering patterns navigation
 * Features improved visual hierarchy, grouping, and modern styling
 */
export function Sidebar() {
  const pathname = usePathname();
  
  const navigationItems = [
    {
      category: "Overview",
      items: [
        {
          href: "/",
          icon: Home,
          label: "Home",
          shortLabel: "Home",
          description: "Welcome page",
          badge: undefined
        },
        {
          href: "/dashboard",
          icon: LayoutTemplate,
          label: "Dashboard",
          shortLabel: "Dashboard",
          description: "Analytics & metrics",
          badge: "New"
        }
      ]
    },
    {
      category: "Rendering Patterns",
      items: [
        {
          href: "/ssg",
          icon: File,
          label: "Static Site Generation",
          shortLabel: "SSG",
          description: "Build-time rendering",
          badge: "Fast"
        },
        {
          href: "/ssr",
          icon: Server,
          label: "Server-Side Rendering",
          shortLabel: "SSR",
          description: "Request-time rendering",
          badge: "Dynamic"
        },
        {
          href: "/csr",
          icon: Code,
          label: "Client-Side Rendering",
          shortLabel: "CSR",
          description: "Browser rendering",
          badge: "Interactive"
        },
        {
          href: "/isr",
          icon: RefreshCw,
          label: "Incremental Static Regeneration",
          shortLabel: "ISR",
          description: "On-demand revalidation",
          badge: "Hybrid"
        }
      ]
    },
    {
      category: "Advanced Features",
      items: [
        {
          href: "/streaming",
          icon: Wind,
          label: "Streaming",
          shortLabel: "Streaming",
          description: "Progressive rendering",
          badge: "New"
        },
        {
          href: "/rsc",
          icon: Box,
          label: "React Server Components",
          shortLabel: "RSC",
          description: "Server-first components",
          badge: "Modern"
        },
        {
          href: "/ppr",
          icon: LayoutTemplate,
          label: "Partial Prerendering",
          shortLabel: "PPR",
          description: "Static + dynamic hybrid",
          badge: "Beta"
        }
      ]
    }
  ];

  return (
    <aside className="fixed top-16 left-0 z-40 w-72 h-[calc(100vh-4rem)] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-r border-border/40">
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-3 space-y-6">
            {navigationItems.map((section, sectionIndex) => (
              <div key={section.category} className="space-y-3">
                {sectionIndex > 0 && <Separator className="my-4" />}
                <div className="px-3">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {section.category}
                  </h3>
                </div>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground",
                          "hover:translate-x-1 hover:shadow-sm",
                          isActive && "bg-accent text-accent-foreground shadow-sm border border-border/50"
                        )}
                      >
                        <div className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-md transition-colors",
                          isActive 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted group-hover:bg-primary/10"
                        )}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="truncate">
                              {item.shortLabel || item.label}
                            </span>
                            {item.badge && (
                              <Badge 
                                variant={isActive ? "default" : "secondary"} 
                                className="text-xs px-1.5 py-0.5 h-5"
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground truncate mt-0.5">
                            {item.description}
                          </p>
                        </div>
                        {isActive && (
                          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>
        
        {/* Footer */}
        <div className="border-t border-border/40 p-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Zap className="h-3 w-3" />
            <span>Next.js v15 Patterns</span>
          </div>
        </div>
      </div>
    </aside>
  );
}