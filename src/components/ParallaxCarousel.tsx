"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EmblaCarouselType } from "embla-carousel";

interface PropertyImageCarouselProps {
  images: string[];
}

const ParallaxCarousel: React.FC<PropertyImageCarouselProps> = ({ images }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });
  const [thumbsRef, thumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState<number[]>([]);

  // Sync thumbnails
  const onSelect = useCallback(
    (api: EmblaCarouselType) => {
      setSelectedIndex(api.selectedScrollSnap());
      thumbsApi?.scrollTo(api.selectedScrollSnap());
    },
    [thumbsApi]
  );

  // Track slide progress for parallax
  const onScroll = useCallback((api: EmblaCarouselType) => {
    const progress = api.scrollProgress();
    const slides = api.scrollSnapList().map((snap, idx) => {
      const diffToTarget = snap - progress;
      return diffToTarget;
    });
    setScrollProgress(slides);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    onScroll(emblaApi);

    emblaApi.on("select", onSelect);
    emblaApi.on("scroll", onScroll);
    emblaApi.on("reInit", () => {
      onSelect(emblaApi);
      onScroll(emblaApi);
    });
  }, [emblaApi, onSelect, onScroll]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi]
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 mt-5">
      {/* Main carousel */}
      <div className="relative overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex gap-4">
          {images.map((src, idx) => {
            // Parallax strength (tweak for effect)
            const translate = scrollProgress[idx]
              ? scrollProgress[idx] * -40
              : 0;

            return (
              <div
                key={idx}
                className="relative flex-[0_0_85%] md:flex-[0_0_70%] h-[400px] md:h-[520px] overflow-hidden rounded-xl"
              >
                <div
                  className="w-full h-full transition-transform duration-300 ease-out will-change-transform"
                  style={{
                    transform: `translateX(${translate}px) scale(1.05)`,
                  }}
                >
                  <Image
                    src={src}
                    alt={`Property image ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Arrows */}
        <button
          onClick={scrollPrev}
          className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Thumbnails */}
      {/* <div className="mt-4" ref={thumbsRef}>
        <div className="flex gap-3">
          {images.map((src, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              className={`relative h-20 w-28 rounded-lg overflow-hidden border-2 transition ${
                idx === selectedIndex ? "border-blue-500" : "border-transparent"
              }`}
              aria-label={`Go to image ${idx + 1}`}
            >
              <Image
                src={src}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div> */}

      {/* Dots */}
      <div className="flex justify-center mt-4 gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollTo(idx)}
            className={`h-3 w-3 rounded-full transition ${
              idx === selectedIndex ? "bg-blue-600" : "bg-gray-300"
            }`}
            aria-label={`Go to image ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ParallaxCarousel;
