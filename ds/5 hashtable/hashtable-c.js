// declaration
class HashTable {
    constructor() {
      this.table = [];
    }
  
    // Basic hash function to generate an index from a key
    hash(key) {
      let hash = 0;
      for (let i = 0; i < key.length; i++) {
        hash += key.charCodeAt(i);
      }
      return hash % this.table.length;
    }
  
    // Insert a key-value pair into the hash table
    insert(key, value) {
      const index = this.hash(key);
      if (!this.table[index]) {
        this.table[index] = [];
      }
      this.table[index].push({ key, value });
    }
  
    // Retrieve the value for a given key
    get(key) {
      const index = this.hash(key);
      if (this.table[index]) {
        for (const pair of this.table[index]) {
          if (pair.key === key) {
            return pair.value;
          }
        }
      }
      return undefined; // Key not found
    }
  
    // Remove a key-value pair from the hash table
    remove(key) {
      const index = this.hash(key);
      if (this.table[index]) {
        this.table[index] = this.table[index].filter(pair => pair.key !== key);
      }
    }
  }
  
  // Example usage
  const myHashTable = new HashTable();
  
  myHashTable.insert("name", "John");
  myHashTable.insert("age", 25);
  myHashTable.insert("city", "New York");
  
  console.log(myHashTable.get("name")); // Output: John
  console.log(myHashTable.get("age"));  // Output: 25
  console.log(myHashTable.get("city")); // Output: New York
  
  myHashTable.remove("age");
  console.log(myHashTable.get("age"));  // Output: undefined (removed)
  
