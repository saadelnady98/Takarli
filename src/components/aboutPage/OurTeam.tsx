"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { useTranslations } from "next-intl";

type TeamMember = {
  id: number;
  name: string;
  position: string;
  link: string;
  image?: string;
};

type OurTeamProps = {
  teamMembersData: TeamMember[];
};

function TeamMemberCard({ member }: { member: TeamMember }) {

  return (
    <Link href={member.link || "#"} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-center">
      <div className="relative">
        <Image
          src={
            member.image ??
            "/assets/aboutpage/team.svg"
          }
          alt={member.name}
          width={197}
          height={197}
          className="rounded-full object-cover"
        />
        {/* <Link
          href={member.link || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-0 right-0 rounded-full p-3"
        >
          <Image
            src="/assets/icons/linkedinteam.svg"
            alt="LinkedIn"
            width={48}
            height={48}
          />
        </Link> */}
      </div>
      <h5 className="text-dark lg:text-xl text-base mt-5 ">{member.name}</h5>
      <p className="text-dark-grey lg:text-base text-sm mt-2.5 ">{member.position}</p>
    </Link>
  );
}

export default function OurTeam({ teamMembersData }: OurTeamProps) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const t = useTranslations("about.ourTeam");

  return (
    <section className=" lg:mt-10 mt-5 text-center w-full container-padding">
      <div className="mx-auto ">
        <h4 className="text-dark lg:text-4xl text-xl  font-medium">
          {t("title")}
        </h4>
        <p className="text-dark-grey  lg:text-xl text-sm font-light mx-auto lg:pt-6 lg:pb-12 pt-5 pb-5 w-full lg:w-1/2">
          {t("description")}
        </p>

        <div className="hidden lg:grid grid-cols-4 gap-y-12 mt-3 mb-10 place-items-center">
          {teamMembersData.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>

        <div className="relative block lg:hidden px-4 mx-4">
          <button
            ref={prevRef}
            className="absolute top-1/2 left-[-1rem] -translate-y-1/2 z-10 cursor-pointer"
            aria-label="Previous"
          >
            <Image
              src={'/assets/icons/left-arrow.svg'}
              alt="Previous"
              width={40}
              height={40}
              className="h-[2.5rem] w-[2.5rem] object-cover"
            />
          </button>

          <button
            ref={nextRef}
            className="absolute top-1/2 right-[-1rem] -translate-y-1/2 z-10 cursor-pointer"
            aria-label="Next"
          >
            <Image
              src={'/assets/icons/right-arrow.svg'}
              alt="Next"
              width={40}
              height={40}
              className="h-[2.5rem] w-[2.5rem] object-cover"
            />
          </button>

          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1.2}
            centeredSlides
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onInit={(swiper) => {
              // @ts-expect-error Swiper types
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-expect-error Swiper types
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            className="py-4"
          >
            {teamMembersData.map((member) => (
              <SwiperSlide key={member.id} className="flex justify-center">
                <TeamMemberCard member={member} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
