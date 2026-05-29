import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const categories = [
  { icon: "Shirt", label: "Одежда", count: "2.4k", color: "from-violet-500 to-purple-600" },
  { icon: "Smartphone", label: "Электроника", count: "1.8k", color: "from-blue-500 to-cyan-500" },
  { icon: "Home", label: "Дом и сад", count: "3.1k", color: "from-green-500 to-teal-500" },
  { icon: "Briefcase", label: "Услуги", count: "950", color: "from-orange-500 to-amber-500" },
  { icon: "Book", label: "Образование", count: "640", color: "from-pink-500 to-rose-500" },
  { icon: "Car", label: "Авто", count: "420", color: "from-indigo-500 to-blue-600" },
  { icon: "Gamepad2", label: "Игры", count: "310", color: "from-red-500 to-pink-500" },
  { icon: "Dumbbell", label: "Спорт", count: "780", color: "from-teal-500 to-green-600" },
];

const featuredProducts = [
  {
    id: 1,
    name: "Беспроводные наушники Pro",
    price: 4990,
    oldPrice: 7990,
    rating: 4.8,
    reviews: 234,
    badge: "Хит",
    badgeColor: "from-orange-500 to-red-500",
    category: "Электроника",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Дизайнерская куртка осень",
    price: 6500,
    oldPrice: null,
    rating: 4.6,
    reviews: 89,
    badge: "Новинка",
    badgeColor: "from-violet-500 to-purple-600",
    category: "Одежда",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Фитнес-браслет Sport X",
    price: 2990,
    oldPrice: 4500,
    rating: 4.9,
    reviews: 512,
    badge: "-33%",
    badgeColor: "from-green-500 to-teal-500",
    category: "Электроника",
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Уроки веб-разработки",
    price: 1990,
    oldPrice: 3500,
    rating: 4.7,
    reviews: 178,
    badge: "Топ курс",
    badgeColor: "from-pink-500 to-rose-500",
    category: "Образование",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
  },
];

const stats = [
  { value: "50K+", label: "Товаров и услуг" },
  { value: "12K+", label: "Продавцов" },
  { value: "98%", label: "Довольных покупателей" },
  { value: "24/7", label: "Поддержка" },
];

export default function Index() {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-5 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -10%, hsla(258,90%,60%,0.18) 0%, transparent 70%)",
          }}
        />
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 px-4 py-1.5 text-sm font-medium gradient-primary border-0 text-white shadow-lg">
              🚀 Новый маркетплейс в России
            </Badge>
            <h1
              className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Всё что нужно —{" "}
              <span className="gradient-text">в одном месте</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Товары, услуги и цифровые продукты от проверенных продавцов. Безопасная оплата и быстрая доставка.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/catalog">
                <Button size="lg" className="gradient-primary border-0 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 px-8 rounded-2xl text-base font-semibold">
                  <Icon name="Search" size={18} className="mr-2" />
                  Перейти в каталог
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="rounded-2xl px-8 text-base font-semibold border-2 hover:bg-muted/50 transition-all duration-300">
                <Icon name="Store" size={18} className="mr-2" />
                Стать продавцом
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 border-y border-border/50 bg-white/60">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-extrabold gradient-text">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Категории</h2>
            <p className="text-muted-foreground mt-1">Найди то, что ищешь</p>
          </div>
          <Link to="/catalog">
            <Button variant="ghost" className="text-primary font-semibold rounded-xl">
              Все категории <Icon name="ChevronRight" size={16} className="ml-1" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((cat) => (
            <Link key={cat.label} to="/catalog">
              <div className="group flex flex-col items-center gap-2.5 p-4 rounded-2xl bg-white border border-border/60 card-hover cursor-pointer">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={cat.icon} size={22} className="text-white" />
                </div>
                <span className="text-xs font-semibold text-center leading-tight">{cat.label}</span>
                <span className="text-[10px] text-muted-foreground">{cat.count} товаров</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-14 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Популярные предложения</h2>
              <p className="text-muted-foreground mt-1">Выбор тысяч покупателей</p>
            </div>
            <Link to="/catalog">
              <Button variant="ghost" className="text-primary font-semibold rounded-xl">
                Все товары <Icon name="ChevronRight" size={16} className="ml-1" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="card-hover overflow-hidden border border-border/60 bg-white rounded-2xl group">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge className={`absolute top-3 left-3 bg-gradient-to-r ${product.badgeColor} text-white border-0 text-xs font-bold shadow`}>
                    {product.badge}
                  </Badge>
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md hover:scale-110 transition-all duration-200"
                  >
                    <Icon
                      name="Heart"
                      size={16}
                      className={favorites.includes(product.id) ? "text-red-500 fill-red-500" : "text-gray-400"}
                    />
                  </button>
                </div>
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                  <h3 className="font-semibold text-sm leading-tight mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-3">
                    <Icon name="Star" size={12} className="text-amber-400 fill-amber-400" />
                    <span className="text-xs font-semibold">{product.rating}</span>
                    <span className="text-xs text-muted-foreground">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-extrabold gradient-text">{product.price.toLocaleString()} ₽</span>
                      {product.oldPrice && (
                        <span className="text-xs text-muted-foreground line-through ml-2">
                          {product.oldPrice.toLocaleString()} ₽
                        </span>
                      )}
                    </div>
                    <Button size="sm" className="gradient-primary border-0 text-white rounded-xl text-xs px-3 h-8 shadow hover:shadow-lg transition-all duration-200">
                      В корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl gradient-primary p-8 md:p-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />
          <div className="relative z-10 max-w-xl">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 text-sm">
              Безопасная оплата
            </Badge>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Платите удобным способом
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Карты, СБП, электронные кошельки — выбирай любой способ оплаты. Все транзакции защищены.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Карта", "СБП", "ЮMoney", "Криптовалюта", "Рассрочка"].map((method) => (
                <div key={method} className="glass rounded-xl px-4 py-2 text-sm font-semibold text-white border-white/40">
                  {method}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 gradient-primary rounded-xl flex items-center justify-center">
                  <Icon name="ShoppingBag" size={16} className="text-white" />
                </div>
                <span className="font-bold text-lg">Маркет Плэйс</span>
              </div>
              <p className="text-white/60 text-sm">Лучший маркетплейс для покупок и продаж</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Покупателям</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><Link to="/catalog" className="hover:text-white transition-colors">Каталог</Link></li>
                <li><Link to="/cart" className="hover:text-white transition-colors">Корзина</Link></li>
                <li><Link to="/favorites" className="hover:text-white transition-colors">Избранное</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Продавцам</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Стать продавцом</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Кабинет продавца</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Поддержка</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Помощь</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center text-sm text-white/40">
            © 2024 Маркет Плэйс. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}