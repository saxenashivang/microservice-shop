// next
import Head from 'next/head';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
// layouts
import MainLayout from '../layouts/main';

// ----------------------------------------------------------------------

HomePage.getLayout = (page: React.ReactElement) => <MainLayout> {page} </MainLayout>;

// ----------------------------------------------------------------------

export default function HomePage() {
  const theme = useTheme();

  return (
    <>
      <Head>
        <title>Shop using microservice</title>
      </Head>
      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
      </Box>
    </>
  );
}
