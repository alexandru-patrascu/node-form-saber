import express from "express";
import { accountController } from "../controllers/account.controllers";

const router = express.Router();

// Create a new account
router.post("/account", accountController.createAccount);

// Get a single account
router.get("/account", accountController.getAccount);

// Update an account
router.patch("/account", accountController.updateAccount);

export default router;
