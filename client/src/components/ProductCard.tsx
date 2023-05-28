// next
import NextLink from 'next/link';
// @mui
import { Box, Card, Link, Stack, Fab } from '@mui/material';
// routes
import { PATH_SHOP } from '../routes/paths';
// redux
import { useDispatch } from '../redux/store';
import { addToCart } from '../redux/slices/product';
// @types
import { IProduct } from '../@types/product';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Image from 'next/image';

// ----------------------------------------------------------------------

type Props = {
  product: IProduct;
};

export default function ShopProductCard({ product }: Props) {
  const { id, name, cover, price, colors, status, available, sizes, priceSale } = product;

  const dispatch = useDispatch();

  const handleAddCart = async () => {
    const newProduct = {
      id,
      name,
      cover,
      available,
      price,
      colors: [colors[0]],
      size: sizes[0],
      quantity: 1,
    };
    try {
      dispatch(addToCart(newProduct));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card
      sx={{
        '&:hover .add-cart-btn': {
          opacity: 1,
        },
      }}
    >
      <Box sx={{ position: 'relative', p: 1 }}>

        <Fab
          color="warning"
          size="medium"
          className="add-cart-btn"
          onClick={handleAddCart}
          sx={{
            right: 16,
            bottom: 16,
            zIndex: 9,
            opacity: 0,
            position: 'absolute',
            transition: (theme) =>
              theme.transitions.create('all', {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.shorter,
              }),
          }}
        >
          <AddShoppingCartIcon />
        </Fab> 

        <Image
      src={cover}
      width={500}
      height={500}
      alt="Picture of the author"
    />

      </Box>

      <Stack spacing={2.5} sx={{ p: 3 }}>
        <Link component={NextLink} href={'#'} color="inherit" variant="subtitle2" noWrap>
          {name}
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" spacing={0.5} sx={{ typography: 'subtitle1' }}>
            {priceSale && (
              <Box component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
                priceSale
              </Box>
            )}

            <Box component="span">{price}</Box>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
