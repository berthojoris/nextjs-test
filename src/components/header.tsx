import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { 
  Zap, 
  Github, 
  ExternalLink,
  Sparkles
} from "lucide-react";

/**
 * Enhanced header component with modern branding and navigation
 * Features: Logo with icon, navigation links, GitHub link, and theme toggle
 */
export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="container flex items-center justify-between h-16 max-w-screen-2xl px-6">
        {/* Logo and Branding */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                NextForge
              </h1>
              <p className="text-xs text-muted-foreground leading-none">
                Modern Template
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="hidden sm:flex items-center gap-1 text-xs">
            <Sparkles className="w-3 h-3" />
            v15
          </Badge>
        </div>

        {/* Navigation and Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-sm">
              Documentation
              <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
            <Separator orientation="vertical" className="h-4" />
            <Button variant="ghost" size="sm" className="text-sm">
              <Github className="w-4 h-4 mr-1" />
              GitHub
            </Button>
          </div>
          <Separator orientation="vertical" className="h-4 hidden md:block" />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}