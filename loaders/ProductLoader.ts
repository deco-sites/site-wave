export interface Props {
  sort: "title" | "price" | "created_at";
  order: "asc" | "desc";
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  created_at: string;
  // Add other fields as needed
}

export default async function loader(
  { sort = "created_at", order = "desc" }: Props,
  _req: Request,
) {
  // Make the API call to fetch the product data
  const response = await fetch("https://api.example.com/products");
  const products = await response.json() as Product[];

  // Sort the products based on the specified sort and order
  const sortedProducts = products.sort((a, b) => {
    const fieldA = a[sort];
    const fieldB = b[sort];

    if (typeof fieldA === "string" && typeof fieldB === "string") {
      return order === "asc"
        ? fieldA.localeCompare(fieldB)
        : fieldB.localeCompare(fieldA);
    } else if (typeof fieldA === "number" && typeof fieldB === "number") {
      return order === "asc" ? fieldA - fieldB : fieldB - fieldA;
    } else {
      return 0;
    }
  });

  return { products: sortedProducts };
}
