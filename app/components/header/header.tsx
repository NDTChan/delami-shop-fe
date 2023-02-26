import {
  ActionIcon,
  Autocomplete,
  Avatar, Box, Burger, Center, Container, createStyles, Drawer, Group, Header, Indicator, MediaQuery, Menu, NavLink, Paper, Switch, Text, Transition, UnstyledButton, useMantineColorScheme
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { openSpotlight, registerSpotlightActions, SpotlightAction, useSpotlight } from '@mantine/spotlight';
import { IconAdjustments, IconCalendarStats, IconChevronDown, IconFileAnalytics, IconFingerprint, IconGauge, IconHeart, IconLock, IconLogout, IconMessage, IconMoonStars, IconNotes, IconPlayerPause, IconPresentationAnalytics, IconSearch, IconSettings, IconShoppingCart, IconStar, IconSun, IconSwitchHorizontal, IconTrash } from '@tabler/icons';
import { useState } from 'react';
import { Theme } from '~/root';
import { DelamiLogo } from '../delami-logo';
import { NavbarLinksGroup } from '../navbar/link-group';
import { NavbarComponent } from '../navbar/navbar';

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('md')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.md,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },

  user: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },

    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  userActive: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

}));

export interface HeaderActionProps {
  links: { link: string; label: string; links: { link: string; label: string }[] }[];
  user: { name: string; image: string };
}

export function HeaderAction({ links, user }: HeaderActionProps) {
  const { classes, theme, cx } = useStyles();

  const [opened, { toggle, close }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" exitTransitionDuration={0}>
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={12} stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });

  return (
    <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }} mb={120}>
      <Container className={classes.inner} fluid>
        <Group>
          <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
          <Drawer
            opened={opened}
            onClose={toggle}
            title="Menu"
            padding="xl"
            size="300px"
            position='left'
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
          >
           <NavbarComponent/>

          </Drawer>
          {/* <Transition transition="slide-left" duration={200} mounted={opened}>
            {(styles) => (
              <NavbarComponent />
            )}
          </Transition> */}

          <DelamiLogo color={colorScheme} />

          <MediaQuery smallerThan={'md'} styles={{ display: 'none' }}>
            <Switch
              checked={colorScheme === Theme.DARK}
              onChange={() => toggleColorScheme()}
              size="lg"
              onLabel={<IconSun color={theme.white} size={20} stroke={1.5} />}
              offLabel={<IconMoonStars color={theme.colors.gray[6]} size={20} stroke={1.5} />}
            />
          </MediaQuery>

        </Group>
        <Group spacing={20} className={classes.links}>
          {items}
        </Group>
        <Group position='center' my={'xl'}>

          <ActionIcon color={'dark'} size="lg" variant="transparent">
            <IconSearch onClick={() => openSpotlight()} size={27} />
          </ActionIcon>

          <Menu
            width={260}
            position="bottom-end"
            transition="pop-top-right"
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
              >
                <Group spacing={7}>
                  <Avatar src={user.image} alt={user.name} radius="xl" size={30} />
                  {/* <MediaQuery smallerThan={'lg'} styles={{ display: 'none' }}>
                    <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                      {user.name}
                    </Text>
                  </MediaQuery> */}
                  <IconChevronDown size={12} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item icon={<IconHeart size={14} color={theme.colors.red[6]} stroke={1.5} />}>
                Liked posts
              </Menu.Item>
              <Menu.Item icon={<IconStar size={14} color={theme.colors.yellow[6]} stroke={1.5} />}>
                Saved posts
              </Menu.Item>
              <Menu.Item icon={<IconMessage size={14} color={theme.colors.blue[6]} stroke={1.5} />}>
                Your comments
              </Menu.Item>

              <Menu.Label>Settings</Menu.Label>
              <Menu.Item icon={<IconSettings size={14} stroke={1.5} />}>Account settings</Menu.Item>
              <Menu.Item icon={<IconSwitchHorizontal size={14} stroke={1.5} />}>
                Change account
              </Menu.Item>
              <Menu.Item icon={<IconLogout size={14} stroke={1.5} />}>Logout</Menu.Item>

              <Menu.Divider />

              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item icon={<IconPlayerPause size={14} stroke={1.5} />}>
                Pause subscription
              </Menu.Item>
              <Menu.Item color="red" icon={<IconTrash size={14} stroke={1.5} />}>
                Delete account
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          {/* <MediaQuery smallerThan={'lg'} styles={{ display: 'none' }}>
            <Autocomplete
              placeholder="Search"
              icon={<IconSearch size={16} stroke={1.5} />}
              data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
            />
          </MediaQuery> */}
          {/* <MediaQuery largerThan={'lg'} styles={{ display: 'none' }}>
            <ActionIcon color={'dark'} size="lg" variant="transparent">
              <IconSearch size={27} />
            </ActionIcon>
          </MediaQuery> */}

          <Indicator showZero={false} dot={false} label={1} inline size={18}>
            <ActionIcon color={'dark'} size="lg" variant="transparent">
              <IconShoppingCart size={27} />
            </ActionIcon>
          </Indicator>

        </Group>
      </Container>
    </Header>
  );
}