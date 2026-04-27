import { prisma } from '@/lib/prisma'

export async function getProductsByCategory(slug: string) {
  return prisma.product.findMany({
    where: {
      category: { slug },
      isActive: true,
    },
    include: { brand: true, category: true, segments: true },
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
  })
}

export async function getProductsBySegment(slug: string) {
  return prisma.product.findMany({
    where: {
      segments: { some: { slug } },
      isActive: true,
    },
    include: { brand: true, category: true, segments: true },
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
  })
}

export async function getProductsByBrand(slug: string) {
  return prisma.product.findMany({
    where: {
      brand: { slug },
      isActive: true,
    },
    include: { brand: true, category: true, segments: true },
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
  })
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      brand: true,
      category: true,
      segments: true,
      articles: {
        where: { isPublished: true },
        take: 3,
        select: { slug: true, title: true, type: true },
      },
      events: {
        where: { isPublished: true, type: 'ANNOUNCEMENT' },
        take: 2,
        select: { slug: true, title: true, date: true },
      },
    },
  })
}
