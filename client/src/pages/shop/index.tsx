import { useState, useEffect } from 'react';
// next
import Head from 'next/head';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Container, Typography, Stack,Box,Card,Skeleton, Grid } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProducts,deleteCart,increaseQuantity,decreaseQuantity } from '../../redux/slices/product';
// routes
import { PATH_SHOP } from '../../routes/paths';

// layouts
import MainLayout from '../../layouts/main';
import ProductCard from '../../components/ProductCard';
import CartWidget from '../../components/CartWidget';
import CheckoutCart from '../../components/CheckoutCart';


// ----------------------------------------------------------------------

EcommerceShopPage.getLayout = (page: React.ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

// ----------------------------------------------------------------------

export default function EcommerceShopPage() {

  const dispatch = useDispatch();

  const { products, checkout } = useSelector((state) => state.product)

  const { cart } = checkout;

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleDeleteCart = (productId: string) => {
    dispatch(deleteCart(productId));
  };

  const handleIncreaseQuantity = (productId: string) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId: string) => {
    dispatch(decreaseQuantity(productId));
  };

  console.log(products,checkout);
  return (
    <>
      <Head>
        <title> Ecommerce: Shop | Minimal UI</title>
      </Head>

        <Container maxWidth={'lg'}>
        <Grid
          container
          justifyContent={{
            xs: 'center',
            md: 'space-between',
          }}
          sx={{
            textAlign: {
              xs: 'center',
              md: 'left',
            },
          }}
        >
          <Grid item xs={12} sx={{ mb: 8 }}>
          <Stack
            spacing={2}
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ sm: 'center' }}
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
          </Stack>

          <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
        lg: 'repeat(4, 1fr)',
      }}
    >
      {(!products.length ? [...Array(12)] : products).map((product, index) =>
        product ? (
          <ProductCard key={product.id} product={product} />
        ) : (
            <Card key={index}>
            <Skeleton variant="rectangular" sx={{ paddingTop: '100%' }} />
            <Stack spacing={2} sx={{ p: 3 }}>
              <Skeleton variant="text" sx={{ width: 0.5 }} />
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row">
                  <Skeleton variant="circular" sx={{ width: 16, height: 16 }} />
                  <Skeleton variant="circular" sx={{ width: 16, height: 16 }} />
                  <Skeleton variant="circular" sx={{ width: 16, height: 16 }} />
                </Stack>
                <Skeleton variant="text" sx={{ width: 40 }} />
              </Stack>
            </Stack>
          </Card>
        )
      )}
          </Box>
          </Grid>
          <Grid item xs={12} sx={{ mb: 4 }}>
            <CheckoutCart
            checkout={checkout}
            onDeleteCart={handleDeleteCart}
            onIncreaseQuantity={handleIncreaseQuantity}
            onDecreaseQuantity={handleDecreaseQuantity}
            />
            </Grid>
            </Grid>
          <CartWidget totalItems={checkout.totalItems} />
        </Container>
    </>
  );
}
