import { prisma } from '@/lib/prisma'

export async function getBrands() {
  return prisma.brand.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
    include: {
      _count: { select: { products: { where: { isActive: true } } } },
    },
  })
}

export async function getBrandBySlug(slug: string) {
  return prisma.brand.findUnique({
    where: { slug },
    include: { category: true },
  })
}
