import { prisma } from '@/lib/prisma'

export async function getTestimonials() {
  return prisma.testimonial.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
  })
}
