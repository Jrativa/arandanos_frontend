import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { Mail, Lock, Cherry } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Checkbox } from "@/shared/ui/checkbox";
import { Spinner } from "@/shared/ui/spinner";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/shared/ui/field";

// Importamos la lógica real de tu aplicación (Zustand)
import { useAuthStore } from "@/modules/auth/application/authStore";

// ============================================
// TypeScript Interfaces
// ============================================
interface LoginFormData {
  username: string;
  password: string;
}

// ============================================
// Login Form Component
// ============================================
export default function LoginPage() {
  // 3. Trae también la variable 'user' de tu store
  const { login, isLoading, error, user } = useAuthStore();
  
  // 4. Inicializa el navegador de React Router
  const navigate = useNavigate(); 
  
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });
  
  const [rememberMe, setRememberMe] = useState(false);

  // 5. El efecto mágico: Si el estado 'user' se llena, redirigimos al home.
  // Usamos { replace: true } para que el usuario no pueda usar el botón de "Atrás" 
  // del navegador para volver a la pantalla de login.
  useEffect(() => {
    if (user) {
      navigate("/home", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Este es el llamado a la API. Zustand y Axios se encargan del resto.
    await login(formData.username, formData.password);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-cream">
      {/* Left Panel - Blueberry Field Image */}
      <div className="relative w-full lg:w-1/2 h-64 lg:h-screen">
        <img
          src="/images/blueberry-field.jpg"
          alt="Blueberry field at dawn"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Deep Indigo Overlay */}
        <div className="absolute inset-0 bg-midnight/70 mix-blend-multiply" />
        
        {/* Branding on Image */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-cream p-8">
          <Cherry className="size-16 mb-4 opacity-100" strokeWidth={1.5} />
          <h2 className="text-2xl lg:text-3xl font-light tracking-wide text-center text-balance">
            Farm-to-Table Inventory
          </h2>
          <p className="mt-2 text-cream/70 text-sm lg:text-base font-light">
            Track. Manage. Grow.
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-midnight/5">
                <Cherry className="size-8 text-midnight" strokeWidth={1.5} />
              </div>
              <span className="text-2xl font-semibold text-midnight tracking-tight">
                Blueberry Ledger
              </span>
            </div>
            <h1 className="text-3xl font-light text-midnight mb-2">
              Welcome back
            </h1>
            <p className="text-dusty text-sm">
              Sign in to manage your inventory
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-midnight/5 p-8">
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                {/* Email Field */}
                <Field>
                  <FieldLabel htmlFor="email" className="text-midnight text-sm font-medium">
                    Username
                  </FieldLabel>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-dusty/60" />
                    <Input
                      id="username"
                      type="username"
                      placeholder="username"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                      className="pl-10 h-11 bg-cream/50 border-midnight/10 text-midnight placeholder:text-dusty/50 focus-visible:border-dusty focus-visible:ring-dusty/20"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </Field>

                {/* Password Field */}
                <Field>
                  <FieldLabel htmlFor="password" className="text-midnight text-sm font-medium">
                    Password
                  </FieldLabel>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-dusty/60" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="pl-10 h-11 bg-cream/50 border-midnight/10 text-midnight placeholder:text-dusty/50 focus-visible:border-dusty focus-visible:ring-dusty/20"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </Field>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) =>
                        setRememberMe(checked === true)
                      }
                      className="border-midnight/20 data-[state=checked]:bg-midnight data-[state=checked]:border-midnight"
                      disabled={isLoading}
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm text-dusty cursor-pointer select-none"
                    >
                      Remember me
                    </label>
                  </div>
                  <a
                    href="#"
                    className="text-sm text-dusty hover:text-midnight transition-colors font-medium"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Error Message */}
                {error && (
                  <FieldError className="text-center">
                    {error}
                  </FieldError>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 bg-midnight hover:bg-midnight/90 text-cream font-medium rounded-xl transition-all"
                >
                  {isLoading ? (
                    <>
                      <Spinner className="size-4" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </FieldGroup>
            </form>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-dusty/70 mt-8">
            {"Don't have an account? "}
            <a
              href="#"
              className="text-midnight hover:text-dusty transition-colors font-medium"
            >
              Contact your administrator
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}