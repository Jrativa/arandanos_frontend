import { useTranslation } from "react-i18next";
import { Mail, Lock } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Checkbox } from "@/shared/ui/checkbox";
import { Spinner } from "@/shared/ui/spinner";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/shared/ui/field";

interface LoginFormData {
  username: string;
  password: string;
}

interface LoginFormProps {
  formData: LoginFormData;
  rememberMe: boolean;
  isLoading: boolean;
  error: string | null;
  onFormDataChange: (data: LoginFormData) => void;
  onRememberMeChange: (checked: boolean) => void;
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
}

export function LoginForm({
  formData,
  rememberMe,
  isLoading,
  error,
  onFormDataChange,
  onRememberMeChange,
  onSubmit,
}: LoginFormProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-midnight/5 p-8">
      <form onSubmit={onSubmit}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="username" className="text-midnight text-sm font-medium">
              {t("auth.username")}
            </FieldLabel>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-dusty/60" />
              <Input
                id="username"
                type="text"
                placeholder={t("auth.username.placeholder")}
                value={formData.username}
                onChange={(e) =>
                  onFormDataChange({ ...formData, username: e.target.value })
                }
                className="pl-10 h-11 bg-cream/50 border-midnight/10 text-midnight placeholder:text-dusty/50 focus-visible:border-dusty focus-visible:ring-dusty/20"
                required
                disabled={isLoading}
              />
            </div>
          </Field>

          <Field>
            <FieldLabel htmlFor="password" className="text-midnight text-sm font-medium">
              {t("auth.password")}
            </FieldLabel>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-dusty/60" />
              <Input
                id="password"
                type="password"
                placeholder={t("auth.password.placeholder")}
                value={formData.password}
                onChange={(e) =>
                  onFormDataChange({ ...formData, password: e.target.value })
                }
                className="pl-10 h-11 bg-cream/50 border-midnight/10 text-midnight placeholder:text-dusty/50 focus-visible:border-dusty focus-visible:ring-dusty/20"
                required
                disabled={isLoading}
              />
            </div>
          </Field>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) =>
                  onRememberMeChange(checked === true)
                }
                className="border-midnight/20 data-[state=checked]:bg-midnight data-[state=checked]:border-midnight"
                disabled={isLoading}
              />
              <label
                htmlFor="remember"
                className="text-sm text-dusty cursor-pointer select-none"
              >
                {t("auth.remember")}
              </label>
            </div>
            <a
              href="#"
              className="text-sm text-dusty hover:text-midnight transition-colors font-medium"
            >
              {t("auth.forgot")}
            </a>
          </div>

          {error && (
            <FieldError className="text-center">
              {error}
            </FieldError>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 bg-purple hover:bg-purple-dark text-cream font-medium rounded-xl transition-all"
          >
            {isLoading ? (
              <>
                <Spinner className="size-4" />
                <span>{t("auth.signingin")}</span>
              </>
            ) : (
              t("auth.signin")
            )}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
