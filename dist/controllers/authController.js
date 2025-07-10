"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logIn = exports.signUp = void 0;
const authModel_1 = require("../model/authModel");
// Error handling remains the same
const handleErrors = (error) => __awaiter(void 0, void 0, void 0, function* () {
    let errors = {
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
        Object.values(error.errors).forEach((error) => {
            const { properties } = error;
            errors[properties.path] = properties.message;
        });
    }
    return errors;
});
// Updated signUp
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, middleName, lastName, email, password } = req.body;
        const newAccount = new authModel_1.Account({
            firstName,
            middleName,
            lastName,
            email,
            password,
        });
        yield newAccount.save();
        // Send plain object version
        res.status(201).json({ user: newAccount.toObject() });
    }
    catch (error) {
        const errors = yield handleErrors(error);
        res.status(400).json({ errors });
    }
});
exports.signUp = signUp;
// Updated logIn
const logIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const account = yield authModel_1.Account.login(email, password);
        // Send plain object version
        res.status(200).json({ account: account.toObject() });
    }
    catch (error) {
        const errors = yield handleErrors(error);
        res.status(400).json({ errors });
    }
});
exports.logIn = logIn;
