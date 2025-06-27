const {
  fetchContacts,
  fetchContact,
  createContact,
  updateContact,
  removeContact,
} = require("./services");

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await fetchContacts();
    res.json(contacts);
  } catch (err) {
    next(err);
  }
};

const getContact = async (req, res, next) => {
  try {
    const contact = await fetchContact(req.params.id);
    if (contact) {
      res.json(contact);
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const initiateContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    const result = await createContact({ name, email, phone });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const patchContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await updateContact({ id, dataToUpdate: req.body });
    if (!result) {
      next();
    } else {
      res.json(result);
    }
  } catch (error) {
    next(error);
  }
};

const putContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await updateContact({
      id,
      dataToUpdate: req.body,
      upsert: true,
      replace: true,
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
};
const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    await removeContact(id);
    res.status(204).send({ message: "Contact deleted" });
  } catch (err) {
    next(err);
  }
};

const patchFavorite = async (req, res, next) => {
  const { id } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  try {
    const result = await updateContact({ id, dataToUpdate: { favorite } });
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContact,
  initiateContact,
  patchContact,
  putContact,
  deleteContact,
  patchFavorite
};
