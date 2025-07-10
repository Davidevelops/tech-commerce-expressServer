import { Request, Response } from "express";
import { Account } from "../model/authModel";

// Error handling remains the same
const handleErrors = async (error: any) => {
  let errors: { [key: string]: string } = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    middleName: "",
  };
  if (error.code === 11000) {
    errors.email = "email is already in use.";
  }
  if (error.message === "passwords dont match") {
    errors.password = "incorrect password";
  }
  if (error.message === "email is not registered") {
    errors.email = "email is not registered";
  }
  if (error.message.includes("account validation failed")) {
    Object.values(error.errors).forEach((error: any) => {
      const { properties } = error;
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

// Updated signUp
export const signUp = async (req: Request, res: Response) => {
  try {
    const { firstName, middleName, lastName, email, password } = req.body;
    const newAccount = new Account({
      firstName,
      middleName,
      lastName,
      email,
      password,
    });

    await newAccount.save();

    // Send plain object version
    res.status(201).json({ user: newAccount.toObject() });
  } catch (error) {
    const errors = await handleErrors(error);
    res.status(400).json({ errors });
  }
};

// Updated logIn
export const logIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const account = await Account.login(email, password);

    // Send plain object version
    res.status(200).json({ account: account.toObject() });
  } catch (error) {
    const errors = await handleErrors(error);
    res.status(400).json({ errors });
  }
};
