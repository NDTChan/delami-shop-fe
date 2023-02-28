import {
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  createEmotionCache,
  MantineProvider,
  useMantineTheme,
} from "@mantine/core";
import { StylesPlaceholder } from "@mantine/remix";
import { json, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { useState } from "react";
import { SpotlightAction, SpotlightProvider } from "@mantine/spotlight";
import { SpotlightProductAction } from "./components/common/spotlight-product-action";
import { HeaderAction } from "./components/header/header";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

createEmotionCache({ key: "mantine" });

import type { LoaderArgs } from "@remix-run/node";
type LoaderData = {
  actions: SpotlightAction[];
  links: {
    link: string;
    label: string;
    links?: { link: string; label: string }[];
  }[];
  user: { name: string; image: string };
};
export async function loader(args: LoaderArgs) {
  const actions = [
    {
      image: "https://img.icons8.com/clouds/256/000000/futurama-bender.png",
      title: "Bender Bending Rodríguez",
      description: "Fascinated with cooking, though has no sense of taste",
      new: true,
      onTrigger: () => {},
    },

    {
      image: "https://img.icons8.com/clouds/256/000000/futurama-mom.png",
      title: "Carol Miller",
      description: "One of the richest people on Earth",
      new: false,
      onTrigger: () => {},
    },
    {
      image: "https://img.icons8.com/clouds/256/000000/homer-simpson.png",
      title: "Homer Simpson",
      description: "Overweight, lazy, and often ignorant",
      new: false,
      onTrigger: () => {},
    },
    {
      image:
        "https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png",
      title: "Spongebob Squarepants",
      description: "Not just a sponge",
      new: false,
      onTrigger: () => {},
    },
  ];
  const links = [
    {
      link: "/features",
      label: "Features",
    },
    {
      link: "#1",
      label: "Learn",
      links: [
        {
          link: "/docs",
          label: "Documentation",
        },
        {
          link: "/resources",
          label: "Resources",
        },
        {
          link: "/community",
          label: "Community",
        },
        {
          link: "/blog",
          label: "Blog",
        },
      ],
    },
    {
      link: "/about",
      label: "About",
    },
    {
      link: "/pricing",
      label: "Pricing",
    },
    {
      link: "#2",
      label: "Support",
      links: [
        {
          link: "/faq",
          label: "FAQ",
        },
        {
          link: "/demo",
          label: "Book a demo",
        },
        {
          link: "/forums",
          label: "Forums",
        },
      ],
    },
  ];
  const user = {
    name: "Jane Spoonfighter",
    email: "janspoon@fighter.dev",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80",
  };
  let data: LoaderData = { actions, links, user };
  return json(data);
}

export default function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(Theme.LIGHT);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(
      value || (colorScheme === Theme.DARK ? Theme.LIGHT : Theme.DARK)
    );
  const theme = useMantineTheme();
  const data = useLoaderData<typeof loader>() as LoaderData;
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <SpotlightProvider
          actionComponent={SpotlightProductAction}
          shortcut={["mod + P", "mod + K", "/"]}
          searchPlaceholder="Search..."
          highlightQuery={true}
          actions={data.actions}
        >
          <html lang="en">
            <head>
              <StylesPlaceholder />
              <Meta />
              <Links />
            </head>
            <body>
              <AppShell
                layout="alt"
                styles={{
                  main: {
                    background:
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[8]
                        : theme.colors.gray[0],
                  },
                }}
                header={<HeaderAction links={data.links} user={data.user} />}
              >
                <Outlet />
              </AppShell>
              <ScrollRestoration />
              <Scripts />
              <LiveReload />
            </body>
          </html>
        </SpotlightProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
