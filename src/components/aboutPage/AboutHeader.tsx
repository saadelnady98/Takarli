
export default function AboutHeader({ title, description }: { title: string; description: string }) {
  return (
    <section className=" pt-10 container-padding">
      <div className="mx-auto flex flex-col gap-[20px] max-sm:w-[325px] w-full  lg:w-[877px]">
        
        <div className="h-fit  flex items-center justify-center">
          <h1
            className="font-[galleds]  text-dark text-center
                       text-lg sm:text-4xl lg:text-5xl
                        lg:leading-normal"
          >
            {title}
          </h1>
        </div>

        <p
          className="text-dark-grey text-center
                     text-sm sm:text-lg lg:text-xl
                     tracking-[-1%]"
        >
          {description}
        </p>
      </div>
    </section>
  );
}
