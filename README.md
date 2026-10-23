# Nimbus Frontend ☁️

Interface web do Nimbus, construída com **React 19 + TypeScript + Vite**. Consome a [`api-nimbus`](../api-nimbus) e permite cadastrar usuários, autenticar, gerenciar projetos e tags e editar o perfil.

---

## 🧰 Stack

- **React 19** + **TypeScript**
- **Vite 6** (dev server e build)
- **Tailwind CSS 4** + **shadcn/ui** (estilo `new-york`, componentes Radix UI)
- **React Router 7** para roteamento
- **Axios** para chamadas HTTP (com `withCredentials`, para enviar os cookies de sessão)
- **next-themes** (tema claro/escuro), **sonner** (toasts), **framer-motion** e **lucide-react**
- **ESLint** para lint

---

## ✅ Pré-requisitos

- Node.js 20+
- npm
- [`api-nimbus`](../api-nimbus) rodando (por padrão em `http://localhost:3000`)

---

## 🚀 Como rodar

```bash
# 1. instalar dependências
npm ci

# 2. criar o arquivo de ambiente
cp .env.example .env
# edite o .env e defina VITE_API_URL

# 3. subir o servidor de desenvolvimento
npm run dev
```

O Vite exibe no terminal a URL local (normalmente `http://localhost:5173`).

> A API usa cookies `httpOnly` para autenticação. Se o front e a API rodarem em origens diferentes, o CORS da API precisa permitir a origem do front com credenciais.

---

## ⚙️ Variáveis de ambiente

| Variável       | Descrição                                       | Exemplo                 |
| -------------- | ----------------------------------------------- | ----------------------- |
| `VITE_API_URL` | URL base da API consumida pelo front (obrigatória) | `http://localhost:3000` |

Variáveis `VITE_*` são embutidas no bundle em tempo de build. Nunca coloque segredos nelas.

---

## 📜 Scripts

| Comando               | O que faz                                                         |
| --------------------- | ----------------------------------------------------------------- |
| `npm run dev`         | Servidor de desenvolvimento com HMR                               |
| `npm run build`       | Checa tipos (`tsc -b`) e gera o build no `outDir` do `vite.config` |
| `npm run build:local` | Checa tipos e gera o build em `./build`                           |
| `npm run lint`        | Executa o ESLint                                                  |
| `npm run preview`     | Serve o build gerado para conferência local                       |

---

## 🗺️ Rotas

| Rota               | Acesso    | Página                       |
| ------------------ | --------- | ---------------------------- |
| `/`                | —         | Redireciona para `/home` ou `/login`, conforme a sessão |
| `/login`           | Pública   | Login                        |
| `/login/email`     | Pública   | Login com e-mail             |
| `/register`        | Pública   | Cadastro                     |
| `/forgot-password` | Pública   | Solicitar recuperação de senha |
| `/reset-password`  | Pública   | Redefinir senha              |
| `/home`            | Protegida | Listagem de projetos         |
| `/project`         | Protegida | Criar projeto                |
| `/project/:id`     | Protegida | Editar projeto               |
| `/account`         | Protegida | Perfil da conta              |
| `/not-found`       | Pública   | Página 404 (rotas desconhecidas redirecionam para cá) |

As rotas protegidas usam o componente `Private` (`src/app/appRoutes.tsx`), que consulta o `AuthContext` e redireciona para `/login` quando não há sessão.

---

## 📁 Estrutura

```
src/
├── api/          # instância do Axios (baseURL = VITE_API_URL)
├── app/          # App e definição de rotas
├── components/   # componentes de UI (ui/ = shadcn), layout, sidebar, tema
├── contexts/     # AuthContext (estado de autenticação)
├── errors/       # AppError
├── hooks/        # useAuth, use-mobile, etc.
├── interfaces/   # tipos TypeScript (IUser, IProject, ITag, ...)
├── lib/          # utilitários (cn, cookies, token)
├── pages/        # uma pasta por tela (login, register, tasks, account, ...)
├── providers/    # hooks de localStorage/sessionStorage
└── services/     # hooks de acesso à API (auth, user, profile, project, tag, password)
```

O alias `@/` aponta para `src/` (configurado em `vite.config.ts` e `tsconfig.app.json`):

```ts
import api from "@/api/api";
```

### Adicionando componentes shadcn

A configuração está em `components.json`:

```bash
npx shadcn@latest add <componente>
```

---

## 🐳 Docker

O `Dockerfile` usa build em duas etapas: compila com Node 20 e serve os arquivos estáticos com **nginx**.

```bash
docker build --build-arg VITE_API_URL=http://localhost:3000 -t nimbus-frontend .
docker run --rm -p 8080:80 nimbus-frontend
```

`VITE_API_URL` precisa ser passada como `--build-arg`, pois é resolvida em tempo de build.

---

## 🔄 CI/CD

O workflow `.github/workflows/ci-cd.yml` roda em PRs e pushes para `main`:

1. **CI**: `npm ci`, `npm run lint`, `npx tsc -b` e `npm run build:local`
2. **Deploy** (somente em push na `main`, ambiente `production`): gera o build com `VITE_API_URL` vinda das variáveis do GitHub e envia `build/` ao servidor via `rsync` por SSH

Configuração necessária no GitHub:

- **Variables**: `SSH_USER`, `SSH_HOST`, `DEPLOY_PATH`, `VITE_API_URL`
- **Secrets**: `SSH_PRIVATE_KEY`
