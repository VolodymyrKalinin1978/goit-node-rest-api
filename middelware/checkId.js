import HttpError from "../helpers/HttpError.js";
import { listContacts } from "../services/contactsServices.js";

export const checkId = async (req, _, next) => {
  const { id } = req.params;
  const contact = await listContacts();
  const result = contact.find((item) => item.id === id);

  if (result !== undefined) {
    return next();
  }
  next(HttpError(404));
};
