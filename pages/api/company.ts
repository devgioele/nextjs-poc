// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { CompanyData } from '../../types/apiInternal';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CompanyData>
) {
  res.status(200).json({ company: 'Hello, KONVERTO!👾', time: Date.now() });
}
