import { NextPage } from 'next';
import { ErrorProps } from 'next/error';

import ErrorPage from '@/components/pages/Error';

const UnexpectedErrorPage: NextPage<ErrorProps> = (props) => {
  return <ErrorPage {...props} />;
};

UnexpectedErrorPage.getInitialProps = ({ res, err }) => {
  const { statusCode: currentStatusCode = 500 } = res || {};
  const { statusCode: thrownStatusCode } = err || {};
  const statusCode = thrownStatusCode || currentStatusCode;

  if (res) {
    res.statusCode = statusCode;
  }

  return { statusCode };
};

export default UnexpectedErrorPage;
