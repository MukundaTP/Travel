import { Banana, ShoppingBag } from "lucide-react";

export const otherServices = [
  {
    id: 1,
    title: "Plantain Wholesale",
    subtitle: "Premium Quality Produce",
    description:
      "Specialized in wholesale supply of fresh, high-quality plantains for businesses and bulk orders",
    features: [
      "Direct Farm Sourcing",
      "Bulk Order Discounts",
      "Regular Supply Contracts",
      "Quality Assurance",
      "Competitive Pricing",
    ],
    icon: Banana,
    badge: "Wholesale",
    address: {
      line1: "Shop Nos. 6, 7, 13 & 14,",
      line2: "Kothwal Ramaiah Street,",
      line3: "Devaraja Mohalla,",
      line4: "Mysuru-570001",
    },
  },
  {
    id: 2,
    title: "Retail Store",
    subtitle: "One-Stop Shopping",
    description:
      "Comprehensive retail store offering a wide range of lifestyle and daily need products",
    features: [
      "Fashion & Accessories",
      "Premium Jewelry",
      "School Supplies",
      "Gift Items",
      "Stationery Collection",
    ],
    icon: ShoppingBag,
    badge: "Retail",
    address: {
      line1: "6/B, 3rd Main, 7th Cross,",
      line2: "Vinayakanagara (Paduvarhalli),",
      line3: "Near Basaveshwara Choultry,",
      line4: "Mysore-570012",
    },
  },
];
