import { prisma } from '@/lib/prisma'

export async function getLatestEvents(limit = 3) {
  return prisma.event.findMany({
    where: { isPublished: true },
    include: { brand: true },
    orderBy: [{ date: 'desc' }, { createdAt: 'desc' }],
    take: limit,
  })
}
