import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Cherry, Languages, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/shared/ui/button";

import { useAuthStore } from "@/modules/auth/application/authStore";

const navLinks = [
  { label: "Funcionalidades", href: "#features" },
  { label: "Contacto", href: "#contact" },
];

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const toggleLanguage = () => {
    const next = i18n.language === "en" ? "es" : "en";
    i18n.changeLanguage(next);
    localStorage.setItem("language", next);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md border-b border-midnight/5">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-midnight text-cream transition-transform group-hover:scale-105">
              <Cherry className="w-5 h-5" />
            </div>
            <span className="font-semibold text-midnight text-lg tracking-tight">
              {t("app.name")}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="text-sm font-medium text-midnight/70 hover:text-midnight transition-colors cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            {user && (
              <div className="flex items-center gap-2 px-3 py-1.5 mr-1 bg-midnight/5 rounded-lg">
                <div className="size-7 rounded-full bg-purple flex items-center justify-center text-white text-xs font-semibold">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div className="text-xs leading-tight">
                  <p className="text-midnight font-medium">{user.username}</p>
                  <p className="text-dusty">{user.role}</p>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-dusty hover:text-midnight border border-midnight/10 rounded-lg hover:bg-midnight/5 transition-colors"
            >
              <Languages className="size-3.5" />
              {i18n.language === "en" ? "ES" : "EN"}
            </button>

            <Button
              variant="ghost"
              className="text-midnight/70 hover:text-midnight"
              onClick={handleLogout}
            >
              <LogOut className="size-4 mr-1" />
              Salir
            </Button>
          </div>

          <button
            type="button"
            className="md:hidden p-2 text-midnight"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Cerrar menu" : "Abrir menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-midnight/5">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="px-3 py-2 text-sm font-medium text-midnight/70 hover:text-midnight hover:bg-midnight/5 rounded-lg transition-colors cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-midnight/5">
                {user && (
                  <div className="flex items-center gap-2 px-3 py-2 text-sm text-dusty">
                    <div className="size-7 rounded-full bg-purple flex items-center justify-center text-white text-xs font-semibold">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-midnight font-medium">{user.username}</span>
                    <span className="text-dusty">· {user.role}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 px-3">
                  <button
                    type="button"
                    onClick={toggleLanguage}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-dusty hover:text-midnight border border-midnight/10 rounded-lg hover:bg-midnight/5 transition-colors"
                  >
                    <Languages className="size-3.5" />
                    {i18n.language === "en" ? "ES" : "EN"}
                  </button>
                  <Button
                    variant="ghost"
                    className="text-midnight/70"
                    onClick={handleLogout}
                  >
                    <LogOut className="size-4 mr-1" />
                    Salir
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
