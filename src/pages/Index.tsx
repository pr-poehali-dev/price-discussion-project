import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  { id: 1, name: 'Беспроводные наушники', price: 5990, category: 'Электроника', image: '🎧', description: 'Качественный звук и долгая автономность' },
  { id: 2, name: 'Смарт-часы', price: 12990, category: 'Электроника', image: '⌚', description: 'Фитнес-трекер с GPS' },
  { id: 3, name: 'Рюкзак городской', price: 3490, category: 'Аксессуары', image: '🎒', description: 'Вместительный и стильный' },
  { id: 4, name: 'Термокружка', price: 890, category: 'Посуда', image: '☕', description: 'Сохраняет температуру 6 часов' },
  { id: 5, name: 'Портативная колонка', price: 4990, category: 'Электроника', image: '🔊', description: 'Мощный звук 360°' },
  { id: 6, name: 'Фитнес-браслет', price: 2490, category: 'Электроника', image: '📱', description: 'Отслеживание активности 24/7' },
  { id: 7, name: 'Солнцезащитные очки', price: 1990, category: 'Аксессуары', image: '🕶️', description: 'UV400 защита' },
  { id: 8, name: 'Настольная лампа', price: 2990, category: 'Интерьер', image: '💡', description: 'LED с регулировкой яркости' },
];

const categories = ['Все', 'Электроника', 'Аксессуары', 'Посуда', 'Интерьер'];

export default function Index() {
  const [activeTab, setActiveTab] = useState('catalog');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [priceRange, setPriceRange] = useState([0, 15000]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'Все' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesPrice && matchesSearch;
  });

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-purple-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-3xl">🛍️</div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ShopHub
              </h1>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => setActiveTab('catalog')}
                className={`transition-all duration-200 hover:scale-105 ${
                  activeTab === 'catalog'
                    ? 'text-purple-600 font-semibold'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                Каталог
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`transition-all duration-200 hover:scale-105 ${
                  activeTab === 'orders'
                    ? 'text-purple-600 font-semibold'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                Заказы
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`transition-all duration-200 hover:scale-105 ${
                  activeTab === 'profile'
                    ? 'text-purple-600 font-semibold'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                Профиль
              </button>
              <button
                onClick={() => setActiveTab('contacts')}
                className={`transition-all duration-200 hover:scale-105 ${
                  activeTab === 'contacts'
                    ? 'text-purple-600 font-semibold'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                Контакты
              </button>
            </nav>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative hover:scale-110 transition-transform">
                  <Icon name="ShoppingCart" size={20} />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-gradient-to-r from-purple-600 to-pink-600 animate-scale-in">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg animate-slide-in-right">
                <SheetHeader>
                  <SheetTitle className="text-2xl font-bold">Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <div className="text-6xl mb-4">🛒</div>
                      <p>Корзина пуста</p>
                    </div>
                  ) : (
                    <>
                      {cart.map((item) => (
                        <Card key={item.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="pt-6">
                            <div className="flex items-center gap-4">
                              <div className="text-4xl">{item.image}</div>
                              <div className="flex-1">
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="text-sm text-gray-600">{item.price.toLocaleString()} ₽</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="h-8 w-8"
                                >
                                  <Icon name="Minus" size={14} />
                                </Button>
                                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="h-8 w-8"
                                >
                                  <Icon name="Plus" size={14} />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeFromCart(item.id)}
                                  className="h-8 w-8 ml-2"
                                >
                                  <Icon name="Trash2" size={14} />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      <div className="border-t pt-4 mt-6">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-lg font-semibold">Итого:</span>
                          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            {totalPrice.toLocaleString()} ₽
                          </span>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'catalog' && (
          <div className="animate-fade-in">
            <div className="mb-8 space-y-6">
              <div className="relative">
                <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  type="text"
                  placeholder="Поиск товаров..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category)}
                    className={`transition-all duration-200 hover:scale-105 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                        : ''
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Icon name="SlidersHorizontal" size={20} />
                  Фильтр по цене
                </h3>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={15000}
                  step={100}
                  className="mb-4"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{priceRange[0].toLocaleString()} ₽</span>
                  <span>{priceRange[1].toLocaleString()} ₽</span>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in overflow-hidden"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CardContent className="pt-6">
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300 text-center">
                      {product.image}
                    </div>
                    <Badge className="mb-2 bg-purple-100 text-purple-700 hover:bg-purple-100">
                      {product.category}
                    </Badge>
                    <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {product.price.toLocaleString()} ₽
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => addToCart(product)}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:scale-105 transition-transform"
                    >
                      <Icon name="ShoppingCart" size={18} className="mr-2" />
                      В корзину
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16 text-gray-500">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-xl">Товары не найдены</p>
                <p className="text-sm mt-2">Попробуйте изменить фильтры или поисковый запрос</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="animate-fade-in max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Мои заказы</h2>
            <div className="text-center py-16 text-gray-500">
              <div className="text-6xl mb-4">📦</div>
              <p className="text-xl">Заказов пока нет</p>
              <p className="text-sm mt-2">Оформите первый заказ в каталоге</p>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="animate-fade-in max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Профиль</h2>
            <Card className="p-6">
              <div className="flex items-center gap-6 mb-6">
                <div className="text-6xl">👤</div>
                <div>
                  <h3 className="text-2xl font-bold">Иван Иванов</h3>
                  <p className="text-gray-600">ivan@example.com</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Имя</label>
                  <Input defaultValue="Иван Иванов" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input defaultValue="ivan@example.com" type="email" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Телефон</label>
                  <Input defaultValue="+7 (999) 123-45-67" type="tel" />
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Сохранить изменения
                </Button>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="animate-fade-in max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Контакты</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="MapPin" size={24} className="text-purple-600" />
                  Адрес
                </h3>
                <p className="text-gray-600 mb-4">г. Москва, ул. Примерная, д. 1</p>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="Phone" size={24} className="text-purple-600" />
                  Телефон
                </h3>
                <p className="text-gray-600 mb-4">+7 (495) 123-45-67</p>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="Mail" size={24} className="text-purple-600" />
                  Email
                </h3>
                <p className="text-gray-600">info@shophub.ru</p>
              </Card>
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Напишите нам</h3>
                <div className="space-y-4">
                  <Input placeholder="Ваше имя" />
                  <Input placeholder="Email" type="email" />
                  <Input placeholder="Тема" />
                  <textarea
                    className="w-full min-h-[120px] p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="Сообщение"
                  />
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Отправить
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="font-semibold mb-2">ShopHub — современный интернет-магазин</p>
          <p className="text-purple-100 text-sm">© 2024 Все права защищены</p>
        </div>
      </footer>
    </div>
  );
}
