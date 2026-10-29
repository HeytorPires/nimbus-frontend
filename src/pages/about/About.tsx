import React from "react";
import { Link } from "react-router-dom";
import {
  FileLock2,
  FolderKanban,
  Tags,
  UserRound,
  ShieldCheck,
  Mail,
  Github,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";

const features = [
  {
    icon: FileLock2,
    title: ".env storage",
    description:
      "Save the environment variables (.env) of each project in one place instead of scattering files across chats and machines.",
  },
  {
    icon: ShieldCheck,
    title: "Encrypted at rest",
    description:
      "Variables are encrypted with AES and a unique IV per record before reaching the database. Authentication uses JWT in httpOnly cookies with refresh token.",
  },
  {
    icon: FolderKanban,
    title: "Projects",
    description:
      "One project per application, with title, description and its variables. The list is paginated and only the owner can see it.",
  },
  {
    icon: Tags,
    title: "Tags",
    description:
      "Label projects (for example by environment or team) to find the right .env faster.",
  },
  {
    icon: UserRound,
    title: "Profile",
    description: "Update your data, avatar and password whenever you want.",
  },
  {
    icon: Mail,
    title: "Password recovery",
    description: "Forgot your password? Receive a reset link by e-mail.",
  },
];

const frontendStack = [
  "React 19",
  "TypeScript",
  "Vite",
  "Tailwind CSS",
  "shadcn/ui",
  "React Router",
];

const backendStack = [
  "Node.js",
  "Express",
  "TypeORM",
  "PostgreSQL",
  "Redis",
  "Swagger",
];

const About: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-12">
      <section className="flex flex-col gap-3 text-center">
        <h1 className="text-4xl font-bold">About Nimbus</h1>
        <p className="text-lg text-muted-foreground">Your .envs made easier</p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold">What is Nimbus?</h2>
        <p className="text-muted-foreground">
          Nimbus is a manager for your .env files. Create a project for each
          application, store its environment variables encrypted and keep them
          organized with tags. It was built as a study project, with a REST API
          following DDD on the backend and a React single page application on
          the frontend.
        </p>
      </section>

      <Separator />

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Features</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <Card key={title}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon className="size-5" />
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {description}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Tech stack</h2>
        <div className="flex flex-col gap-2">
          <h3 className="font-medium">Frontend</h3>
          <div className="flex flex-wrap gap-2">
            {frontendStack.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-medium">Backend</h3>
          <div className="flex flex-wrap gap-2">
            {backendStack.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      <section className="flex flex-col items-center gap-3 text-center">
        <h2 className="text-2xl font-semibold">Source code</h2>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <a
            href="https://github.com/HeytorPires/nimbus-frontend"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 hover:underline"
          >
            <Github className="size-4" /> nimbus-frontend
          </a>
        </div>
        <Link
          to={isAuthenticated ? "/home" : "/"}
          className="text-sm text-muted-foreground hover:underline"
        >
          Back to home page
        </Link>
      </section>
    </div>
  );
};

export default About;
