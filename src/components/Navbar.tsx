import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount] = useState(3);
  const [favCount] = useState(5);

  const navLinks = [
    { href: "/", label: "Главная" },
    { href: "/catalog", label: "Каталог" },
  ];

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/40 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center shadow-lg">
            <Icon name="ShoppingBag" size={18} className="text-white" />
          </div>
          <span className="font-bold text-lg hidden sm:block" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <span className="gradient-text">Маркет</span>
            <span className="text-foreground"> Плэйс</span>
          </span>
        </Link>

        <div className={`flex-1 max-w-md transition-all duration-300 ${searchOpen ? "flex" : "hidden md:flex"}`}>
          <div className="relative w-full">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Найти товары, услуги..."
              className="pl-9 bg-white/70 border-border/60 rounded-xl focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                location.pathname === link.href
                  ? "gradient-primary text-white shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-xl"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Icon name="Search" size={20} />
          </Button>

          <Link to="/favorites">
            <Button variant="ghost" size="icon" className="relative rounded-xl">
              <Icon name="Heart" size={20} />
              {favCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-[10px] gradient-primary border-0">
                  {favCount}
                </Badge>
              )}
            </Button>
          </Link>

          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative rounded-xl">
              <Icon name="ShoppingCart" size={20} />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-[10px] gradient-primary border-0">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </Link>

          <Link to="/profile">
            <Button variant="ghost" size="icon" className="rounded-xl">
              <Icon name="User" size={20} />
            </Button>
          </Link>
        </div>
      </div>

      {searchOpen && (
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Найти товары, услуги..."
              className="pl-9 bg-white/70 border-border/60 rounded-xl"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
