import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  editContact,
} from "../services/contactsServices.js";

export const getAllContacts = async (_, res) => {
  const contacts = await listContacts();

  res.status(200).json({
    message: "success!",
    contacts,
  });
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id);

  return res.status(200).json({
    message: "success!",
    contact,
  });
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await removeContact(id);
  console.log(result);

  if (result !== null) {
    return res.status(200).json({
      message: "remove success!",
    });
  }
};

export const createContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const contact = await addContact(name, email, phone);

  res.status(201).json({
    message: "Created success!",
    contact,
  });
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const contact = await editContact(name, email, phone, id);

  res.status(200).json({
    message: "Update success!",
    contact,
  });
};
