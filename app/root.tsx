import {
  Affix,
  AppShell,
  Button,
  ColorScheme,
  ColorSchemeProvider,
  createEmotionCache,
  MantineProvider,
  rem,
  Transition,
} from "@mantine/core";

import { useWindowScroll } from "@mantine/hooks";
import { StylesPlaceholder } from "@mantine/remix";
import { SpotlightAction, SpotlightProvider } from "@mantine/spotlight";
import { users } from "@prisma/client";
import type { LoaderArgs } from "@remix-run/node";
import { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { useState } from "react";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { HeaderAction } from "./components/header";
import { SpotlightProductAction } from "./components/header/spotlight-product-action";
import { CategoryMain } from "./interfaces/category";
import { getMainCategory } from "./servers/category/category.service";
import { getUser } from "./utils/session.server";
import { IconArrowUp } from "@tabler/icons-react";

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
  user: users;
  category: CategoryMain;
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
  const user = (await getUser(request)) as users;
  const category = (await getMainCategory()) as CategoryMain;

  let data: LoaderData = { actions, user, category };
  return typedjson(data);
}

export default function App() {
  const data = useTypedLoaderData<typeof loader>() as LoaderData;
  const [scroll, scrollTo] = useWindowScroll();
  const [colorScheme, setColorScheme] = useState<ColorScheme>(Theme.LIGHT);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(
      value || (colorScheme === Theme.DARK ? Theme.LIGHT : Theme.DARK)
    );
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
                // styles={(theme) => ({
                //   main: {
                //     background:
                //       colorScheme === "dark"
                //         ? theme.colors.dark[8]
                //         : theme.colors.gray[0],
                //   },
                // })}
                header={
                  <HeaderAction category={data.category} user={data.user} />
                }
              >
                <Outlet />
                <Affix position={{ bottom: rem(20), right: rem(20) }}>
                  <Transition transition="slide-up" mounted={scroll.y > 0}>
                    {(transitionStyles) => (
                      <Button
                        leftIcon={<IconArrowUp size="1rem" />}
                        style={transitionStyles}
                        onClick={() => scrollTo({ y: 0 })}
                      >
                        Scroll to top
                      </Button>
                    )}
                  </Transition>
                </Affix>
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
