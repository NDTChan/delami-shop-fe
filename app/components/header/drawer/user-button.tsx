import {
  Avatar,
  Group,
  Text,
  UnstyledButton,
  UnstyledButtonProps,
  createStyles,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  user: {
    display: "block",
    width: "100%",
    padding: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
}));

interface UserButtonProps extends UnstyledButtonProps {
  image: string;
  name?: string;
  email?: string;
  icon?: React.ReactNode;
}

export function UserButton({ image, name, email, ...others }: UserButtonProps) {
  const { classes } = useStyles();

  return (
    <UnstyledButton className={classes.user} {...others}>
      <Group>
        <Avatar size="lg" src={image} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="md" weight={500}>
            {name}
          </Text>

          <Text color="dimmed" size="sm">
            {email}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  );
}
