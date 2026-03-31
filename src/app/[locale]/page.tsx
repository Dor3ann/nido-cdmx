import { useTranslations } from 'next-intl';
import HeroSection from '@/components/home/HeroSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import ColoniasSection from '@/components/home/ColoniasSection';
import SubletPreviewSection from '@/components/home/SubletPreviewSection';
import ConciergeCTASection from '@/components/home/ConciergeCTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <ColoniasSection />
      <SubletPreviewSection />
      <ConciergeCTASection />
    </>
  );
}
