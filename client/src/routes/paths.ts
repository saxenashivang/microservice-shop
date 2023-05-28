// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_SHOP = '/shop';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register')
};
export const PATH_SHOP = {
  root: ROOTS_SHOP,
  eCommerce: {
    root: path(ROOTS_SHOP, '/list'),
  },
};
