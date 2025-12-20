import React from "react";
import { Link } from "react-router";


import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
const Banner = () => {
  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop",
      title: "Journey Across the Country",
      description:
        "Book your bus tickets with comfort and ease. Best prices guaranteed.",
      btnText: "Explore Buses",
      link: "/allTickets",
    },
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/4/46/%E0%A6%B2%E0%A6%BE%E0%A6%89%E0%A6%AF%E0%A6%BC%E0%A6%BE%E0%A6%9B%E0%A6%A1%E0%A6%BC%E0%A6%BE_%E0%A6%9C%E0%A6%BE%E0%A6%A4%E0%A7%80%E0%A6%AF%E0%A6%BC_%E0%A6%89%E0%A6%A6%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%A8%E0%A7%87%E0%A6%B0_%E0%A6%AE%E0%A6%BE%E0%A6%9D_%E0%A6%A6%E0%A6%BF%E0%A6%AF%E0%A6%BC%E0%A7%87_%E0%A6%AF%E0%A6%BE%E0%A6%9A%E0%A7%8D%E0%A6%9B%E0%A7%87_%E0%A6%9F%E0%A7%8D%E0%A6%B0%E0%A7%87%E0%A6%A8.jpg",
      title: "Swift Train Bookings",
      description:
        "Skip the long lines. Get your train tickets instantly on TicketBari.",
      btnText: "Book Train",
      link: "/allTickets",
    },
    {
      image:
        "https://www.bssnews.net/assets/news_photos/2023/09/02/image-145236-1693633960.jpg",
      title: "Reach New Heights",
      description:
        "Exclusive deals on domestic and international flight bookings.",
      btnText: "Find Flights",
      link: "/allTickets",
    },
  ];

  return (
    <div className="w-full h-[400px] md:h-[550px]">
      <Swiper
        modules={[Navigation,Pagination, Autoplay, EffectFade]}
        navigation
       pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center text-white px-6 max-w-3xl">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-8 opacity-90">
                    {slide.description}
                  </p>
                  <Link to={slide.link}>
                    <button className="btn btn-success btn-lg text-white px-8 rounded-full border-none shadow-xl hover:scale-105 transition-transform">
                      {slide.btnText}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
