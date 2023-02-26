import { ColorScheme, ColorSchemeProvider, createEmotionCache, MantineProvider } from '@mantine/core';
import { StylesPlaceholder } from '@mantine/remix';
import { MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { useState } from 'react';
import { SpotlightAction, SpotlightProvider } from '@mantine/spotlight';
import { SpotlightProductAction } from './components/common/spotlight-product-action';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
});

export enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

createEmotionCache({ key: 'mantine' });

const actions: SpotlightAction[] = [
  {
    image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
    title: 'Bender Bending Rodríguez',
    description: 'Fascinated with cooking, though has no sense of taste',
    new: true,
    onTrigger: () => {},
  },

  {
    image: 'https://img.icons8.com/clouds/256/000000/futurama-mom.png',
    title: 'Carol Miller',
    description: 'One of the richest people on Earth',
    new: false,
    onTrigger: () => {},
  },
  {
    image: 'https://img.icons8.com/clouds/256/000000/homer-simpson.png',
    title: 'Homer Simpson',
    description: 'Overweight, lazy, and often ignorant',
    new: false,
    onTrigger: () => {},
  },
  {
    image: 'https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png',
    title: 'Spongebob Squarepants',
    description: 'Not just a sponge',
    new: false,
    onTrigger: () => {},
  },
];

export default function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(Theme.LIGHT);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === Theme.DARK ? Theme.LIGHT : Theme.DARK));
  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <SpotlightProvider
          actionComponent={SpotlightProductAction}
          shortcut={['mod + P', 'mod + K', '/']}
          searchPlaceholder="Search..."
          highlightQuery={true}
          actions={actions}>
          <html lang="en">
            <head>
              <StylesPlaceholder />
              <Meta />
              <Links />
            </head>
            <body>
              <Outlet />
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