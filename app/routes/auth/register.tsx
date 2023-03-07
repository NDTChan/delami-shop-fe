import {
  Button,
  Container,
  createStyles,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { ActionArgs, redirect } from "@remix-run/node";
import { useActionData, useSubmit } from "@remix-run/react";
import {
  IconAlertTriangle,
  IconAt,
  IconPassword,
  IconPhone,
} from "@tabler/icons";
import _ from "lodash";
import {
  REGEX_EMAIL,
  REGEX_VN_FULLNAME,
  REGEX_VN_PHONE,
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

function removeAscent(str: string) {
  if (str === null || str === undefined) return str;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  return str;
}

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

        if (!REGEX_VN_PHONE.test(value)) {
          return "Không đúng định dạng số điện thoại";
        }
      },
      password: (value) => (_.isEmpty(value) ? "Bạn phải nhập mật khẩu" : null),
      fullName: (value) => {
        if (_.isEmpty(value)) {
          return "Bạn phải nhập họ và tên";
        }

        if (!REGEX_VN_FULLNAME.test(value)) {
          return "Bạn phải nhập chữ tiếng việt";
        }
      },
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
