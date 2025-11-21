import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { useState } from "react";
import { Search } from "lucide-react";

interface PhoneSelectorProps {
  onPhoneSelect: (phone: string) => void;
  selectedPhone: string;
}

export function PhoneSelector({ onPhoneSelect, selectedPhone }: PhoneSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const phoneCategories = [
    {
      brand: "Apple",
      models: [
        "iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15 Plus", "iPhone 15",
        "iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14 Plus", "iPhone 14",
        "iPhone 13 Pro Max", "iPhone 13 Pro", "iPhone 13 mini", "iPhone 13",
        "iPhone 12 Pro Max", "iPhone 12 Pro", "iPhone 12 mini", "iPhone 12",
        "iPhone 11 Pro Max", "iPhone 11 Pro", "iPhone 11",
        "iPhone XS Max", "iPhone XS", "iPhone XR", "iPhone X",
        "iPhone 8 Plus", "iPhone 8", "iPhone 7 Plus", "iPhone 7",
        "iPhone SE (2022)", "iPhone SE (2020)", "iPhone 6s Plus", "iPhone 6s"
      ]
    },
    {
      brand: "Samsung",
      models: [
        "Galaxy S24 Ultra", "Galaxy S24+", "Galaxy S24", "Galaxy S24 FE",
        "Galaxy S23 Ultra", "Galaxy S23+", "Galaxy S23", "Galaxy S23 FE",
        "Galaxy S22 Ultra", "Galaxy S22+", "Galaxy S22", "Galaxy S22 FE",
        "Galaxy S21 Ultra", "Galaxy S21+", "Galaxy S21", "Galaxy S21 FE",
        "Galaxy S20 Ultra", "Galaxy S20+", "Galaxy S20", "Galaxy S20 FE",
        "Galaxy S10+", "Galaxy S10", "Galaxy S10e", "Galaxy S9+", "Galaxy S9",
        "Galaxy Note 20 Ultra", "Galaxy Note 20", "Galaxy Note 10+", "Galaxy Note 10",
        "Galaxy Z Fold 5", "Galaxy Z Fold 4", "Galaxy Z Fold 3", "Galaxy Z Flip 5", "Galaxy Z Flip 4",
        "Galaxy A73", "Galaxy A54", "Galaxy A53", "Galaxy A52", "Galaxy A52s",
        "Galaxy A34", "Galaxy A33", "Galaxy A32", "Galaxy A24", "Galaxy A23",
        "Galaxy A14", "Galaxy A13", "Galaxy A12", "Galaxy M54", "Galaxy M34", "Galaxy M14"
      ]
    },
    {
      brand: "Xiaomi",
      models: [
        "Xiaomi 14 Ultra", "Xiaomi 14 Pro", "Xiaomi 14", "Xiaomi 13T Pro", "Xiaomi 13T",
        "Xiaomi 13 Ultra", "Xiaomi 13 Pro", "Xiaomi 13", "Xiaomi 13 Lite",
        "Xiaomi 12T Pro", "Xiaomi 12T", "Xiaomi 12 Pro", "Xiaomi 12", "Xiaomi 12 Lite",
        "Xiaomi 11T Pro", "Xiaomi 11T", "Xiaomi 11", "Xiaomi 11 Lite 5G NE",
        "Xiaomi Mi 10T Pro", "Xiaomi Mi 10T", "Xiaomi Mi 10", "Xiaomi Mi 9T Pro"
      ]
    },
    {
      brand: "Redmi",
      models: [
        "Redmi Note 13 Pro+", "Redmi Note 13 Pro", "Redmi Note 13", "Redmi Note 13 5G",
        "Redmi Note 12 Pro+", "Redmi Note 12 Pro", "Redmi Note 12", "Redmi Note 12 5G",
        "Redmi Note 11 Pro+", "Redmi Note 11 Pro", "Redmi Note 11", "Redmi Note 11S",
        "Redmi Note 10 Pro", "Redmi Note 10", "Redmi Note 10S", "Redmi Note 10 5G",
        "Redmi Note 9 Pro", "Redmi Note 9", "Redmi Note 8 Pro", "Redmi Note 8",
        "Redmi 13C", "Redmi 12", "Redmi 12C", "Redmi 11", "Redmi 10", "Redmi 9"
      ]
    },
    {
      brand: "POCO",
      models: [
        "POCO F6 Pro", "POCO F5 Pro", "POCO F5", "POCO F4 GT", "POCO F4", "POCO F3",
        "POCO X6 Pro", "POCO X6", "POCO X5 Pro", "POCO X5", "POCO X4 Pro", "POCO X4 GT",
        "POCO M6 Pro", "POCO M5", "POCO M4 Pro", "POCO M3", "POCO C65", "POCO C55"
      ]
    },
    {
      brand: "OnePlus",
      models: [
        "OnePlus 12", "OnePlus 12R", "OnePlus 11", "OnePlus 11R",
        "OnePlus 10 Pro", "OnePlus 10T", "OnePlus 10R",
        "OnePlus 9 Pro", "OnePlus 9RT", "OnePlus 9R", "OnePlus 9",
        "OnePlus 8T", "OnePlus 8 Pro", "OnePlus 8",
        "OnePlus 7T Pro", "OnePlus 7T", "OnePlus 7 Pro", "OnePlus 7",
        "OnePlus Nord 3", "OnePlus Nord 2T", "OnePlus Nord 2", "OnePlus Nord CE 3",
        "OnePlus Nord CE 2", "OnePlus Nord CE"
      ]
    },
    {
      brand: "Oppo",
      models: [
        "Oppo Find X7 Ultra", "Oppo Find X7", "Oppo Find X6 Pro", "Oppo Find X6",
        "Oppo Find X5 Pro", "Oppo Find X5", "Oppo Find X3 Pro", "Oppo Find X3",
        "Oppo Reno 11 Pro", "Oppo Reno 11", "Oppo Reno 10 Pro+", "Oppo Reno 10 Pro", "Oppo Reno 10",
        "Oppo Reno 9 Pro", "Oppo Reno 9", "Oppo Reno 8 Pro", "Oppo Reno 8", "Oppo Reno 8T",
        "Oppo Reno 7 Pro", "Oppo Reno 7", "Oppo Reno 6 Pro", "Oppo Reno 6",
        "Oppo A98", "Oppo A78", "Oppo A58", "Oppo A57", "Oppo A17"
      ]
    },
    {
      brand: "Vivo",
      models: [
        "Vivo X100 Pro", "Vivo X100", "Vivo X90 Pro+", "Vivo X90 Pro", "Vivo X90",
        "Vivo X80 Pro", "Vivo X80", "Vivo X70 Pro+", "Vivo X70 Pro",
        "Vivo V29 Pro", "Vivo V29", "Vivo V27 Pro", "Vivo V27", "Vivo V25 Pro",
        "Vivo Y100", "Vivo Y78", "Vivo Y56", "Vivo Y36", "Vivo Y27", "Vivo Y22",
        "Vivo Y17", "Vivo Y16", "Vivo T2 Pro", "Vivo T2", "Vivo T1"
      ]
    },
    {
      brand: "Realme",
      models: [
        "Realme GT 5 Pro", "Realme GT 5", "Realme GT 3", "Realme GT 2 Pro", "Realme GT 2",
        "Realme GT Neo 6", "Realme GT Neo 5", "Realme GT Neo 3", "Realme GT Neo 2",
        "Realme 11 Pro+", "Realme 11 Pro", "Realme 11", "Realme 10 Pro+", "Realme 10 Pro", "Realme 10",
        "Realme 9 Pro+", "Realme 9 Pro", "Realme 9", "Realme 9i", "Realme 8 Pro", "Realme 8",
        "Realme C67", "Realme C65", "Realme C55", "Realme C53", "Realme C35", "Realme C33"
      ]
    },
    {
      brand: "Google",
      models: [
        "Pixel 8 Pro", "Pixel 8", "Pixel 8a",
        "Pixel 7 Pro", "Pixel 7", "Pixel 7a",
        "Pixel 6 Pro", "Pixel 6", "Pixel 6a",
        "Pixel 5a", "Pixel 5", "Pixel 4a", "Pixel 4"
      ]
    },
    {
      brand: "Motorola",
      models: [
        "Motorola Edge 40 Pro", "Motorola Edge 40", "Motorola Edge 30 Ultra", "Motorola Edge 30 Pro",
        "Moto G84", "Moto G73", "Moto G62", "Moto G52", "Moto G42", "Moto G32",
        "Moto G14", "Moto G13", "Moto E13"
      ]
    },
    {
      brand: "Honor",
      models: [
        "Honor Magic 6 Pro", "Honor Magic 5 Pro", "Honor Magic 5",
        "Honor 90 Pro", "Honor 90", "Honor 80 Pro", "Honor 70 Pro", "Honor 70",
        "Honor X9b", "Honor X8b", "Honor X7b", "Honor X6"
      ]
    },
    {
      brand: "Huawei",
      models: [
        "Huawei P60 Pro", "Huawei P50 Pro", "Huawei P40 Pro",
        "Huawei Mate 60 Pro", "Huawei Mate 50 Pro", "Huawei Mate 40 Pro",
        "Huawei Nova 11 Pro", "Huawei Nova 10", "Huawei Nova Y91"
      ]
    },
    {
      brand: "Nothing",
      models: [
        "Nothing Phone (2)", "Nothing Phone (2a)", "Nothing Phone (1)"
      ]
    },
    {
      brand: "Asus",
      models: [
        "Asus ROG Phone 8 Pro", "Asus ROG Phone 7 Ultimate", "Asus ROG Phone 7",
        "Asus ROG Phone 6 Pro", "Asus ROG Phone 5s", "Asus ROG Phone 5",
        "Asus Zenfone 10", "Asus Zenfone 9", "Asus Zenfone 8"
      ]
    },
    {
      brand: "Sony",
      models: [
        "Sony Xperia 1 V", "Sony Xperia 5 V", "Sony Xperia 10 V",
        "Sony Xperia 1 IV", "Sony Xperia 5 IV", "Sony Xperia 10 IV"
      ]
    },
    {
      brand: "Tecno",
      models: [
        "Tecno Phantom X2 Pro", "Tecno Camon 20 Pro", "Tecno Camon 19 Pro",
        "Tecno Spark 10 Pro", "Tecno Pova 5 Pro", "Tecno Pova 4"
      ]
    },
    {
      brand: "Infinix",
      models: [
        "Infinix Zero 30", "Infinix Note 30 Pro", "Infinix Note 30",
        "Infinix Hot 30", "Infinix Smart 8", "Infinix Smart 7"
      ]
    },
    {
      brand: "Autre",
      models: [
        "Autre modèle Android", "Autre modèle iOS"
      ]
    }
  ];

  // Filtrer les téléphones basé sur la recherche
  const filteredCategories = phoneCategories.map(category => ({
    ...category,
    models: category.models.filter(model =>
      model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.brand.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.models.length > 0);

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-orange-400/50" />
        <Input
          type="text"
          placeholder="Rechercher un modèle de téléphone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-12 bg-slate-900/50 border-orange-500/30 text-white placeholder:text-orange-100/30 focus:border-orange-500 focus:ring-orange-500/20"
        />
      </div>

      <Select value={selectedPhone} onValueChange={onPhoneSelect}>
        <SelectTrigger className="w-full h-12 bg-slate-900/50 border-orange-500/30 text-white hover:border-orange-500/50 focus:border-orange-500 focus:ring-orange-500/20">
          <SelectValue placeholder="Ou sélectionne dans la liste..." />
        </SelectTrigger>
        <SelectContent className="bg-slate-900 border-orange-500/30 text-white max-h-[300px] md:max-h-[400px]">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <SelectGroup key={category.brand}>
                <SelectLabel className="text-orange-500">{category.brand}</SelectLabel>
                {category.models.map((model) => (
                  <SelectItem 
                    key={model} 
                    value={model}
                    className="focus:bg-orange-500/20 focus:text-white cursor-pointer"
                  >
                    {model}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))
          ) : (
            <div className="p-4 text-center text-orange-100/50 text-sm">
              Aucun téléphone trouvé. Essaie "Autre modèle Android" ou "Autre modèle iOS"
            </div>
          )}
        </SelectContent>
      </Select>

      {searchTerm && !selectedPhone && filteredCategories.length > 0 && (
        <div className="text-orange-100/50 text-xs">
          {filteredCategories.reduce((acc, cat) => acc + cat.models.length, 0)} modèle(s) trouvé(s)
        </div>
      )}
    </div>
  );
}
