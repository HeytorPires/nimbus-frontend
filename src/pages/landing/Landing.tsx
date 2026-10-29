import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CloudRain,
  FileLock2,
  FolderKanban,
  Mail,
  ShieldCheck,
  Tags,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { CloudSky } from "@/components/landing/CloudSky";
import { EnvVault } from "@/components/landing/EnvVault";

const features = [
  {
    icon: FileLock2,
    title: ".env storage",
    description:
      "One place for the variables of every project, instead of files scattered across chats and machines.",
  },
  {
    icon: ShieldCheck,
    title: "Encrypted at rest",
    description:
      "AES with a unique IV per record. Auth with JWT in httpOnly cookies and refresh token.",
  },
  {
    icon: FolderKanban,
    title: "Projects",
    description:
      "One project per application, with title, description and variables. Only the owner sees it.",
  },
  {
    icon: Tags,
    title: "Tags",
    description:
      "Label projects by environment or team and find the right .env in seconds.",
  },
  {
    icon: UserRound,
    title: "Profile",
    description: "Update your data, avatar and password whenever you want.",
  },
  {
    icon: Mail,
    title: "Password recovery",
    description: "Forgot your password? Get a reset link by e-mail.",
  },
];

const steps = [
  {
    title: "Create a project",
    description: "Give it a name, a description and (optionally) a tag.",
  },
  {
    title: "Paste your .env",
    description: "We encrypt every variable before it touches the database.",
  },
  {
    title: "Copy it anywhere",
    description: "New machine, new teammate, new deploy: one click to copy.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

const Landing = () => {
  const [raining, setRaining] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <div className="w-full">
      <header className="absolute inset-x-0 top-0 z-20 mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <span className="text-xl font-extrabold tracking-tight ">
          Nimbus
        </span>
        <nav className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link to="/about">About</Link>
          </Button>
          <ThemeSwitch />
        </nav>
      </header>
      {/* Hero */}
      <section className="relative flex min-h-[92svh] w-full flex-col items-center justify-center overflow-hidden bg-linear-to-b from-muted to-background px-4 pb-16 pt-24 text-center sm:px-6 sm:py-24">
        <CloudSky raining={raining} />

        <div className="relative z-10 flex w-full flex-col items-center gap-5 sm:gap-6">
          <motion.span
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider sm:px-4 sm:text-xs sm:tracking-widest text-muted-foreground backdrop-blur"
          >
            <span className="size-2 animate-pulse rounded-full bg-foreground" />
            your .envs made easier
          </motion.span>

          <h1
            className="cursor-pointer select-none text-[clamp(3.75rem,20vw,11rem)] font-extrabold leading-none tracking-tighter text-foreground"
            aria-label="Nimbus"
            onClick={() => setRaining((v) => !v)}
          >
            {Array.from("Nimbus").map((letter, i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                className="inline-block"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, type: "spring", stiffness: 140 }}
                whileHover={{ y: -16, rotate: -4 }}
              >
                {letter}
              </motion.span>
            ))}
          </h1>

          <p className="max-w-md text-lg text-muted-foreground sm:text-xl">
            Light as a cloud. Your secrets stay{" "}
            <span className="font-semibold text-foreground">locked in the sky.</span>
          </p>

          <div className="flex w-full max-w-xs flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
            {isAuthenticated ? (
              <Button size="lg" asChild>
                <Link to="/home">
                  Open Nimbus <ArrowRight />
                </Link>
              </Button>
            ) : (
              <>
                <Button size="lg" asChild>
                  <Link to="/register">
                    Get started <ArrowRight />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/login">Sign in</Link>
                </Button>
              </>
            )}
            <Button
              size="lg"
              variant="ghost"
              className="cursor-pointer"
              aria-pressed={raining}
              onClick={() => setRaining((v) => !v)}
            >
              <CloudRain /> {raining ? "Stop the rain" : "Make it rain .envs"}
            </Button>
          </div>

          <div className="mt-4 flex w-full justify-center sm:mt-6">
            <EnvVault />
          </div>

          <p className="font-mono text-xs text-muted-foreground">
            <span className="hidden sm:inline">
              tip: move your mouse to blow the clouds ·{" "}
            </span>
            <span className="sm:hidden">tip: </span>
            click the title to make it rain
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-14 sm:gap-10 sm:px-6 sm:py-20">
        <div className="flex flex-col gap-3 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            what's inside the cloud
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything your .env needs
          </h2>
        </div>
        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.08 }}
        >
          {features.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <Card className="h-full">
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
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* How it works */}
      <section className="mx-auto flex max-w-5xl flex-col gap-8 px-4 pb-14 sm:gap-10 sm:px-6 sm:pb-20">
        <div className="flex flex-col gap-3 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            flight plan
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            From the ground to the cloud in 3 steps
          </h2>
        </div>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.12 }}
              className="flex flex-col gap-2 rounded-xl border bg-card p-6"
            >
              <span className="font-mono text-5xl font-bold text-muted-foreground/40">
                0{i + 1}
              </span>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-foreground px-5 py-12 text-center sm:px-6 sm:py-16 text-background shadow-xl"
        >
          <CloudSky tone="inverse" />
          <div className="relative z-10 flex flex-col items-center gap-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready for clear skies?
            </h2>
            <p className="max-w-md opacity-80">
              Create your account in seconds and move your secrets out of the
              chat history.
            </p>
            <Button size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90" asChild>
              <Link to={isAuthenticated ? "/home" : "/register"}>
                {isAuthenticated ? "Open Nimbus" : "Create free account"}{" "}
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Landing;
