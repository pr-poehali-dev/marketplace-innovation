import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import Icon from "@/components/ui/icon";

const allProducts = [
  { id: 1, name: "Беспроводные наушники Pro", price: 4990, oldPrice: 7990, rating: 4.8, reviews: 234, badge: "Хит", category: "Электроника", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop" },
  { id: 2, name: "Дизайнерская куртка осень", price: 6500, oldPrice: null, rating: 4.6, reviews: 89, badge: "Новинка", category: "Одежда", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=300&fit=crop" },
  { id: 3, name: "Фитнес-браслет Sport X", price: 2990, oldPrice: 4500, rating: 4.9, reviews: 512, badge: "-33%", category: "Электроника", image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=300&fit=crop" },
  { id: 4, name: "Уроки веб-разработки", price: 1990, oldPrice: 3500, rating: 4.7, reviews: 178, badge: "Топ курс", category: "Образование", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop" },
  { id: 5, name: "Умная колонка Mini", price: 3490, oldPrice: null, rating: 4.5, reviews: 67, badge: null, category: "Электроника", image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=400&h=300&fit=crop" },
  { id: 6, name: "Кроссовки беговые Air", price: 5990, oldPrice: 8900, rating: 4.8, reviews: 341, badge: "-33%", category: "Спорт", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop" },
  { id: 7, name: "Ноутбук ProBook 15", price: 64990, oldPrice: 74990, rating: 4.7, reviews: 89, badge: "Хит", category: "Электроника", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop" },
  { id: 8, name: "Услуги по дизайну логотипа", price: 2500, oldPrice: null, rating: 5.0, reviews: 23, badge: "Топ", category: "Услуги", image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop" },
];

const categories = ["Все", "Электроника", "Одежда", "Спорт", "Образование", "Услуги", "Дом и сад"];

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("popular");

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);
  };

  const filtered = allProducts
    .filter((p) => activeCategory === "Все" || p.category === activeCategory)
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold mb-2">Каталог</h1>
          <p className="text-muted-foreground">Найдено {filtered.length} товаров и услуг</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="w-full lg:w-64 shrink-0">
            <div className="bg-white rounded-2xl border border-border/60 p-5 space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Категории</h3>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                        activeCategory === cat
                          ? "gradient-primary text-white shadow-md"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Цена</h3>
                <Slider
                  min={0}
                  max={100000}
                  step={500}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-3"
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{priceRange[0].toLocaleString()} ₽</span>
                  <span>{priceRange[1].toLocaleString()} ₽</span>
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск по каталогу..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 rounded-xl bg-white border-border/60"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-xl border border-border/60 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="popular">По популярности</option>
                <option value="price_asc">Цена: по возрастанию</option>
                <option value="price_desc">Цена: по убыванию</option>
                <option value="rating">По рейтингу</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((product) => (
                <Card key={product.id} className="card-hover overflow-hidden border border-border/60 bg-white rounded-2xl group">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.badge && (
                      <Badge className="absolute top-3 left-3 gradient-primary text-white border-0 text-xs font-bold shadow">
                        {product.badge}
                      </Badge>
                    )}
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
                        <span className="text-base font-extrabold gradient-text">{product.price.toLocaleString()} ₽</span>
                        {product.oldPrice && (
                          <span className="text-xs text-muted-foreground line-through ml-1">
                            {product.oldPrice.toLocaleString()} ₽
                          </span>
                        )}
                      </div>
                      <Button size="sm" className="gradient-primary border-0 text-white rounded-xl text-xs px-3 h-8 shadow">
                        В корзину
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20">
                <Icon name="SearchX" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Ничего не найдено</h3>
                <p className="text-muted-foreground text-sm">Попробуй изменить фильтры или поисковый запрос</p>
                <Button className="mt-4 gradient-primary border-0 text-white rounded-xl" onClick={() => { setSearch(""); setActiveCategory("Все"); }}>
                  Сбросить фильтры
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
