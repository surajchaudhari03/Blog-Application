import React, { useState } from 'react';
import { databases } from '../../services/AppwriteService';
import conf from '../../services/conf';

const styles = {
  label: 'block text-sm font-medium',
  input: 'outline-none mt-1 block w-full p-2 border rounded-md',
  button: 'w-full bg-black hover:bg-gray-800 text-white p-2 rounded-md'
}

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [query, setQuery] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const queryData = { name, email, query };
      await databases.createDocument(conf.appwriteDatabaseId, conf.QueriesCollectionId, 'unique()', queryData);
      alert('Your query has been submitted!');
      setName('');
      setEmail('');
      setQuery('');
    } catch (error) {
      console.error('Error submitting query:', error);
    }
  };

  return (
    <>
      <div className="max-w-lg mx-auto p-6 bg-card rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
        <p className="text-sm mb-6">If you have any queries, please fill out the form below and we will get back to you as soon as possible.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label for="name" className={styles.label}><span className='text-red-500'>*</span> Name</label>
            <input
              type="text"
              id="name"
              value={name}
              placeholder="Your Name"
              onChange={(e) => setName(e.target.value)}
              className={styles.input} required />
          </div>
          <div className="mb-4">
            <label for="email" className={styles.label}><span className='text-red-500'>*</span> Email</label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Your Email"
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input} required />
          </div>
          <div className="mb-4">
            <label for="query" className={styles.label}><span className='text-red-500'>*</span> Message</label>
            <textarea
              id="query"
              value={query}
              placeholder="Write your message..."
              onChange={(e) => setQuery(e.target.value)}
              className={styles.input} required></textarea>
          </div>
          <button type="submit" className={styles.button}>Submit</button>
        </form>
      </div>
    </>
  );
};

export default ContactPage;