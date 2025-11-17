import Link from "next/link"
import { useTranslations } from "next-intl"

export default function ExpertForm() {
  const t = useTranslations("about")
  return (
    <section className="container-padding my-5 lg:my-10">
      <div className="mx-auto flex flex-col items-center gap-5 text-center lg:gap-8">
        <h6 className="m-auto text-xl lg:w-3/4 lg:text-3xl"> {t("aboutSec5Title")}</h6>
        <Link
          href={"/talk-to-expert"}
          className="bg-dark flex max-w-fit min-w-[130px] cursor-pointer items-center justify-center rounded-none p-6 text-sm font-medium text-white transition-colors hover:bg-gray-800 lg:max-h-[47px] lg:min-w-[251px] lg:p-[12px_16px] lg:text-lg"
        >
          {t("aboutSec5Desc")}
        </Link>
      </div>
    </section>
  )
}
