import { baseGetServerSideProps } from '@/libs/gssp.server';

export { default } from '@/components/pages/Dashboard';

export const getServerSideProps = baseGetServerSideProps(async () => ({ props: {} }), {
  requireAuth: true
});
