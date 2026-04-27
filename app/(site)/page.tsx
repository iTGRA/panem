import { HeroBlock } from '@/components/home/HeroBlock'
import { DirectionsBlock } from '@/components/home/DirectionsBlock'
import { CatalogEntryBlock } from '@/components/home/CatalogEntryBlock'
import { AcademyFeedBlock } from '@/components/home/AcademyFeedBlock'
import { ConsultingClubBlock } from '@/components/home/ConsultingClubBlock'
import { SupportBlock } from '@/components/home/SupportBlock'
import { TestimonialsBlock } from '@/components/home/TestimonialsBlock'
import { RegionsBlock } from '@/components/home/RegionsBlock'
import { FinalCtaBlock } from '@/components/home/FinalCtaBlock'

export default function HomePage() {
  return (
    <>
      <HeroBlock />
      <DirectionsBlock />
      <CatalogEntryBlock />
      <AcademyFeedBlock />
      <ConsultingClubBlock />
      <SupportBlock />
      <TestimonialsBlock />
      <RegionsBlock />
      <FinalCtaBlock />
    </>
  )
}
