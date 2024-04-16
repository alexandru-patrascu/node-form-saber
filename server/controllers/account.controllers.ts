import fs from "fs";
import * as yup from "yup";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { IAccount, accountSchema } from "../models/account.modules";

const dataFilePath = "data.json";

class AccountController {
  // Create a new account
  createAccount = async (req: Request, res: Response) => {
    try {
      await accountSchema.validate(req.body, { abortEarly: false });
      fs.writeFileSync(dataFilePath, JSON.stringify(req.body));

      res.status(StatusCodes.CREATED).json({ account: req.body });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: error.errors.join(", ") });
      }
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
  };

  // Get a single account
  getAccount = (req: Request, res: Response) => {
    try {
      if (!fs.existsSync(dataFilePath)) {
        return res
          .status(StatusCodes.OK)
          .json({ message: "No file data", account: null });
      }

      const data = fs.readFileSync(dataFilePath, "utf8");
      const accountData: IAccount = JSON.parse(data);

      return res.status(StatusCodes.OK).json({ account: accountData });
    } catch (error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: "Error reading file", error });
    }
  };

  // Update an account
  updateAccount = async (req: Request, res: Response) => {
    try {
      const data = fs.readFileSync(dataFilePath, "utf8");
      const accountData: IAccount = JSON.parse(data);

      const updatedAccount: IAccount = { ...accountData, ...req.body };

      await accountSchema.validate(updatedAccount, { abortEarly: false });

      fs.writeFileSync(dataFilePath, JSON.stringify(updatedAccount));

      res.status(StatusCodes.OK).json({ account: updatedAccount });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: error.errors.join(", ") });
      }
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    }
  };
}

export const accountController = new AccountController();
