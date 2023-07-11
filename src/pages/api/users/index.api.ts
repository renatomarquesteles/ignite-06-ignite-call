import type { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from '../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end() // 405 - Method not allowed
  }

  const { username, name } = req.body

  const user = await prisma.user.create({
    data: { username, name },
  })

  return res.status(201).json(user) // 201 - Created successfully
}
