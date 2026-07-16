import Cookies from "js-cookie";

interface CookieOptions {
  expires?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
}

const DEFAULT_COOKIE_OPTIONS: CookieOptions = {
  expires: 7, // 7 dias
  path: "/",
  secure: import.meta.env.PROD, // true em HTTPS (produção)
  // Em desenvolvimento: Lax permite requisições no mesmo site/origem
  // Em produção: None permite cross-domain (com secure: true obrigatório)
  sameSite: import.meta.env.PROD ? "None" : "Lax",
};

/**
 * Define um token no cookie
 */
export function setTokenCookie(token: string): void {
  Cookies.set("token", token, DEFAULT_COOKIE_OPTIONS);
}

/**
 * Obtém o token do cookie
 */
export function getTokenCookie(): string | null {
  const token = Cookies.get("access_token") || Cookies.get("token");
  return token || null;
}

/**
 * Remove o token do cookie
 */
export function removeTokenCookie(): void {
  Cookies.remove("access_token", { path: "/" });
  Cookies.remove("token", { path: "/" });
}

/**
 * Define dados do usuário no cookie
 */
export function setUserCookie(user: any): void {
  Cookies.set("user", JSON.stringify(user), DEFAULT_COOKIE_OPTIONS);
}

/**
 * Obtém dados do usuário do cookie
 */
export function getUserCookie(): any | null {
  const user = Cookies.get("user");
  if (!user) return null;
  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
}

/**
 * Remove dados do usuário do cookie
 */
export function removeUserCookie(): void {
  Cookies.remove("user", { path: "/" });
}

/**
 * Limpa todos os cookies de autenticação
 */
export function clearAuthCookies(): void {
  removeTokenCookie();
  removeUserCookie();
}
