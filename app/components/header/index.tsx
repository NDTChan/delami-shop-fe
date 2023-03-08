import {
  ActionIcon,
  Burger,
  Button,
  Center,
  Container,
  createStyles,
  Drawer,
  Group,
  Header,
  Indicator,
  MediaQuery,
  Menu,
  Switch,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { openSpotlight } from "@mantine/spotlight";
import {
  IconChevronDown,
  IconMoonStars,
  IconSearch,
  IconShoppingCart,
  IconSun,
  IconUser,
} from "@tabler/icons";
import { Theme } from "~/root";
import { DelamiLogo } from "../logo";
import { NavbarComponent } from "../navbar";
import { UserMenu } from "./user-menu";
import { users } from "@prisma/client";
import _ from "lodash";
import { Link } from "@remix-run/react";

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("md")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.md,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },

  user: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    },

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

type LoaderData = {
  links: {
    link: string;
    label: string;
    links?: { link: string; label: string }[];
  }[];
  user?: users;
};

export function HeaderAction({ links, user }: LoaderData) {
  const { classes, theme, cx } = useStyles();

  const [opened, { toggle, close }] = useDisclosure(false);

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          transitionProps={{ transition: "rotate-right", duration: 150 }}
        >
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
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
          <Drawer
            opened={opened}
            onClose={toggle}
            title="Menu"
            padding="xl"
            size="300px"
            position="left"
            overlayProps={{
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[9]
                  : theme.colors.gray[2],
              opacity: 0.55,
              blur: 3,
            }}
          >
            <NavbarComponent />
          </Drawer>

          <DelamiLogo color={colorScheme} />

          <MediaQuery smallerThan={"md"} styles={{ display: "none" }}>
            <Switch
              checked={colorScheme === Theme.DARK}
              onChange={() => toggleColorScheme()}
              size="lg"
              onLabel={<IconSun color={theme.white} size={20} stroke={1.5} />}
              offLabel={
                <IconMoonStars
                  color={theme.colors.gray[6]}
                  size={20}
                  stroke={1.5}
                />
              }
            />
          </MediaQuery>
        </Group>
        <Group spacing={20} className={classes.links}>
          {items}
        </Group>

        <Group position="center" my={"xl"} mr={"xl"}>
          <ActionIcon color={"dark"} size="lg" variant="transparent">
            <IconSearch onClick={() => openSpotlight()} size={27} />
          </ActionIcon>

          {_.isNull(user) ? (
            <ActionIcon
              component={Link}
              color={"dark"}
              size="lg"
              variant="transparent"
              to={"/login"}
            >
              <IconUser size={27} />
            </ActionIcon>
          ) : (
            <UserMenu user={user} />
          )}

          <Indicator label={1} inline size={18}>
            <ActionIcon color={"dark"} size="lg" variant="transparent">
              <IconShoppingCart size={27} />
            </ActionIcon>
          </Indicator>
        </Group>
      </Container>
    </Header>
  );
}
