import {
  Box,
  Collapse,
  Group,
  Text,
  ThemeIcon,
  UnstyledButton,
  createStyles,
  rem,
} from "@mantine/core";
import * as icons from "@tabler/icons-react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import _ from "lodash";
import { useState } from "react";
import { CategoryMain } from "~/interfaces/category";

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: "block",
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  link: {
    fontWeight: 500,
    display: "block",
    textDecoration: "none",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    paddingLeft: rem(31),
    marginLeft: rem(30),
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    borderLeft: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  chevron: {
    transition: "transform 200ms ease",
  },
}));

export function LinksGroup({ icon, title, children, slug }: CategoryMain) {
  const { classes, theme } = useStyles();
  const hasLinks = _.isArray(children) && !_.isEmpty(children);
  const [opened, setOpened] = useState(false);
  const ChevronIcon = theme.dir === "ltr" ? IconChevronRight : IconChevronLeft;
  const items = (hasLinks ? children : []).map((link) => (
    <Text<"a">
      component="a"
      className={classes.link}
      href={link.slug}
      key={link.title}
      onClick={(event) => event.preventDefault()}
    >
      {link.title}
    </Text>
  ));

  // @ts-ignore
  const Icon: JSX.Element = icons[`Icon${icon}`];

  return (
    <>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        className={classes.control}
      >
        <Group position="apart" spacing={0}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ThemeIcon variant="light" size={30}>
              {/* @ts-ignore */}
              <Icon size="1.1rem" />
            </ThemeIcon>
            <Box ml="md">{title}</Box>
          </Box>
          {hasLinks && (
            <ChevronIcon
              className={classes.chevron}
              size="1rem"
              stroke={1.5}
              style={{
                transform: opened
                  ? `rotate(${theme.dir === "rtl" ? -90 : 90}deg)`
                  : "none",
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
