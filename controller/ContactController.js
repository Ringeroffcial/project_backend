import Contact from '../model/Contact.js';

export const addEmergencyContacts = async (req, res) => {
  try {
    const { contacts } = req.body;
    const userId = req.user._id; 

    if (!contacts || !Array.isArray(contacts) || contacts.length < 2) {
      return res.status(400).json({ message: 'Please provide at least 2 contacts.' });
    }

    for (const contact of contacts) {
      if (!contact.name || !contact.phone) {
        return res.status(400).json({ message: 'Each contact must have a name and phone number.' });
      }
      if (contact.phone.length !== 10) {
        return res.status(400).json({ message: 'Phone number must be 10 digits long.' });
      }
    }

    const contactDocs = contacts.map(contact => ({
      firstName: contact.name,
      phoneNumber: contact.phone,
      userId,
    }));

    await Contact.insertMany(contactDocs);

    res.status(201).json({ message: 'Contacts saved successfully' });
  } catch (error) {
    console.error('Error saving contacts:', error);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
};
