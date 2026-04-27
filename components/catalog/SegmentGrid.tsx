import Link from 'next/link'
import type { Segment } from '@prisma/client'
import { pluralize } from '@/lib/utils-text'

type SegmentWithCount = Segment & { _count: { products: number } }

export function SegmentGrid({ segments }: { segments: SegmentWithCount[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {segments.map((seg) => (
        <Link
          key={seg.slug}
          href={`/catalog/segment/${seg.slug}`}
          className="inline-flex items-center gap-3 rounded-full border-[1.5px] px-5 py-3 text-ink transition-transform duration-200 hover:-translate-y-0.5"
          style={{ background: seg.colorL2, borderColor: seg.colorL1 }}
        >
          <span className="text-[12px] font-medium">{seg.name}</span>
          <span className="text-[10px]" style={{ color: 'rgba(0,0,0,.45)' }}>
            {seg._count.products}{' '}
            {pluralize(seg._count.products, ['товар', 'товара', 'товаров'])}
          </span>
        </Link>
      ))}
    </div>
  )
}
