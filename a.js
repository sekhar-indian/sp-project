// let id;
// let expenses;
// let discription;
// let options;
// document.getElementById('formdata').addEventListener('submit', function getData(event){
//  event.preventDefault();
//  expenses=document.getElementById('expenses').value;
//  discription=document.getElementById('discription').value;
//  options=document.getElementById('options').value;
//  id=document.getElementById('id').value;

//  const data = {
//     expenses: expenses,
//     description: discription,
//     options: options
// };

//  console.log(expenses,discription,options);
//  localStorage.setItem(id,JSON.stringify(data));


// })
// Retrieve the form and items container
const form = document.getElementById('formdata');
const itemsContainer = document.getElementById('items');

// Listen for form submission
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    const expenses = document.getElementById('expenses').value;
    const description = document.getElementById('discription').value;
    const option = document.getElementById('options').value;

    // Create an object to store the data
    const item = { expenses, description, option };

    // Retrieve existing items from local storage or initialize an empty array
    const items = JSON.parse(localStorage.getItem('items')) || [];

    // Add the new item to the array
    items.push(item);

    // Store the updated items array back in local storage
    localStorage.setItem('items', JSON.stringify(items));

    // Clear the form fields
    form.reset();

    // Render the items
    renderItems();
});

// Function to render items from local storage
function renderItems() {
    itemsContainer.innerHTML = ''; // Clear previous items

    // Retrieve items from local storage
    const items = JSON.parse(localStorage.getItem('items')) || [];

    // Loop through each item and display it
    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `Expenses: ${item.expenses}, Description: ${item.description}, Option: ${item.option}`;

        // Create edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', function() {
            // Implement edit functionality
            // For simplicity, you can populate the form fields with the item's data
            document.getElementById('expenses').value = item.expenses;
            document.getElementById('discription').value = item.description;
            document.getElementById('options').value = item.option;
            // You can remove the item from local storage or mark it for deletion upon submission
        });

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            // Remove the item from the items array
            items.splice(index, 1);
            // Update local storage
            localStorage.setItem('items', JSON.stringify(items));
            // Re-render items
            renderItems();
        });

        // Append buttons to list item
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        // Append list item to container
        itemsContainer.appendChild(li);
    });
}

// Initial render
renderItems();

