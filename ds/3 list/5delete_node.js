   class LinkedList {
    // ... (previous code)
  
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
  }
  