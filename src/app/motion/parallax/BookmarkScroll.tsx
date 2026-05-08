"use client";
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-montserrat',
});

interface NavItem {
  id: string;
  label: string;
  desc: string;
}

const navItems: NavItem[] = [
  { id: 'covid-requirements', label: 'COVID-19 Entry Requirements', desc : 'Entry restrictions have been completely lifted for travelers entering Armenia, as PCR tests and proof of vaccination status are no longer required. Entry to The Republic of Armenia remains open via air and land borders.Enjoy your vacation safely and comfortably!' },
  { id: 'border-info', label: 'Border Info', desc :'Armenia is an ancient crossroads for trade and international travel. As a landlocked country, Armenia can be reached by air or land. By land, Armenia is easily accessible from Iran and Georgia, while its land borders with Turkey and Azerbaijan remain closed. Most of Armenia’s land borders work 24/7, which is good news for red-eye travelers. ' },
  { id: 'direct-flights', label: 'Direct Flights', desc :'With two international airports (Zvartnots in the capital city of Yerevan and Shirak in the cultural capital of Gyumri), Armenia is easily accessible from many major countries in the region. Thanks to modern, post-Soviet renovations, Armenia’s airports are comfortable hubs for international travel. It is easy to get to Armenia as there is no shortage of direct flights to and from Zvartnots International Airport. Regular direct flights happen daily from major international cities across the globe.' },
  { id: 'visa-free', label: 'Visa-Free Countries', desc :'Foreigners entering Armenia are required to show their valid passport. CIS member states, EU member states, Schengen countries, the United States of America, and a few others are exempt from an entry visa. To know if a visa is required for your trip to Armenia, click here. To apply for visas online, visit the e-visa platform. For more information regarding visas, please click here.' },
  { id: 'requirements', label: 'Requirements', desc :'Foreigners entering Armenia must provide a valid passport, a visa (if applicable), or proof of Armenian residency. For those coming from a visa-free country, you can stay in Armenia for up to 180 days per year.' },
];

const useScrollSpy = (ids: string[], offset: number = 100) => {
  console.log('offset : ' + offset)
  const [activeId, setActiveId] = useState<string>('');
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            console.log('entry.target.id : ' + entry.target.id)
          }
        });
      },
      { rootMargin: `-${offset}px 0% -70% 0%` }
    );
    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [ids, offset])
  return activeId;
};

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const offset = 80;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
};

export default function BookmarkScroll(){
  const activeId = useScrollSpy(navItems.map(item => item.id));
  return (
    <div className={`${montserrat.className} flex gap-[40px] items-start`}>
      <nav className="sticky top-[100px] w-[350px] shrink-0">
        <ul className='p-5'>
          {navItems.map((item) => (
            <li 
              key={item.id}
              className={`py-[16px] px-[24px] rounded-lg ${activeId === item.id ? 'active bg-[#eaeaea]' : ''}`}>
              <button 
                onClick={() => scrollToSection(item.id)}
                className='text-left text-[#15233B] font-bold'
              >
                {item.label}
                {activeId === item.id && (
                  <motion.div
                    layoutId="activeBackground"
                    className="absolute-bg"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <main className="py-5">
        {navItems.map((item) => (
          <section key={item.id} id={item.id}>
            <h2 className='text-4xl font-bold my-7 text-shadow-blue-950'>{item.label}</h2>
            <p>{item.desc}</p>
          </section>
        ))}
      </main>
    </div>
  )
}


