// ----------------------------------------------------------------------

export type IProduct = {
  id: string;
  imageURI: string;
  name: string;
  price: number;
  createdAt: Date | string | number;
  description:string
};


// ----------------------------------------------------------------------

export type ICheckoutCartItem = {
  id: string;
  name: string;
  imageURI: string;
  price: number;
  quantity: number;
  subtotal: number;
};

// ----------------------------------------------------------------------

export type IProductCheckoutState = {
  cart: ICheckoutCartItem[];
  subtotal: number;
  total: number;
  totalItems: number;
};

export type IProductState = {
  isLoading: boolean;
  error: Error | string | null;
  products: IProduct[];
  product: IProduct | null;
  checkout: IProductCheckoutState;
};
