import { prisma } from '@/lib/prisma'
import type { EventType } from '@prisma/client'

export async function getLatestEvents(limit = 3) {
  return prisma.event.findMany({
    where: { isPublished: true },
    include: { brand: true },
    orderBy: [{ date: 'desc' }, { createdAt: 'desc' }],
    take: limit,
  })
}

export async function getAllEvents(type?: EventType) {
  return prisma.event.findMany({
    where: {
      isPublished: true,
      ...(type ? { type } : {}),
    },
    include: {
      brand: true,
      products: { take: 3, select: { slug: true, name: true } },
    },
    orderBy: [{ date: 'desc' }, { createdAt: 'desc' }],
  })
}

export async function getEventBySlug(slug: string) {
  return prisma.event.findUnique({
    where: { slug },
    include: {
      brand: true,
      products: {
        include: { category: true },
      },
    },
  })
}
