import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const initialItems = [
  { id: 1, name: "Беспроводные наушники Pro", price: 4990, qty: 1, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&h=120&fit=crop", category: "Электроника" },
  { id: 3, name: "Фитнес-браслет Sport X", price: 2990, qty: 2, image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=120&h=120&fit=crop", category: "Электроника" },
  { id: 4, name: "Уроки веб-разработки", price: 1990, qty: 1, image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=120&h=120&fit=crop", category: "Образование" },
];

const paymentMethods = [
  { id: "card", label: "Банковская карта", icon: "CreditCard" },
  { id: "sbp", label: "СБП", icon: "Zap" },
  { id: "wallet", label: "ЮMoney", icon: "Wallet" },
  { id: "crypto", label: "Криптовалюта", icon: "Bitcoin" },
];

export default function Cart() {
  const [items, setItems] = useState(initialItems);
  const [payment, setPayment] = useState("card");
  const [ordered, setOrdered] = useState(false);

  const updateQty = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const delivery = 299;
  const total = subtotal + delivery;

  if (ordered) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Icon name="CheckCircle" size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-extrabold mb-4">Заказ оформлен!</h2>
          <p className="text-muted-foreground text-lg mb-8">Мы уже обрабатываем ваш заказ. Ожидайте уведомление.</p>
          <Link to="/">
            <Button className="gradient-primary border-0 text-white rounded-2xl px-8 shadow-lg">
              На главную
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <Icon name="ShoppingCart" size={64} className="text-muted-foreground mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-3">Корзина пуста</h2>
          <p className="text-muted-foreground mb-8">Добавь товары из каталога</p>
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
        <h1 className="text-3xl font-extrabold mb-2">Корзина</h1>
        <p className="text-muted-foreground mb-8">{items.length} товара</p>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="border border-border/60 bg-white rounded-2xl">
                <CardContent className="p-4 flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                    <h3 className="font-semibold text-sm leading-tight truncate">{item.name}</h3>
                    <span className="text-base font-extrabold gradient-text">{item.price.toLocaleString()} ₽</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 rounded-xl border border-border flex items-center justify-center hover:bg-muted transition-colors">
                      <Icon name="Minus" size={14} />
                    </button>
                    <span className="w-6 text-center font-semibold text-sm">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 rounded-xl border border-border flex items-center justify-center hover:bg-muted transition-colors">
                      <Icon name="Plus" size={14} />
                    </button>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors ml-2">
                    <Icon name="Trash2" size={18} />
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="w-full lg:w-80 shrink-0 space-y-4">
            <Card className="border border-border/60 bg-white rounded-2xl">
              <CardContent className="p-5">
                <h3 className="font-bold text-base mb-4">Способ оплаты</h3>
                <div className="space-y-2">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPayment(method.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                        payment === method.id
                          ? "border-primary bg-primary/5"
                          : "border-border/60 hover:border-primary/40"
                      }`}
                    >
                      <Icon name={method.icon} size={18} className={payment === method.id ? "text-primary" : "text-muted-foreground"} />
                      <span className={`text-sm font-medium ${payment === method.id ? "text-primary" : "text-foreground"}`}>{method.label}</span>
                      {payment === method.id && (
                        <Icon name="CheckCircle" size={16} className="text-primary ml-auto fill-primary/20" />
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/60 bg-white rounded-2xl">
              <CardContent className="p-5">
                <h3 className="font-bold text-base mb-4">Итого</h3>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Товары ({items.reduce((s, i) => s + i.qty, 0)} шт.)</span>
                    <span>{subtotal.toLocaleString()} ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Доставка</span>
                    <span>{delivery} ₽</span>
                  </div>
                  <div className="border-t border-border/60 pt-2 flex justify-between font-bold text-base">
                    <span>К оплате</span>
                    <span className="gradient-text">{total.toLocaleString()} ₽</span>
                  </div>
                </div>
                <Button
                  className="w-full gradient-primary border-0 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
                  onClick={() => setOrdered(true)}
                >
                  <Icon name="ShieldCheck" size={16} className="mr-2" />
                  Оформить заказ
                </Button>
                <p className="text-center text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1">
                  <Icon name="Lock" size={12} />
                  Безопасная оплата
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
