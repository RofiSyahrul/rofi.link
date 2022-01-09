import Anchor from '@/components/shared/Anchor';
import AuthSection from '@/components/shared/AuthSection';
import Layout from '@/components/shared/Layout';
import { useAuth } from '@/context/auth';

const additionalHeader = <AuthSection />;

export default function Dashboard() {
  const { user } = useAuth();
  const name = user?.fullName || user?.email;

  return (
    <Layout
      className='justify-center items-center layout-full'
      additionalHeader={additionalHeader}
      title={`Dashboard ${name}`}
      noIndex
    >
      <h1>Halaman Dashboard</h1>
      <h3>Segera hadir!!!</h3>
      <Anchor href='/' mode='solid' className='mt-4'>
        Kembali ke halaman depan
      </Anchor>
    </Layout>
  );
}
