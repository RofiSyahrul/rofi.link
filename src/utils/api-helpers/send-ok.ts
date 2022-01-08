import type { NextApiResponse } from 'next';

import StatusCode from '@/constants/status-code';

export default function sendOK(res: NextApiResponse) {
  return res.status(StatusCode.OK).json({ ok: true });
}
