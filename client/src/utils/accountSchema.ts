import * as yup from "yup";

const serverPathRegExp = /^[a-zA-Z0-9/]*$/;
const serverAddressRegExp =
  /^(?:(?:https?|ftp):\/\/)?[\w.-]+\.[a-zA-Z]{2,}(?:\/\S*)?$/;

const accountSchema = yup.object().shape({
  accountType: yup
    .string()
    .required("Account type is required.")
    .oneOf(
      ["advanced", "manual"],
      'Account type must be either "advanced" or "manual".'
    ),
  email: yup
    .string()
    .email("Invalid email address")
    .required("User Name is required"),
  password: yup.string().required("Password is required."),
  serverAddress: yup
    .string()
    .matches(serverAddressRegExp, "Invalid URL format"),
  serverPath: yup.string().matches(serverPathRegExp, {
    message: "Invalid server path format",
  }),
  serverPort: yup
    .number()
    .nullable()
    .test("is-valid-port", "Invalid port number", (value) => {
      return (
        value !== undefined &&
        value !== null &&
        !isNaN(value) &&
        value >= 0 &&
        value <= 65535
      );
    }),
  useSSL: yup.boolean(),
  createdAt: yup.date().default(() => new Date()),
});

export default accountSchema;
