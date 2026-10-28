import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 w-full border-t bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 py-4 text-sm text-muted-foreground sm:flex-row">
        <p>
          <span className="font-semibold text-foreground">Nimbus</span> · Your
          .envs made easier
        </p>
        <nav className="flex items-center gap-4">
          <Link to="/about" className="hover:text-foreground">
            About
          </Link>
          <a
            href="https://github.com/HeytorPires/nimbus-frontend"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            GitHub
          </a>
        </nav>
        <p>© {new Date().getFullYear()} Nimbus</p>
      </div>
    </footer>
  );
};

export default Footer;
