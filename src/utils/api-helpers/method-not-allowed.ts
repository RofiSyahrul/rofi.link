import { NextApiResponse } from 'next';

import StatusCode from '@/constants/status-code';

export default function sendMethodNotAllowed(res: NextApiResponse) {
  res.status(StatusCode.MethodNotAllowed).json({ error: { message: 'Method Not Allowed' } });
}
