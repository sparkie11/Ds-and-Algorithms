

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}
 
function push(head_ref, new_data) {
    // Create a new node
    const new_node = new Node(new_data);
 
    // Make the new node point to the current head
    new_node.next = head_ref[0];
 
    // Update the head to point to the new node
    head_ref[0] = new_node;
}
 
function append(head_ref, new_data) {
    // Create a new node
    const new_node = new Node(new_data);
 
    // Store the head reference in a temporary variable
    let last = head_ref[0];
 
    // Set the next pointer of the new node as null since it
    // will be the last node
    new_node.next = null;
 
    // If the Linked List is empty, make the new node as the
    // head and return
    if (head_ref[0] === null) {
        head_ref[0] = new_node;
        return;
    }
 
    // Else traverse till the last node
    while (last.next !== null) {
        last = last.next;
    }
 
    // Change the next pointer of the last node to point to
    // the new node
    last.next = new_node;
}
 
function printList(node) {
    while (node !== null) {
        console.log(" " + node.data);
        node = node.next;
    }
}
 
// Driver code
function main() {
    // Start with an empty list
    const head = [null];
 
    // Insert nodes at the beginning of the linked list
    push(head, 6);
    push(head, 5);
    push(head, 4);
    push(head, 3);
    push(head, 2);
 
    console.log("Created Linked list is:");
    printList(head[0]);
 
    // Insert 1 at the end
    append(head, 1);
 
    console.log("\nAfter inserting 1 at the end:");
    printList(head[0]);
}
 
main();