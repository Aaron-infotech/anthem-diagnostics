import { useEffect } from 'react'
import AOS from 'aos'
import HeroSlider from '../components/HeroSlider/HeroSlider'
import CompanyIntro from './home-sections/CompanyIntro'
import WhyChooseUs from './home-sections/WhyChooseUs'
import PartnersSection from './home-sections/PartnersSection'
import ProductCategories from './home-sections/ProductCategories'
import CorporateClients from './home-sections/CorporateClients'
import CallToAction from './home-sections/CallToAction'

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60 })
    document.title = 'Anthem Diagnostics Private Limited | Advanced Diagnostic Solutions'
  }, [])

  return (
    <>
      <HeroSlider />
      <CompanyIntro />
      <WhyChooseUs />
      <CorporateClients />
      <ProductCategories />
      <PartnersSection />
      <CallToAction />
    </>
  )
}
