export interface Account {
  accountType: "advanced" | "manual";
  email: string;
  password: string;
  serverAddress: string;
  serverPath: string;
  serverPort: number | null;
  useSSL: boolean;
  createdAt: Date;
}
