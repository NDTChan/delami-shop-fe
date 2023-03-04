import {
  Anchor,
  Button,
  Checkbox,
  Container,
  createStyles,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { ActionArgs, json, LoaderArgs } from "@remix-run/node";
import { useActionData, useSubmit } from "@remix-run/react";
import { IconAlertTriangle } from "@tabler/icons";
import _ from "lodash";
import { badRequest } from "~/utils/request.server";
import { createUserSession, login } from "~/utils/session.server";

const useStyles = createStyles((theme) => ({
  invalid: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors.red[8], 0.15)
        : theme.colors.red[0],
  },

  icon: {
    color: theme.colors.red[theme.colorScheme === "dark" ? 7 : 6],
  },
}));

export const loader = async ({ request }: LoaderArgs) => {
  return json({});
};

function validateUrl(url: string) {
  let urls = ["/"];
  if (urls.includes(url)) {
    return url;
  }
  return "/";
}

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const input = _.toString(form.get("input"));
  const password = _.toString(form.get("password"));
  const redirectTo = validateUrl(form.get("redirectTo")?.toString() || "/");

  const user = await login({ input, password });
  if (!user) {
    return badRequest({
      formError: `Thông tin đăng nhập/ mật khẩu không chính xác`,
    });
  }
  return createUserSession(user.id, redirectTo);
};

export default function Login() {
  const { classes } = useStyles();
  const actionData = useActionData<typeof action>();
  const formatEmailOrMobile =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  const form = useForm({
    initialValues: { input: "", password: "" },

    validate: {
      input: (value) => {
        if (_.isEmpty(value)) {
          return "Bạn phải nhập mật khẩu";
        }

        if (!formatEmailOrMobile.test(value)) {
          return "Không đúng định dạng số điện thoại hay email";
        }

        if (!_.isEmpty(actionData?.formError)) {
          return actionData?.formError;
        }
      },
      password: (value) => (_.isEmpty(value) ? "Bạn phải nhập mật khẩu" : null),
    },
  });

  const submit = useSubmit();
  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor<"a">
          href="#"
          size="sm"
          onClick={(event) => event.preventDefault()}
        >
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form
          onSubmit={form.onSubmit((values) =>
            submit(values, {
              method: "post",
              replace: true,
            })
          )}
        >
          <TextInput
            label="Email hoặc số điện thoại"
            placeholder="Nhập email hoặc số điện thoại"
            {...form.getInputProps("input")}
            error={actionData?.formError}
            rightSection={
              !_.isEmpty(form.errors.input) ? (
                <IconAlertTriangle
                  stroke={1.5}
                  size="1.1rem"
                  className={classes.icon}
                />
              ) : null
            }
          />
          <PasswordInput
            name="password"
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            {...form.getInputProps("password")}
            mt="md"
          />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" sx={{ lineHeight: 1 }} />
            <Anchor<"a">
              onClick={(event) => event.preventDefault()}
              href="#"
              size="sm"
            >
              Forgot password?
            </Anchor>
          </Group>
          <Button type="submit" fullWidth mt="xl">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
