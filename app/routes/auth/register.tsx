import {
  Button,
  Container,
  createStyles,
  LoadingOverlay,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { ActionArgs, redirect } from "@remix-run/node";
import { useActionData, useNavigation, useSubmit } from "@remix-run/react";
import {
  IconAlertTriangle,
  IconAt,
  IconPassword,
  IconPhone,
} from "@tabler/icons";
import _ from "lodash";
import {
  REGEX_EMAIL
} from "~/constants/regex.const";
import { getUserByEmail, getUserByMobile } from "~/servers/auth/auth.data";
import { register } from "~/servers/auth/auth.service";
import { badRequest } from "~/utils/request.server";

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

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const email = _.toString(form.get("email"));
  const mobile = _.toString(form.get("mobile"));
  const fullName = _.toString(form.get("fullName"));
  const password = _.toString(form.get("password"));

  const fields = { email, mobile, fullName, password };

  const userByEmail = await getUserByEmail(email);

  if (!_.isNull(userByEmail)) {
    return badRequest({
      formError: { email: `Email đã được đăng ký, vui lòng kiểm tra lại` },
    });
  }

  const userByMobile = await getUserByMobile(mobile);

  if (!_.isNull(userByMobile)) {
    return badRequest({
      formError: {
        mobile: `Số điện thoại đã được đăng ký, vui lòng kiểm tra lại`,
      },
    });
  }

  await register(fields);

  return redirect("/");
};

export default function Login() {
  const { classes } = useStyles();
  const actionData = useActionData<{
    formError: { mobile: string; email: string };
  }>();
  const form = useForm({
    initialValues: { email: "", mobile: "", password: "", fullName: "" },
    validate: {
      email: (value) => {
        if (_.isEmpty(value)) {
          return "Bạn phải nhập email";
        }

        if (!REGEX_EMAIL.test(value)) {
          return "Không đúng định dạng email";
        }
      },
      mobile: (value) => {
        if (_.isEmpty(value)) {
          return "Bạn phải nhập số điện thoại";
        }
        
        if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(value)) {
          return "Không đúng định dạng số điện thoại";
        }
      },
      password: (value) => (_.isEmpty(value) ? "Bạn phải nhập mật khẩu" : null),
      fullName: (value) => {
        if (_.isEmpty(value)) {
          return "Bạn phải nhập họ và tên";
        }
      },
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
        ĐĂNG KÝ THÀNH VIÊN
      </Title>

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
            label="Email của bạn"
            placeholder="Email"
            {...form.getInputProps("email")}
            error={actionData?.formError?.email ?? form.errors.email}
            icon={<IconAt size="0.8rem" />}
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
          <TextInput
            label="Điện thoại"
            placeholder="Số điện thoại"
            {...form.getInputProps("mobile")}
            error={actionData?.formError?.mobile ?? form.errors.mobile}
            icon={<IconPhone size="0.8rem" />}
            rightSection={
              !_.isEmpty(form.errors.input) ? (
                <IconAlertTriangle
                  stroke={1.5}
                  size="1.1rem"
                  className={classes.icon}
                />
              ) : null
            }
            mt="md"
          />
          <PasswordInput
            name="password"
            label="Mật khẩu của bạn"
            placeholder="Mật khẩu"
            icon={<IconPassword size="0.8rem" />}
            {...form.getInputProps("password")}
            mt="md"
          />
          <TextInput
            label="Họ và tên"
            placeholder="Vui lòng nhập Tiếng Việt có dấu"
            {...form.getInputProps("fullName")}
            rightSection={
              !_.isEmpty(form.errors.input) ? (
                <IconAlertTriangle
                  stroke={1.5}
                  size="1.1rem"
                  className={classes.icon}
                />
              ) : null
            }
            mt="md"
          />
          <Button type="submit" fullWidth mt="xl">
            Đăng ký
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
