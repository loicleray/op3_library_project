function BookObjs(author, title, pages, isRead) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.isRead = isRead;
    this.info = function() {
        return `${title} by ${author}. ${pages} page${(pages>0)?"s":""}. Current status ${isRead ? 'Read' : 'Not read yet'}`
    }
};

// create library array
let myLibrary = [];
// create a few test book objects
const book1 = new BookObjs('J.K. Rowling', 'Harry Potter and the Sorcerer\'s Stone', 309, true);
const book2 = new BookObjs('GOD', 'Bible', 2000, false);
const book3 = new BookObjs('Anonymous', 'Test Book Number 3', 309, true);
const book4 = new BookObjs('John Adams', 'A walk to remember (french version)', 5550, false);
const book5 = new BookObjs('Tina Turner', 'Silence of the Lambs', 19, true);
// add to library array
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);
addBookToLibrary(book5);


// modal selection and fucntionality
// set DOM elements
const modalButton = document.getElementById('open_modal');
const formDialog = document.getElementById('formDialog');
const closeModal = document.getElementById('cancel');
const submitBook = document.getElementById('submitBook');
const deleteBookBtn = document.getElementsByClassName('deleteButton');
// modal button functionality
modalButton.addEventListener('click', () => {
    formDialog.showModal();
});
closeModal.addEventListener('click', () => {
    formDialog.close();
});

submitBook.addEventListener('click', (event) => {
    // create a new book object
    // console.log('creating book...');
    const newBookInfo = getDialogValues();
    const newBook = new BookObjs(...newBookInfo);
    
    // add book to library list
    // console.log('submitting book...');
    addBookToLibrary(newBook);
    
    // reset form and close dialog
    document.getElementById('formForBook').reset();
    formDialog.close();
});

// get inputs values from dialog
function getDialogValues() {
    const titleInput = document.getElementById('newBookTitle').value;
    const authorInput = document.getElementById('newBookAuthor').value;
    const pagesInput = document.getElementById('newBookPages').value;
    const isReadInput = document.getElementById('newBookReadStatus').checked; //true or false
    console.log(`isReadInput: ${isReadInput}`);
    return [titleInput, authorInput, pagesInput, isReadInput];
}

// creating book adding functionality
function addBookToLibrary(bookObj) {
    myLibrary.push(bookObj);
    // update display bookarray
    updateDisplay(myLibrary);
}

function updateDisplay(bookArray){
    // clear the display
    const container = document.getElementById('background');  
    container.innerHTML = '';
    
    // loop through the array and display each book
    for (let i = 0; i < myLibrary.length; i++) {
        const libBook = myLibrary[i];
    // for (const libBook in myLibrary) {
        const container = document.getElementById('background');       
        
        // make book_containing div
        let newDiv = document.createElement('div');
        newDiv.classList.add('book_container');
        newDiv.setAttribute('data-title', libBook.title);
        newDiv.setAttribute('data-arrayIndex', i);
        
        // make title
        let newTitle = document.createElement('h2');
        newTitle.textContent = libBook.title; 
        newTitle.classList.add('booktitle');
        newDiv.appendChild(newTitle);
    
        // make author (and paragraph)
        var newAuthLine = document.createElement('p');
        newAuthLine.innerHTML = `by <b class='author'>${libBook.author}</b>`;
        newDiv.appendChild(newAuthLine);

        // pages count
        var newPages = document.createElement('p');
        newPages.classList.add('pages');
        newPages.innerText = `${libBook.pages} pages.`;
        newDiv.appendChild(newPages);

        // read status button
        var newIsReadButton = document.createElement('button');
        newIsReadButton.onclick = () => {
            libBook.isRead = !libBook.isRead;
            updateDisplay(myLibrary);
        }
        newIsReadButton.setAttribute("id","isRead")
        if  (libBook.isRead) {
            newIsReadButton.classList.add('read-status');
            newIsReadButton.innerText = 'Read';
        } else {
            newIsReadButton.classList.remove('read-status');
            newIsReadButton.classList.add('unread-status');
            newIsReadButton.innerText = 'Unread';
        }

        newDiv.appendChild(newIsReadButton);

        // add delete button
        let deleteButton = document.createElement('button');
        deleteButton.classList.add('deleteButton');
        deleteButton.innerText = 'Delete Book';
        deleteButton.onclick = () => deleteParentDiv(event);
        newDiv.appendChild(deleteButton);
        
        // add the dive with elemeents to main container
        container.append(newDiv);
    };
}

// delete book functionality
// when delete button is clicked, remove book from array
function deleteParentDiv(e) {
    const bookIndex =  e.target.parentNode.getAttribute('data-arrayIndex');
    console.log(myLibrary.length)
    myLibrary.splice(bookIndex, 1);
    console.log(myLibrary.length)
    updateDisplay(myLibrary)
}
 
// console.log(deleteBookBtn)
