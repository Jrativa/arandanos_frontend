import { useTranslation } from "react-i18next";
import { Cherry } from "lucide-react";

export default function LoginImagePanel() {
  const { t } = useTranslation();

  return (
    <div className="relative w-full lg:w-1/2 aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:h-screen overflow-hidden bg-midnight">
      <img
        src="/images/blueberry-field.jpg"
        alt="Blueberry field at dawn"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-midnight/70 mix-blend-multiply" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-cream p-8">
        <Cherry className="size-16 mb-4 opacity-90" strokeWidth={1.5} />
        <h2 className="text-2xl lg:text-3xl font-light tracking-wide text-center text-balance">
          {t("app.tagline")}
        </h2>
        <p className="mt-2 text-cream/70 text-sm lg:text-base font-light">
          {t("app.subtagline")}
        </p>
      </div>
    </div>
  );
}
