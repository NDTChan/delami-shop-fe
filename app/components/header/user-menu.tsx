import {
  Avatar,
  Group,
  MediaQuery,
  Menu,
  Text,
  UnstyledButton,
  createStyles,
} from "@mantine/core";
import { users } from "@prisma/client";
import { Link, useSubmit } from "@remix-run/react";
import {
  IconChevronDown,
  IconHeart,
  IconLogout,
  IconMessage,
  IconPlayerPause,
  IconSettings,
  IconStar,
  IconSwitchHorizontal,
  IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";
const useStyles = createStyles((theme) => ({
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

  userActive: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },
}));

type LoaderData = {
  user: users;
};
export function UserMenu({ user }: LoaderData) {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { classes, theme, cx } = useStyles();
  const submit = useSubmit();
  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: "pop-top-right" }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
    >
      <Menu.Target>
        <UnstyledButton
          className={cx(classes.user, {
            [classes.userActive]: userMenuOpened,
          })}
        >
          <Group spacing={7}>
            <Avatar
              src={user.image}
              alt={user.fullName ?? ''}
              radius="xl"
              size={40}
            />
            <MediaQuery smallerThan={"lg"} styles={{ display: "none" }}>
              <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                {user.fullName}
              </Text>
            </MediaQuery>
            <IconChevronDown size={12} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          icon={
            <IconHeart size={14} color={theme.colors.red[6]} stroke={1.5} />
          }
        >
          Liked posts
        </Menu.Item>
        <Menu.Item
          icon={
            <IconStar size={14} color={theme.colors.yellow[6]} stroke={1.5} />
          }
        >
          Saved posts
        </Menu.Item>
        <Menu.Item
          icon={
            <IconMessage size={14} color={theme.colors.blue[6]} stroke={1.5} />
          }
        >
          Your comments
        </Menu.Item>

        <Menu.Label>Settings</Menu.Label>
        <Menu.Item icon={<IconSettings size={14} stroke={1.5} />}>
          Account settings
        </Menu.Item>
        <Menu.Item icon={<IconSwitchHorizontal size={14} stroke={1.5} />}>
          Change account
        </Menu.Item>
        <Menu.Item
          onClick={() =>
            submit(null, {
              method: "post",
              action: "/action/logout",
              replace: true,
            })
          }
          icon={<IconLogout size={14} stroke={1.5} />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
