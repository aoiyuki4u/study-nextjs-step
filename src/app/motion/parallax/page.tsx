"use client";
import Sample from '@/app/motion/parallax/Sample';
import Sample2 from '@/app/motion/parallax/Sample2';
import Stacking from '@/app/motion/parallax/Stacking';
import ScalableImage from '@/app/motion/parallax/ScalableImage';
import CoverCard from '@/app/motion/parallax/CoverCard';
import Expanding from '@/app/motion/parallax/Expanding';
import TextLoop from '@/app/motion/parallax/TextLoop';
import SharedLayout from '@/app/motion/parallax/SharedLayout';
import BookmarkScroll from '@/app/motion/parallax/BookmarkScroll';



export default function Page({ params, searchParams }: any) {
  return (
    <main>
      <section>
        <Stacking />
      </section>
      <section>
        <ScalableImage />
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
        <BookmarkScroll />
      </section>
      <section>
        <Sample />
      </section>
    </main>
  )
}


