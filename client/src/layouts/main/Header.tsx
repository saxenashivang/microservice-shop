// next
import NextLink from 'next/link';
// @mui
import { useTheme } from '@mui/material/styles';
import { AppBar, Toolbar, Box, BoxProps, Link } from '@mui/material';

// ----------------------------------------------------------------------


export default function Header() {
  const theme = useTheme();

  return (
    <AppBar  sx={{ boxShadow: 0 }}>
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          height: {
            xs: 64,
            md: 88,
          },
          transition: theme.transitions.create(['height', 'background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
        }}
      >
        

        <Link component={NextLink} href={'#'} variant="subtitle2" color="inherit">
          Need Help?
        </Link>
      </Toolbar>

      <Shadow />
    </AppBar>
  );
}

// ----------------------------------------------------------------------

function Shadow({ sx, ...other }: BoxProps) {
  return (
    <Box
      sx={{
        left: 0,
        right: 0,
        bottom: 0,
        height: 24,
        zIndex: -1,
        m: 'auto',
        borderRadius: '50%',
        position: 'absolute',
        width: `calc(100% - 48px)`,
        ...sx,
      }}
      {...other}
    />
  );
}
