import {
  ActionIcon,
  Burger,
  Center,
  Container,
  createStyles,
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
import { users } from "@prisma/client";
import { Link } from "@remix-run/react";
import {
  IconChevronDown,
  IconMoonStars,
  IconSearch,
  IconShoppingCart,
  IconSun,
  IconUser,
} from "@tabler/icons-react";
import _ from "lodash";
import { Theme } from "~/root";
import { DelamiLogo } from "../logo";
import { DrawerComponent } from "./drawer";
import { UserMenu } from "./user-menu";
import { CategoryMain } from "~/interfaces/category";

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
    textTransform: "uppercase",
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
  user: users;
  category: CategoryMain;
};

export function HeaderAction({ category, user }: LoaderData) {
  const { classes, theme } = useStyles();

  const [opened, { toggle }] = useDisclosure(false);

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const items = category?.children.map((cate: any) => {
    const menuItems = cate?.children.map((item: any) => (
      <Menu.Item style={{ textTransform: "uppercase" }} key={item.slug}>
        {item.title}
      </Menu.Item>
    ));
    if (menuItems) {
      return (
        <Menu
          key={cate.title}
          trigger="hover"
          transitionProps={{ transition: "rotate-right", duration: 150 }}
        >
          <Menu.Target>
            <a
              href={cate.slug}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{cate.title}</span>
                {!_.isEmpty(menuItems) ? (
                  <IconChevronDown size={12} stroke={1.5} />
                ) : null}
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={cate.content}
        href={cate.slug}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {cate.content}
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
          <DrawerComponent
            category={category}
            opened={opened}
            toggle={toggle}
            user={user}
          />
          <Link to={"/"}>
            <DelamiLogo color={colorScheme} />
          </Link>

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
            <MediaQuery smallerThan={"md"} styles={{ display: "none" }}>
              <ActionIcon
                component={Link}
                color={"dark"}
                size="lg"
                variant="transparent"
                to={"/login"}
              >
                <IconUser size={27} />
              </ActionIcon>
            </MediaQuery>
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
