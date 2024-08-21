import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // Open a connection to the database
  const db = await openDB('jate', 1);

  // Start a new transaction to write to the 'jate' object store
  const tx = db.transaction('jate', 'readwrite');

  // access the 'jate' object store
  const store = tx.objectStore('jate');

  // Put the content into the object store
  const request = store.put({content});

  // wait for the transaction to complete
  const result = await request;
  console.log('data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // open a connection to the database
  const db = await openDB('jate', 1);

  // start a new transaction to read from the 'jate' object store
  const tx = db.transaction('jate', 'readonly');

  // access the 'jate' object store
  const store = tx.objectStore('jate');

  // get all records from the object store
  const request = store.getAll();

  // wait for the transaction to complete
  const result = await request;
  console.log('data retrieved from the database', result);

  return result;
}

initdb();
