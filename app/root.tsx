import {
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  createEmotionCache,
  MantineProvider,
} from "@mantine/core";

import { StylesPlaceholder } from "@mantine/remix";
import { SpotlightAction, SpotlightProvider } from "@mantine/spotlight";
import type { LoaderArgs } from "@remix-run/node";
import { json, MetaFunction } from "@remix-run/node";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
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
import { SpotlightProductAction } from "./components/common/spotlight-product-action";
import { HeaderAction } from "./components/header";
import { getUser } from "./utils/session.server";
import _ from "lodash";
import { category, users } from "@prisma/client";
import { getMainCategory } from "./servers/category/category.service";

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

type LoaderData = {
  actions: SpotlightAction[];
  links: {
    link: string;
    label: string;
    links?: { link: string; label: string }[];
  }[];
  user?: users;
  category?: category;
};
export async function loader({ request }: LoaderArgs) {
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
  const user = (await getUser(request)) as users;

  const category = (await getMainCategory()) as category;

  let data: LoaderData = { actions, links, user, category };
  return typedjson(data);
}

export default function App() {
  const data = useTypedLoaderData<typeof loader>() as LoaderData;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(Theme.LIGHT);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(
      value || (colorScheme === Theme.DARK ? Theme.LIGHT : Theme.DARK)
    );
  console.log("category", data.category);
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
                styles={(theme) => ({
                  main: {
                    background:
                      colorScheme === "dark"
                        ? theme.colors.dark[8]
                        : theme.colors.gray[0],
                  },
                })}
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
