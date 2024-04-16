import { Account } from "types/account.type";

export const initialValues: Account = {
  accountType: "manual",
  email: "",
  password: "",
  serverAddress: "",
  serverPath: "",
  serverPort: 0,
  useSSL: false,
  createdAt: new Date(),
};
