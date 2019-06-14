export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  productCategory: ProductCategory[];
  imageUrl: string;
  year: number;
  added: string;
}

class ProductCategory {
  categoryId: number;
}
