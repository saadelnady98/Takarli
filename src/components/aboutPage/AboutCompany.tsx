import Image from "next/image";

export default function AboutCompany({ title, description, image }: { title: string; description: string; image: string }) {
  return (
    <section className="relative w-full lg:min-h-[476px]  lg:mt-10 mt-5 flex items-center justify-center  container-padding">
      <div className="flex w-full justify-between items-center m-auto text-start max-xl:flex-col-reverse max-xl:gap-10">
        
        {/* Left Content */}
        <div className="flex-1 lg:px-7 px-3.5">
          <h2
            className="font-[galleds] text-dark
                     tracking-normal
                       text-lg sm:text-3xl
                       mb-5 xl:mb-4"
          >
            {title}
          </h2>

          {description.split(". ").map((sentence, idx) => (
            <p
              key={idx}
              className=" text-dark-grey font-light
                         text-xs sm:text-lg
                         leading-[100%] sm:leading-7
                         tracking-[0%] xl:w-[596px] line-clamp-7"
            >
              {sentence}
            </p>
          ))}
        </div>

        <div className="relative flex-1 flex justify-end items-center max-xl:w-full max-xl:justify-center ">
          <div
            className="absolute bg-[#1A1616] z-1
                       xl:w-[191px] xl:h-[191px] 
                       w-[163px] h-[103px] top-0 right-0
                        max-xl:overflow-hidden"
          />

        { <Image
            src={image || "/assets/aboutpage/about.svg"}
            alt={title}
            width={674}
            height={474}
            priority
            className="relative max-h-[474px] z-10 object-cover lg:p-7 p-3.5
                       max-xl:w-full max-xl:h-[300px] max-sm:h-[220px]
                      "
          />}
        </div>

      </div>
    </section>
  );
}
