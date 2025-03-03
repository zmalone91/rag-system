import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/experience", label: "Experience" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <span className="text-2xl font-bold cursor-pointer">Zack Malone</span>
          </Link>
          <div className="hidden md:flex space-x-8">
            {navItems.map(item => (
              <Link key={item.href} href={item.href}>
                <span className={cn(
                  "text-sm font-medium transition-colors hover:text-primary cursor-pointer",
                  location === item.href ? "text-primary" : "text-muted-foreground"
                )}>
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}