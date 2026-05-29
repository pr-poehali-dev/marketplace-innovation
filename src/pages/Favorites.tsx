import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const initialFavorites = [
  { id: 2, name: "Дизайнерская куртка осень", price: 6500, oldPrice: null, rating: 4.6, reviews: 89, badge: "Новинка", category: "Одежда", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=300&fit=crop" },
  { id: 5, name: "Умная колонка Mini", price: 3490, oldPrice: null, rating: 4.5, reviews: 67, badge: null, category: "Электроника", image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=400&h=300&fit=crop" },
  { id: 6, name: "Кроссовки беговые Air", price: 5990, oldPrice: 8900, rating: 4.8, reviews: 341, badge: "-33%", category: "Спорт", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop" },
  { id: 8, name: "Услуги по дизайну логотипа", price: 2500, oldPrice: null, rating: 5.0, reviews: 23, badge: "Топ", category: "Услуги", image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop" },
  { id: 1, name: "Беспроводные наушники Pro", price: 4990, oldPrice: 7990, rating: 4.8, reviews: 234, badge: "Хит", category: "Электроника", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop" },
];

export default function Favorites() {
  const [favorites, setFavorites] = useState(initialFavorites);

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <Icon name="Heart" size={64} className="text-muted-foreground mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-3">Избранное пусто</h2>
          <p className="text-muted-foreground mb-8">Добавляй понравившиеся товары в избранное</p>
          <Link to="/catalog">
            <Button className="gradient-primary border-0 text-white rounded-2xl px-8 shadow-lg">
              Перейти в каталог
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold mb-1">Избранное</h1>
            <p className="text-muted-foreground">{favorites.length} товаров</p>
          </div>
          <Button variant="ghost" className="text-muted-foreground rounded-xl text-sm" onClick={() => setFavorites([])}>
            <Icon name="Trash2" size={16} className="mr-1" /> Очистить
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {favorites.map((product) => (
            <Card key={product.id} className="card-hover overflow-hidden border border-border/60 bg-white rounded-2xl group">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.badge && (
                  <Badge className="absolute top-3 left-3 gradient-primary text-white border-0 text-xs font-bold shadow">
                    {product.badge}
                  </Badge>
                )}
                <button
                  onClick={() => removeFavorite(product.id)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-md hover:scale-110 transition-all duration-200"
                >
                  <Icon name="Heart" size={16} className="text-red-500 fill-red-500" />
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
                        {(product.oldPrice as number).toLocaleString()} ₽
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
      </div>
    </div>
  );
}
