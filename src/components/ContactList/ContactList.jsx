import { useSelector } from 'react-redux';

import Contact from '../Contact/Contact';

import { selectFilteredContacts } from '../../redux/contactsSlice';

import styles from './ContactList.module.css';

const ContactList = () => {
  const foundContacts = useSelector(selectFilteredContacts);

  return (
    <ul className={styles.list}>
      {Array.isArray(foundContacts) &&
        foundContacts.map((contact) => (
          <Contact
            key={contact.id}
            userName={contact.name}
            userPhone={contact.number}
            userId={contact.id}
          />
        ))}
    </ul>
  );
};

export default ContactList;