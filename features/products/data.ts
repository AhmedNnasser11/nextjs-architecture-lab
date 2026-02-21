// This example is intentionally simple.
// The goal is to explain the concept clearly,
// not to build a complex production system.

export type Product = {
  id: number;
  name: string;
  category: "books" | "clothes" | "tech";
};

const ALL_PRODUCTS: Product[] = [
  { id: 1, name: "Clean Architecture Book", category: "books" },
  { id: 2, name: "TypeScript Handbook", category: "books" },
  { id: 3, name: "Next.js T-Shirt", category: "clothes" },
  { id: 4, name: "Fullstack Hoodie", category: "clothes" },
  { id: 5, name: "Mechanical Keyboard", category: "tech" },
  { id: 6, name: "Noise-Cancelling Headphones", category: "tech" },
];

export async function fetchAllProducts(): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return ALL_PRODUCTS;
}

