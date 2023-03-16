import { createStyles, Drawer, getStylesRef, rem } from "@mantine/core";
import { users } from "@prisma/client";
import { Link, useSubmit } from "@remix-run/react";
import { IconLogin, IconLogout, IconRegistered } from "@tabler/icons-react";
import _ from "lodash";
import { LinksGroup } from "~/components/header/drawer/link-group";
import { DelamiLogo } from "~/components/logo";
import { CategoryMain } from "~/interfaces/category";
import { UserButton } from "./user-button";

const useStyles = createStyles((theme) => ({
  section: {
    "&:not(:last-of-type)": {
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
    },
  },
  links: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingTop: theme.spacing.md,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },
}));

export function DrawerComponent({
  user,
  opened,
  toggle,
  category,
}: {
  user: users;
  opened: boolean;
  toggle: () => void;
  category: CategoryMain;
}) {
  const { classes, theme } = useStyles();
  const submit = useSubmit();
  const links = category.children.map((item) => (
    <LinksGroup {...item} key={item.title} />
  ));
  return (
    <Drawer.Root
      opened={opened}
      onClose={toggle}
      title="Menu"
      padding="xl"
      size={350}
      position="left"
    >
      <Drawer.Overlay
        color={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        opacity={0.55}
        blur={3}
      />
      <Drawer.Content>
        <Drawer.Header className={classes.section}>
          <Drawer.Title>
            {!_.isNull(user) ? (
              <UserButton
                image={user.image ?? "./images/avatar.jpg"}
                name={user.fullName ?? ""}
                email={user.email ?? ""}
              />
            ) : (
              <Link to={"/"} onClick={toggle}>
                <DelamiLogo color={theme.colorScheme} />
              </Link>
            )}
          </Drawer.Title>
          <Drawer.CloseButton />
        </Drawer.Header>
        <Drawer.Body>
          <div className={classes.links}>
            <div className={classes.linksInner}>{links}</div>
          </div>
          {!_.isNull(user) ? (
            <div className={classes.footer}>
              <a
                className={classes.link}
                onClick={() => {
                  submit(null, {
                    method: "post",
                    action: "/action/logout",
                    replace: true,
                  });
                  toggle();
                }}
              >
                <IconLogout className={classes.linkIcon} stroke={1.5} />
                <span>Đăng xuất</span>
              </a>
            </div>
          ) : (
            <div className={classes.footer}>
              <Link className={classes.link} to={"/login"} onClick={toggle}>
                <IconLogin className={classes.linkIcon} stroke={1.5} />
                <span>Đăng nhập</span>
              </Link>
              <Link
                className={classes.link}
                to={"/auth/register"}
                onClick={toggle}
              >
                <IconRegistered className={classes.linkIcon} stroke={1.5} />
                <span>Đăng ký</span>
              </Link>
            </div>
          )}
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}
