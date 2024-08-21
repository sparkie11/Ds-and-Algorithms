                         // initialization starts

class LinkedList {
    // ... (previous code)
  
    display() {
      let current = this.head;
      while (current) {
        console.log(current.data);
        current = current.next;
      }
    }
  }
  
