"use client";
import Sample from '@/app/motion/parallax/Sample';
import Sample2 from '@/app/motion/parallax/Sample2';
import Stacking from '@/app/motion/parallax/Stacking';
import CoverCard from '@/app/motion/parallax/CoverCard';
import Expanding from '@/app/motion/parallax/Expanding';
import TextLoop from '@/app/motion/parallax/TextLoop';
import SharedLayout from '@/app/motion/parallax/SharedLayout';



export default function Page({ params, searchParams }: any) {
  return (
    <main>
      <section>
        <Stacking />
      </section>
      <section>
        <CoverCard />
      </section>
      <section>
        <TextLoop />
      </section>
      <section>
        <Expanding />
      </section>
      <section>
        <SharedLayout />
      </section>
      <section>
        <Sample2 />
      </section>
      <section>
        <Sample />
      </section>
    </main>
  )
}


