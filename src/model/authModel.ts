import mongoose, { Schema, Document } from "mongoose";
import { isEmail } from "validator";
import bcrypt from "bcrypt";

export interface IAccount extends Document {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  password: string;
}

interface AccountModel extends mongoose.Model<IAccount> {
  login(email: string, password: string): Promise<IAccount>;
}

const accountSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: [true, "Please enter your first name."],
  },
  lastName: {
    type: String,
    required: [true, "Please enter your last name."],
  },
  middleName: {
    type: String,
    required: [true, "Please enter your middle name."],
  },
  email: {
    type: String,
    required: [true, "Please enter your email."],
    unique: true,
    validate: [isEmail, "Please enter a valid email."],
  },
  password: {
    type: String,
    required: [true, "Please enter you password."],
    minlength: [8, "Your password must have atleast 8 characters."],
  },
});

accountSchema.pre<IAccount>("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

accountSchema.statics.login = async function (email: string, password: string) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("passwords dont match");
  }
  throw Error("email is not registered");
};

export const Account = mongoose.model<IAccount, AccountModel>(
  "account",
  accountSchema,
  "user_account"
);
