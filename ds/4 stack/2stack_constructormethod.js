                            / / declaration    begins
class Stack {
    constructor() {
        this.storage = [];
    }

    push(value) {
        this.storage.push(value);
    }

    pop() {
        return this.storage.pop();
    }

    size() {
        return this.storage.length;
    }

    peek() {
        return this.storage[this.storage.length - 1];
    }
}

const myStack = new Stack();
myStack.push(1);
myStack.push(2);

console.log(myStack.peek());
console.log(myStack.pop());
console.log(myStack.peek());
