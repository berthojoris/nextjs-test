import { ModeToggle } from "./mode-toggle";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="container flex items-center justify-between h-14 max-w-screen-2xl">
        <p className="font-bold">NextForge</p>
        <ModeToggle />
      </div>
    </header>
  );
}