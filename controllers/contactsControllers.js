import HttpError from "../helpers/HttpError.js";
import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  editContact,
  editStatusContact,
} from "../services/contactsServices.js";

export const createContact = async (req, res) =>
  res.status(201).json(await addContact(req));

export const getAllContacts = async (req, res) =>
  res.status(200).json(await listContacts(req));

export const getOneContact = async (req, res, next) => {
  const result = await getContactById(req, next);
  if (result === null || result === undefined) {
    return next(HttpError(404));
  }

  return res.status(200).json(result);
};

export const updateContact = async (req, res, next) => {
  const result = await editContact(req);
  if (result === null || result === undefined) {
    return next(HttpError(404));
  }
  res.status(200).json(result);
};

export const updateStatusContact = async (req, res, next) => {
  const result = await editStatusContact(req);
  if (result === null || result === undefined) {
    return next(HttpError(404));
  }
  res.status(200).json(result);
};

export const deleteContact = async (req, res, next) => {
  const result = await removeContact(req);
  if (result === null || result === undefined) {
    return next(HttpError(404));
  }
  return res.status(200).json(result);

  
};
