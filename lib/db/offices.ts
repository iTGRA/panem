import { prisma } from '@/lib/prisma'

export async function getOffices() {
  return prisma.office.findMany({
    orderBy: { sortOrder: 'asc' },
  })
}

export async function getDefaultOffice() {
  return prisma.office.findFirst({
    where: { isHq: true },
  })
}
