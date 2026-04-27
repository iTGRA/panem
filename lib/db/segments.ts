import { prisma } from '@/lib/prisma'

export async function getSegments() {
  return prisma.segment.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
    include: {
      _count: { select: { products: { where: { isActive: true } } } },
    },
  })
}

export async function getSegmentBySlug(slug: string) {
  return prisma.segment.findUnique({
    where: { slug },
  })
}
