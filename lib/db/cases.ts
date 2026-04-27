import { prisma } from '@/lib/prisma'

export async function getCases() {
  return prisma.case.findMany({
    where: { isPublished: true },
    include: {
      products: { take: 3, include: { category: true } },
    },
    orderBy: { sortOrder: 'asc' },
  })
}

export async function getCaseBySlug(slug: string) {
  return prisma.case.findUnique({
    where: { slug },
    include: {
      products: {
        include: { brand: true, category: true },
      },
    },
  })
}
