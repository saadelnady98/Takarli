
import React from "react";


type SectionData = {
  id: number;
  title: string;
  short_description: string;
};

export type OurApproachProps = {
  ourApproachHeader: SectionData & { image: string };
  mission: SectionData;
  vision: SectionData;
  values: SectionData;
  promise: SectionData;
};

export default function OurApproach({
  ourApproachHeader,
  mission,
  vision,
  values,
  promise,
}: OurApproachProps) {
  const sections = [mission, vision, values, promise];

  const bgImageStyle = {
    backgroundImage: `url(${ourApproachHeader?.image})` || "/assets/aboutpage/approach.png",
  };
  return (
        <section>
            <div 
            className=
            "relative flex flex-col items-center justify-center w-full text-center  lg:mt-10 mt-5" >
                  <div
        className="absolute inset-0 bg-cover bg-center"
        style={bgImageStyle}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-dark/90" aria-hidden="true" />
                <div className="relative z-10 text-center lg:pt-16 pt-4.5 lg:mb-12 mb-5 flex flex-col lg:gap-6 gap-2.5">
                        <h3 className="lg:text-4xl text-lg text-center text-white font-[galleds]">{ourApproachHeader?.title}</h3>
                        <p className="lg:text-xl w-[70%] m-auto text-xs font-light text-center text-white">{ourApproachHeader?.short_description}</p>
                </div>
                <div className="relative lg:mb-16 mb-5 z-10 text-center container-padding">
                    <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-6 gap-5 mx-auto ">
                        {sections?.map((item) => {
                            return (
                                <article key={item?.id} className="   [background:linear-gradient(135.79deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_101.42%)]    lg:p-[32px_50px] p-[12px_26px] text-white flex flex-col items-center justify-center lg:gap-4 gap-2.5 ">
                                    <h4 className="text-white  text-center font-[galleds]   lg:text-3xl text-lg">{item?.title}</h4>
                                    <p className="w-[80%] m-auto font-sans   text-white   lg:text-lg lg:leading-7 text-xs font-extralight  "> {item?.short_description}</p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}