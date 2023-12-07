class Node {
    constructor(val) {
        this.value =val;
        this.next = null ;
    }
}

const one = new Node(1);
one.next = new Node(2);
one.next.next = new Node(3);
one.next.next.next = new Node(4);
one.next.next.next.next = new Node(4);



