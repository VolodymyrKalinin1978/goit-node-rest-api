import { Contacts } from "../models/contactModel.js";

export const listContacts = async (req) => {
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  const query = favorite
    ? { owner: req.user._id, favorite: true }
    : { owner: req.user._id };
  const totalContacts = await Contacts.countDocuments(query);
  const totalPages = Math.ceil(totalContacts / limit);
  const contacts = await Contacts.find(query)
    .select("-owner")
    .skip(skip)
    .limit(limit);
  if (totalContacts === 0) {
    return [];
  }
  return {
    totalContacts,
    pagination: {
      pages: parseInt(totalPages),
      perPage: parseInt(limit),
      currentPage: parseInt(page),
    },
    contacts,
  };
};

export const getContactById = async (req) => {
  const contacts = await Contacts.findById(req.params.id);
  if (
    !contacts ||
    !contacts.owner ||
    !req.user ||
    !contacts.owner.equals(req.user._id)
  ) {
    return undefined;
  }
  return contacts;
};
export const addContact = async (req) =>
  Contacts.create({ ...req.body, owner: req.user.id });

export const editContact = async (req) => {
  const contacts = await Contacts.findById(req.params.id);
  if (
    !contacts ||
    !contacts.owner ||
    !req.user ||
    !contacts.owner.equals(req.user._id)
  ) {
    return undefined;
  }
  return Contacts.findByIdAndUpdate(req.params.id, req.body, { new: true });
};

export const editStatusContact = async (req) => {
  const contacts = await Contacts.findById(req.params.id);
  if (
    !contacts ||
    !contacts.owner ||
    !req.user ||
    !contacts.owner.equals(req.user._id)
  ) {
    return undefined;
  }
  return Contacts.findByIdAndUpdate(req.params.id, req.body, { new: true });
};

export const removeContact = async (req) => {
  const contacts = await Contacts.findById(req.params.id);
  if (
    !contacts ||
    !contacts.owner ||
    !req.user ||
    !contacts.owner.equals(req.user._id)
  ) {
    return undefined;
  }
  return Contacts.findByIdAndDelete(req.params.id);
};
