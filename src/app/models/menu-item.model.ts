export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'pizza' | 'sides' | 'pasta' | 'beverages';
  isVeg: boolean;
}
