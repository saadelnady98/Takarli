// import { aboutSec5Title, aboutSec5Desc } from "@/data/dataAbout";
import Link from "next/link";
import { useTranslations } from "next-intl";


export default function ExpertForm() {
    const t = useTranslations("about");
    return (
        <section className="  lg:my-10 my-5  container-padding">
            <div className=" mx-auto  text-center flex flex-col items-center lg:gap-8 gap-5">
                    <h6 className=" lg:text-3xl text-xl lg:w-3/4 m-auto font-[galleds]"> {t("aboutSec5Title")}</h6>
                    <Link href={'/talk-to-expert'} 
                    className=" bg-dark text-white transition-colors hover:bg-gray-800 lg:min-w-[251px] min-w-[130px] max-w-fit lg:p-[12px_16px] lg:max-h-[47px] p-6 rounded-none cursor-pointer lg:text-lg text-sm font-medium   flex items-center justify-center">
                        {t("aboutSec5Desc")}
                        </Link> 
            </div>
        </section>
    );
}