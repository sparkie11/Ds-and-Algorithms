// 9mediumexample_singlelinkedlist_with_insertion_method1


class Node {
    constructor(val) {
        this.value = val;
        this.next = null;
    }
}

class SingleLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;

    }

    push(val) {
        const newNode = new Node(val);
        if(!this.head){
            this.head = newNode;
            this.tail = newNode;
        }else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.length++;
        return this;
    }

    pop()
}


const list = new SingleLinkedList();
list.push(1);
list.push(2);
