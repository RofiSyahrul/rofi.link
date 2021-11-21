import { NextApiRequest } from 'next';

export interface ApiRequest<ReqBody = any> extends NextApiRequest {
  body: ReqBody;
  user: { id: string };
}
