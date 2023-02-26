import {
  AppShell, Aside, Footer, MediaQuery, Navbar, Text, useMantineTheme
} from '@mantine/core';
import { useState } from 'react';
import { HeaderAction, HeaderActionProps } from '~/components/header/header';

import type { LoaderArgs } from "@remix-run/node";
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { NavbarComponent } from '~/components/navbar/navbar';

export async function loader(args: LoaderArgs) {
  const links = [
    {
      "link": "/features",
      "label": "Features"
    },
    {
      "link": "#1",
      "label": "Learn",
      "links": [
        {
          "link": "/docs",
          "label": "Documentation"
        },
        {
          "link": "/resources",
          "label": "Resources"
        },
        {
          "link": "/community",
          "label": "Community"
        },
        {
          "link": "/blog",
          "label": "Blog"
        }
      ]
    },
    {
      "link": "/about",
      "label": "About"
    },
    {
      "link": "/pricing",
      "label": "Pricing"
    },
    {
      "link": "#2",
      "label": "Support",
      "links": [
        {
          "link": "/faq",
          "label": "FAQ"
        },
        {
          "link": "/demo",
          "label": "Book a demo"
        },
        {
          "link": "/forums",
          "label": "Forums"
        }
      ]
    }
  ];
  const user = {
    "name": "Jane Spoonfighter",
    "email": "janspoon@fighter.dev",
    "image": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
  };
  return json({ links, user });
};

export default function AppShellDemo() {
  const theme = useMantineTheme();
  const { links, user } = useLoaderData<typeof loader>() as HeaderActionProps;
  return (
    <AppShell
      layout='alt'
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}

      header={<HeaderAction links={links} user={user} />}
    >
      <Text>Resize app to see responsive navbar in action</Text>
    </AppShell>
  );
}