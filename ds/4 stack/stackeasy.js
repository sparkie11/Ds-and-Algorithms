// Traversy Media stack  data structure | javascript

class Stack {
    constructor() {
        this.items = []
        this.count = 0

    }

    push(element){
        this.items[this.count] = element
        console.log(`${element} added to ${this.count}`)
        this.count += 1
        return this.count - 1 
    }

    pop() {
        if(this.count == 0) return undefined
        let deleteItem  = this.items[this.count -1]
        this.count -= 1
        console.log(`${deleteItem} removed`)
        return deleteItem
        
    }

    peek() {
        console.log(`top element is ${this.items[this.count - 1]}`)
        return this.items[this.count - 1]
    }

    isEmpty() {
        console.log(this.count == 0 ? 'Stack is empty' : 'no' )
        return this.count == 0  
    }

    isSize() {
        console.log(`count ${this.count}`)
        return this.count
    }

    print() {
        let str = ''
        for(let i=0;i < this.count; i++ ){
            str += this.items[i] + '' 
        }
        return str
    }

    clear() {
        this.item=[]
        this.count=0
        console.log('stack cleared')
        return this.items
    }
}

const stack = new Stack()

stack.push(100)
stack.push(200)
stack.push(300)

stack.pop()

