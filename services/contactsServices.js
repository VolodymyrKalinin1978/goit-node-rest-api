import { Contacts } from "../models/contactModel.js";


export const listContacts = async () => Contacts.find();

export const getContactById = async (req) => Contacts.findById(req.params.id);

export const addContact = async (req) => Contacts.create(req.body);

export const editContact = async (req) => Contacts
.findByIdAndUpdate(req.params.id, req.body, { new: true });

export const editStatusContact = async (req) => Contacts
.findByIdAndUpdate(req.params.id, req.body, { new: true });
 

export const removeContact = async (req) => Contacts.findByIdAndDelete(req.params.id);
  
 