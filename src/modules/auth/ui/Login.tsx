import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Cherry, Languages } from "lucide-react";

import { useAuthStore } from "@/modules/auth/application/authStore";
import { LoginForm } from "./LoginForm";
import LoginImagePanel from "./LoginImagePanel";

interface LoginFormData {
  username: string;
  password: string;
}

const LANGUAGES = [
  { code: "en", label: "lang.en" },
  { code: "es", label: "lang.es" },
];

export default function LoginPage() {
  const { t, i18n } = useTranslation();
  const { login, isLoading, error, user } = useAuthStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/home", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(formData.username, formData.password);
  };

  const toggleLanguage = () => {
    const next = i18n.language === "en" ? "es" : "en";
    i18n.changeLanguage(next);
    localStorage.setItem("language", next);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-cream">
      <LoginImagePanel />

      <div className="relative flex-1 flex items-center justify-center p-6 lg:p-12">
        <button
          type="button"
          onClick={toggleLanguage}
          className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-dusty hover:text-midnight border border-midnight/10 rounded-lg hover:bg-midnight/5 transition-colors"
        >
          <Languages className="size-3.5" />
          {i18n.language === "en" ? "ES" : "EN"}
        </button>

        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-midnight/5">
                <Cherry className="size-8 text-midnight" strokeWidth={1.5} />
              </div>
              <span className="text-2xl font-semibold text-midnight tracking-tight">
                {t("app.name")}
              </span>
            </div>
            <h1 className="text-3xl font-light text-midnight mb-2">
              {t("auth.welcome")}
            </h1>
            <p className="text-dusty text-sm">
              {t("auth.subtitle")}
            </p>
          </div>

          <LoginForm
            formData={formData}
            rememberMe={rememberMe}
            isLoading={isLoading}
            error={error}
            onFormDataChange={setFormData}
            onRememberMeChange={setRememberMe}
            onSubmit={handleSubmit}
          />

          <p className="text-center text-sm text-dusty/70 mt-8">
            {t("auth.noaccount")}
            <a
              href="#"
              className="text-midnight hover:text-dusty transition-colors font-medium"
            >
              {t("auth.contact")}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
