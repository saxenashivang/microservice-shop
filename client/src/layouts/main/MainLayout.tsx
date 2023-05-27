// next
import dynamic from 'next/dynamic';
//
const Header = dynamic(() => import('./Header'), { ssr: false });

// ----------------------------------------------------------------------

type Props = {
  children?: React.ReactNode;
};

export default function MainLayout({ children }: Props) {

  return (
    <>
      <Header />

      {children}
    </>
  );
}
