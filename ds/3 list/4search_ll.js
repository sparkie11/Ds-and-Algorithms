                      n                                          n                                    v                                                                                                                                                                                                                                                  v                                                                                                                                                                                                                                                                                    v                     c                                                                                                                                                                                                                                                                                                                                                                                                              
class LinkedList {    
    // ... (previous code) 
  
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
  }
  
 
