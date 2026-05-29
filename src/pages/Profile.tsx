import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";

const orders = [
  { id: "#78231", date: "28 мая 2024", status: "delivered", statusLabel: "Доставлен", total: 9970, items: 2 },
  { id: "#78190", date: "21 мая 2024", status: "processing", statusLabel: "В обработке", total: 6500, items: 1 },
  { id: "#78112", date: "10 мая 2024", status: "delivered", statusLabel: "Доставлен", total: 3490, items: 1 },
];

const statusColors: Record<string, string> = {
  delivered: "from-green-500 to-teal-500",
  processing: "from-orange-500 to-amber-500",
  cancelled: "from-red-500 to-rose-500",
};

export default function Profile() {
  const [name, setName] = useState("Александр Петров");
  const [email, setEmail] = useState("alex@example.com");
  const [phone, setPhone] = useState("+7 (999) 123-45-67");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center gap-5 mb-8">
          <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center shadow-xl shrink-0">
            <span className="text-2xl font-extrabold text-white">АП</span>
          </div>
          <div>
            <h1 className="text-2xl font-extrabold">{name}</h1>
            <p className="text-muted-foreground text-sm">{email}</p>
            <Badge className="mt-1 gradient-secondary border-0 text-white text-xs">Покупатель</Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Заказов", value: "12", icon: "Package" },
            { label: "В избранном", value: "5", icon: "Heart" },
            { label: "Отзывов", value: "8", icon: "Star" },
            { label: "Бонусы", value: "340 ₽", icon: "Gift" },
          ].map((stat) => (
            <Card key={stat.label} className="border border-border/60 bg-white rounded-2xl">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow shrink-0">
                  <Icon name={stat.icon} size={18} className="text-white" />
                </div>
                <div>
                  <div className="font-extrabold text-lg leading-tight gradient-text">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="orders">
          <TabsList className="bg-muted/50 rounded-xl p-1 mb-6">
            <TabsTrigger value="orders" className="rounded-lg data-[state=active]:gradient-primary data-[state=active]:text-white data-[state=active]:shadow">
              Мои заказы
            </TabsTrigger>
            <TabsTrigger value="settings" className="rounded-lg data-[state=active]:gradient-primary data-[state=active]:text-white data-[state=active]:shadow">
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="border border-border/60 bg-white rounded-2xl">
                <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                      <Icon name="Package" size={18} className="text-muted-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm">{order.id}</span>
                        <Badge className={`bg-gradient-to-r ${statusColors[order.status]} text-white border-0 text-xs`}>
                          {order.statusLabel}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{order.date} · {order.items} товара</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-extrabold gradient-text">{order.total.toLocaleString()} ₽</span>
                    <Button variant="outline" size="sm" className="rounded-xl text-xs border-border/60">
                      Подробнее
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="settings">
            <Card className="border border-border/60 bg-white rounded-2xl">
              <CardContent className="p-6 space-y-5">
                <h3 className="font-bold text-base">Личные данные</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block text-muted-foreground">Имя</label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} className="rounded-xl border-border/60" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block text-muted-foreground">Телефон</label>
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="rounded-xl border-border/60" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium mb-1.5 block text-muted-foreground">Email</label>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-xl border-border/60" />
                  </div>
                </div>
                <Button
                  onClick={handleSave}
                  className="gradient-primary border-0 text-white rounded-xl shadow-lg transition-all duration-300"
                >
                  {saved ? (
                    <><Icon name="Check" size={16} className="mr-2" /> Сохранено</>
                  ) : (
                    <><Icon name="Save" size={16} className="mr-2" /> Сохранить изменения</>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
