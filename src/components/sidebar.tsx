'use client';

import { Home, Settings, Code, Server, File, RefreshCw, Wind, Box, LayoutTemplate } from 'lucide-react';
import { Separator } from './ui/separator';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed top-14 left-0 z-40 w-64 h-[calc(100vh-3.5rem)] bg-background border-r">
      <div className="p-4">
        <nav className="flex flex-col space-y-2">
          <Link href="/" className={cn(
              "flex items-center p-2 text-base font-normal text-foreground rounded-lg hover:bg-muted",
              pathname === "/" && "bg-muted"
            )}>
            <Home className="w-6 h-6" />
            <span className="ml-3">Dashboard</span>
          </Link>
          <Separator />
          <Link href="/ssg" className={cn(
              "flex items-center p-2 text-base font-normal text-foreground rounded-lg hover:bg-muted",
              pathname === "/ssg" && "bg-muted"
            )}>
            <File className="w-6 h-6" />
            <span className="ml-3">SSG</span>
          </Link>
          <Link href="/ssr" className={cn(
              "flex items-center p-2 text-base font-normal text-foreground rounded-lg hover:bg-muted",
              pathname === "/ssr" && "bg-muted"
            )}>
            <Server className="w-6 h-6" />
            <span className="ml-3">SSR</span>
          </Link>
          <Link href="/csr" className={cn(
              "flex items-center p-2 text-base font-normal text-foreground rounded-lg hover:bg-muted",
              pathname === "/csr" && "bg-muted"
            )}>
            <Code className="w-6 h-6" />
            <span className="ml-3">CSR</span>
          </Link>
          <Link href="/isr" className={cn(
              "flex items-center p-2 text-base font-normal text-foreground rounded-lg hover:bg-muted",
              pathname === "/isr" && "bg-muted"
            )}>
            <RefreshCw className="w-6 h-6" />
            <span className="ml-3">ISR</span>
          </Link>
          <Link href="/streaming" className={cn(
              "flex items-center p-2 text-base font-normal text-foreground rounded-lg hover:bg-muted",
              pathname === "/streaming" && "bg-muted"
            )}>
            <Wind className="w-6 h-6" />
            <span className="ml-3">Streaming</span>
          </Link>
          <Link href="/rsc" className={cn(
              "flex items-center p-2 text-base font-normal text-foreground rounded-lg hover:bg-muted",
              pathname === "/rsc" && "bg-muted"
            )}>
            <Box className="w-6 h-6" />
            <span className="ml-3">Server Components (RSC)</span>
          </Link>
          <Link href="/ppr" className={cn(
              "flex items-center p-2 text-base font-normal text-foreground rounded-lg hover:bg-muted",
              pathname === "/ppr" && "bg-muted"
            )}>
            <LayoutTemplate className="w-6 h-6" />
            <span className="ml-3">Partial Prerendering (PPR)</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
}