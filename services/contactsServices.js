import { promises as fs } from "fs";
import { v4 } from 'uuid';
import path from "path";

const { readFile, writeFile } = fs;

const contactsPath = path.join("db", "contacts.json");

export async function listContacts() {
  const data = await readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

export async function getContactById(contactId) {
  const contact = await listContacts();
  const result = contact.find((item) => item.id === contactId);
  return result || null;
}

export async function addContact(name, email, phone) {
  const contacts = await listContacts();

  const newContacts = {
    id: v4(),
    name,
    email,
    phone,
  };
  contacts.push(newContacts);
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContacts;
}

export async function editContact(name, email, phone, id) {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === id);

  if (name) {
    contact.name = name;
  }
  if (email) {
    contact.email = email;
  }
  if (phone) {
    contact.phone = country;
  }

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contact;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}
