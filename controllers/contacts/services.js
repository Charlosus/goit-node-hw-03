const Contact = require("../../models/contact");

const fetchContacts = () => {
  return Contact.find();
};

const fetchContact = (id) => {
  return Contact.findById({ _id: id });
};
const createContact = ({ name, email, phone }) => {
  return Contact.create({ name, email, phone });
};

const updateContact = ({
  id,
  dataToUpdate,
  upsert = false,
  replace = false,
}) => {
  if (replace) {
    return Contact.findOneAndReplace({ _id: id }, dataToUpdate, {
      new: true,
      upsert,
      runValidators: true,
    });
  }
  return Contact.findByIdAndUpdate(
    id,
    { $set: dataToUpdate },
    { new: true, runValidators: true, strict: "throw", upsert }
  );
};
const removeContact = (id) => Contact.deleteOne({ _id: id });

module.exports = {
  fetchContacts,
  fetchContact,
  createContact,
  updateContact,
  removeContact,
};
