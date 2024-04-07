import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  editContact,
  editStatusContact,
} from "../services/contactsServices.js";

export const getAllContacts = async (_, res) => {
  const contacts = await listContacts();

  res.status(200).json(contacts);
};

export const getOneContact = async (req, res) => {
  const contactBiId = await getContactById(req);

  return res.status(200).json(contactBiId);
};

export const deleteContact = async (req, res) => {
  const removedContact = await removeContact(req);

  return res.status(200).json(removedContact);
};

export const createContact = async (req, res) => {
  const createContact = await addContact(req);

  res.status(201).json(createContact);
};

export const updateContact = async (req, res) => {
  const updateContact = await editContact(req);

  res.status(200).json(updateContact);
};

export const updateStatusContact = async (req, res) => {
  const favoriteContact = await editStatusContact(req);

  res.status(200).json(favoriteContact);
};
