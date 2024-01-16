class Node {
    constructor(data) {
      this.data = data;
      this.next = null;
    }
  }
  
  class LinkedList {
    constructor() {
      this.head = null;
    }
  
    // Add a node to the end of the linked list
    addNode(data) {
      const newNode = new Node(data);
  
      if (!this.head) {
        this.head = newNode;
      } else {
        let current = this.head;
        while (current.next) {
          current = current.next;
        }
        current.next = newNode;
      }
    }
  
    // Display all nodes in the linked list
    display() {
      let current = this.head;
      while (current) {
        console.log(current.data);
        current = current.next;
      }
    }
  
    // Search for a specific fruit in the linked list
    search(data) {
      let current = this.head;
      while (current) {
        if (current.data === data) {
          return true;
        }
        current = current.next;
      }
      return false;
    }
  
    // Delete a node with a specific fruit from the linked list
    deleteNode(data) {
      if (!this.head) {
        return;
      }
  
      if (this.head.data === data) {
        this.head = this.head.next;
        return;
      }
  
      let current = this.head;
      let prev = null;
  
      while (current && current.data !== data) {
        prev = current;
        current = current.next;
      }
  
      if (!current) {
        return;
      }
  
      prev.next = current.next;
    }
  
    // Reverse the linked list
    reverse() {
      let prev = null;
      let current = this.head;
      let next = null;
  
      while (current) {
        next = current.next;
        current.next = prev;
        prev = current;
        current = next; 
      }
  
      this.head = prev;
    }
  }
  
  // Example usage:
  const fruitsList = new LinkedList();
  
  fruitsList.addNode('Apple');
  fruitsList.addNode('Banana');
  fruitsList.addNode('Cherry');
  fruitsList.addNode('Date');
  
  console.log('Original Linked List:');
  fruitsList.display();
  
  console.log('\nSearch for Banana:', fruitsList.search('Banana'));
  
  fruitsList.deleteNode('Cherry');
  console.log('\nLinked List after deleting Cherry:');
  fruitsList.display();
  
  console.log('\nReverse Linked List:');
  fruitsList.reverse();
  fruitsList.display();
  