const fs = require("fs/promises");
const { v4: uuidv4 } = require('uuid');


const contactsPath = "./contacts.json";

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  return data.find((contact) => contact.id === contactId);
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const filteredContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  const jsonData = JSON.stringify(filteredContacts, null, 2);
  await fs.writeFile(contactsPath, jsonData);
  return console.log(`Contact with id ${contactId} has been remove`);
};

const addContact = async ({name, email, phone}) => {
  const contactId = uuidv4();
  const newContact = { id: contactId, name, email, phone };

  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
