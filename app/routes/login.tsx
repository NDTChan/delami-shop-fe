import {
  Anchor,
  Button,
  Checkbox,
  Container,
  createStyles,
  Group,
  LoadingOverlay,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { ActionArgs, json, LoaderArgs } from "@remix-run/node";
import {
  Link,
  useActionData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { IconAlertTriangle } from "@tabler/icons";
import _ from "lodash";
import { REGEX_COMBINE_EMAIL_VS_VN_PHONE } from "~/constants/regex.const";
import { login } from "~/servers/auth/auth.service";
import { badRequest } from "~/utils/request.server";
import { createUserSession } from "~/utils/session.server";

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
  return createUserSession(_.toString(user.id), redirectTo);
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
          return "Bạn phải nhập email hoặc số điện thoại";
        }

        if (!REGEX_COMBINE_EMAIL_VS_VN_PHONE.test(value)) {
          return "Không đúng định dạng số điện thoại hay email";
        }
      },
      password: (value) => (_.isEmpty(value) ? "Bạn phải nhập mật khẩu" : null),
    },
  });

  const submit = useSubmit();
  const navigation = useNavigation();
  return (
    <Container size={420} my={40}>
      <LoadingOverlay
        visible={_.isEqual(navigation.state, "submitting")}
        overlayBlur={2}
      />
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Chào mừng quý khách
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Chưa có tài khoản?{" "}
        <Anchor size="sm" component={Link} to="/auth/register">
          Đăng ký
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
            autoFocus={true}
            label="Email hoặc số điện thoại"
            placeholder="Nhập email hoặc số điện thoại"
            {...form.getInputProps("input")}
            error={actionData?.formError ?? form.errors.input}
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
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            {...form.getInputProps("password")}
            mt="md"
          />
          <Group position="apart" mt="lg">
            <Checkbox label="Ghi nhớ" sx={{ lineHeight: 1 }} />
            <Anchor<"a">
              onClick={(event) => event.preventDefault()}
              href="#"
              size="sm"
            >
              Quên mật khẩu?
            </Anchor>
          </Group>
          <Button type="submit" fullWidth mt="xl">
            Đăng nhập
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
