import { Home, Settings, Code } from 'lucide-react';
import { Separator } from './ui/separator';

export function Sidebar() {
  return (
    <aside className="fixed top-14 left-0 z-40 w-64 h-[calc(100vh-3.5rem)] bg-background border-r">
      <div className="p-4">
        <nav className="flex flex-col space-y-2">
          <a href="#" className="flex items-center p-2 text-base font-normal text-foreground rounded-lg hover:bg-muted">
            <Home className="w-6 h-6" />
            <span className="ml-3">Dashboard</span>
          </a>
          <a href="#" className="flex items-center p-2 text-base font-normal text-foreground rounded-lg hover:bg-muted">
            <Code className="w-6 h-6" />
            <span className="ml-3">Deployments</span>
          </a>
          <Separator />
          <a href="#" className="flex items-center p-2 text-base font-normal text-foreground rounded-lg hover:bg-muted">
            <Settings className="w-6 h-6" />
            <span className="ml-3">Settings</span>
          </a>
        </nav>
      </div>
    </aside>
  );
}