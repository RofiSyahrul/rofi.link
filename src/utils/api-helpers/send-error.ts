import type { NextApiResponse } from 'next';

import type { PostgrestError } from '@supabase/supabase-js';

import StatusCode from '@/constants/status-code';

import ApiError from './api-error';

type ErrorType = Error | ApiError | PostgrestError | string;

function getErrorMessageAndStatus(err: ErrorType, status = StatusCode.InternalServerError) {
  const message = err instanceof Error ? err.message : (err as any)?.message ?? err;
  let statusCode = status;
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
  }

  return { message, statusCode };
}

export default function sendError(
  res: NextApiResponse,
  err: ErrorType,
  status = StatusCode.InternalServerError
) {
  const { message, statusCode } = getErrorMessageAndStatus(err, status);
  res.status(statusCode).json({ error: { message } });
}
