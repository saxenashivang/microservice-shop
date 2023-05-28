import sum from 'lodash/sum';
// next
import NextLink from 'next/link';
import Image from 'next/image';
// @mui
import { Grid, Card, Button, CardHeader, Typography,Stack,Table, TableBody, TableContainer,TableRow,TableCell,Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
// routes
import { PATH_SHOP } from '../routes/paths';
// @types
import { IProductCheckoutState } from '../@types/product';
// components

// ----------------------------------------------------------------------

type Props = {
  checkout: IProductCheckoutState;
  onNextStep: VoidFunction;
  onApplyDiscount: (value: number) => void;
  onDeleteCart: (productId: string) => void;
  onIncreaseQuantity: (productId: string) => void;
  onDecreaseQuantity: (productId: string) => void;
};

export default function CheckoutCart({
  checkout,
  onDeleteCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
}: Props) {
  const { cart, total, subtotal } = checkout;

  const totalItems = sum(cart.map((item) => item.quantity));

  const isEmptyCart = !cart.length;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card sx={{ mb: 3 }}>
          <CardHeader
            title={
              <Typography variant="h6">
                Cart
                <Typography component="span" sx={{ color: 'text.secondary' }}>
                  &nbsp;({totalItems} item)
                </Typography>
              </Typography>
            }
            sx={{ mb: 3 }}
          />

          {!isEmptyCart ? (
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 720 }}>
                {/* <TableHeadCustom headLabel={TABLE_HEAD} /> */}
      
                <TableBody>
                  {cart.map((row) => (
                    <TableRow key={row.id}>
                    <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                      <Image
                        alt="product image"
                        src={row.imageURI}
                      />
              
                      <Stack spacing={0.5}>
                        <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240 }}>
                          {row.name}
                        </Typography>
                      </Stack>
                    </TableCell>
              
                    <TableCell>{row.price}</TableCell>
              
                    <TableCell>
                      <Box sx={{ width: 96, textAlign: 'right' }}>
                        {/* <IncrementerButton
                          quantity={quantity}
                          onDecrease={onDecrease}
                          onIncrease={onIncrease}
                          disabledDecrease={quantity <= 1}
                          disabledIncrease={quantity >= available}
                        /> */}
              
                      </Box>
                    </TableCell>
              
                    <TableCell align="right">{row.price * row.quantity}</TableCell>
              
                    <TableCell align="right">
                    <DeleteIcon  />
                    </TableCell>
                  </TableRow>
                  ))}
                </TableBody>
              </Table>
          </TableContainer>
          ) : (
            <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        height: 1,
        textAlign: 'center',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Empty
      </Typography>

      
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
         Nothing in the cart
        </Typography>
    </Stack>
    )}
        </Card>

        <Button
          component={NextLink}
          href={'#'}
          color="inherit"
        >
          Continue Shopping
        </Button>
      </Grid>

      <Grid item xs={12} md={4}>
        {/* <CheckoutSummary
          enableDiscount
          total={total}
          discount={discount}
          subtotal={subtotal}
          onApplyDiscount={onApplyDiscount}
        /> */}
        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled={!cart.length}
        >
          Check Out
        </Button>
      </Grid>
    </Grid>
  );
}
