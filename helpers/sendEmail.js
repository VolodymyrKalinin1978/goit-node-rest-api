import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const { MAILTRAP_HOST, MAILTRAP_PORT, MAILTRAP_USER, MAILTRAP_PASS } =
  process.env;

const nodemailerConfig = {
  host: MAILTRAP_HOST,
  port: MAILTRAP_PORT,
  secure: true,
  auth: {
    user: MAILTRAP_USER,
    pass: MAILTRAP_PASS,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

export const sendEmail = async (data) => {
  try {
    const email = { ...data, from: "volodymyrkalinin1978@ukr.net" };
    await transport.sendMail(email);
  } catch (error) {
    console.log(error.message);
  }
};
