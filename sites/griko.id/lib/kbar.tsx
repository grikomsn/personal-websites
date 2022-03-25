import * as React from "react";

import meta from "@/config/meta.json";

import trimHttp from "@packages/utils/trim-http.cjs";
import { KBarProvider, useKBar, VisualState } from "kbar";
import * as Lucide from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const KBar = dynamic(() => import("@/ui/kbar"));

const ICON_SIZE = 16;

const parents = {
  extras: "extras",
  multiverse: "multiverse",
};

const sections = {
  navigation: "Navigation",
  socials: "Socials",
  other: "Other",
};

function KBarActions() {
  const kbar = useKBar();
  const router = useRouter();

  React.useEffect(() => {
    // navigation actions
    kbar.query.registerActions([
      {
        id: "navigate-home",
        name: "Home",
        shortcut: "gh".split(""),
        keywords: "back home",
        section: sections.navigation,
        perform: () => router.push("/"),
        icon: <Lucide.Home size={ICON_SIZE} />,
      },
      {
        id: "navigate-about",
        name: "About",
        shortcut: "gm".split(""),
        keywords: "about me",
        section: sections.navigation,
        perform: () => router.push("/about"),
        icon: <Lucide.Navigation size={ICON_SIZE} />,
      },
      // {
      //   id: "navigate-projects",
      //   name: "Projects",
      //   shortcut: "gp".split(""),
      //   keywords: "creations projects works",
      //   section: sections.navigation,
      //   perform: () => router.push("/projects"),
      //   icon: <Lucide.Axe size={ICON_SIZE} />,
      // },
      {
        id: "navigate-blog",
        name: "Writings",
        shortcut: "gw".split(""),
        keywords: "blog posts blog",
        section: sections.navigation,
        perform: () => router.push("/blog"),
        icon: <Lucide.Pencil size={ICON_SIZE} />,
      },
      {
        id: "navigate-timeline",
        name: "Timeline",
        shortcut: "gt".split(""),
        keywords: "timeline",
        section: sections.navigation,
        perform: () => window.open(meta.links.Polywork, "_blank"),
        icon: <Lucide.Activity size={ICON_SIZE} />,
      },
    ]);

    // socials actions
    kbar.query.registerActions([
      {
        id: "socials-email",
        name: "Email",
        subtitle: meta.email,
        keywords: "socials email",
        section: sections.socials,
        perform: () => window.open(meta.links.Email),
        icon: <Lucide.Mail size={ICON_SIZE} />,
      },
      {
        id: "socials-github",
        name: "GitHub",
        subtitle: trimHttp(meta.links.GitHub),
        keywords: "socials github",
        section: sections.socials,
        perform: () => window.open(meta.links.GitHub, "_blank"),
        icon: <Lucide.Github size={ICON_SIZE} />,
      },
      {
        id: "socials-twitter",
        name: "Twitter",
        subtitle: trimHttp(meta.links.Twitter),
        keywords: "socials twitter",
        section: sections.socials,
        perform: () => window.open(meta.links.Twitter, "_blank"),
        icon: <Lucide.Twitter size={ICON_SIZE} />,
      },
    ]);

    // other actions
    kbar.query.registerActions([
      {
        id: parents.extras,
        name: "Extras",
        section: sections.other,
        icon: <Lucide.Wand size={ICON_SIZE} />,
      },
      {
        id: "navigate-kitchen-sink",
        name: "Kitchen Sink",
        keywords: "kitchen sink",
        perform: () => router.push("/kitchen-sink"),
        icon: <Lucide.Sprout size={ICON_SIZE} />,
        parent: "extras",
      },
      {
        id: parents.multiverse,
        name: "Multiverse",
        icon: <Lucide.Globe size={ICON_SIZE} />,
        parent: parents.extras,
      },
      {
        id: "navigate-og-playground",
        name: "OpenGraph Playground",
        keywords: "open graph playground",
        perform: () => router.push("/_/opengraph"),
        icon: <Lucide.Camera size={ICON_SIZE} />,
        parent: "extras",
      },
      {
        id: "navigate-thanks",
        name: "Thanks!",
        keywords: "thank you",
        perform: () => router.push("/thanks"),
        icon: <Lucide.HandMetal size={ICON_SIZE} />,
        parent: "extras",
      },
      {
        id: "navigate-time",
        name: "Time",
        perform: () => router.push("/time"),
        icon: <Lucide.Clock size={ICON_SIZE} />,
        parent: "extras",
      },
      {
        id: "navigate-uses",
        name: "/uses",
        perform: () => router.push("/uses"),
        icon: <Lucide.HelpCircle size={ICON_SIZE} />,
        parent: "extras",
      },
    ]);

    // multiverse actions
    kbar.query.registerActions(
      Object.entries(meta.multiverse).map(([k, v]) => ({
        id: `multiverse-${k}`,
        name: `Multiverse ${k}`,
        perform: () => window.open(v, "_blank"),
        icon: <Lucide.Globe size={ICON_SIZE} />,
        parent: "multiverse",
      })),
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

function KBarSubscriptions() {
  const kbar = useKBar((state) => state);

  React.useEffect(() => {
    if (kbar.visualState == VisualState.showing) {
      // trackCommandBar();
    }
  }, [kbar.visualState]);

  return null;
}

export function KBarAppProvider({ children }: React.PropsWithChildren<{}>) {
  return (
    <KBarProvider actions={[]}>
      <KBarActions />
      <KBarSubscriptions />
      <KBar />
      {children}
    </KBarProvider>
  );
}
