import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  editContact,
} from "../services/contactsServices.js";

export const getAllContacts = async (_, res) => {
  const contacts = await listContacts();

  res.status(200).json(contacts);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id);

  return res.status(200).json(contact);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const removedContact = await removeContact(id);

  return res.status(200).json(removedContact);
};

export const createContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const contact = await addContact(name, email, phone);

  res.status(201).json(contact);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const contact = await editContact(name, email, phone, id);

  res.status(200).json(contact);
};
