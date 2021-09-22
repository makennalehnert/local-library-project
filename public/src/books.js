function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let checkedBooks = [];
  let returnedBooks = [];
  let bookStatus = [checkedBooks, returnedBooks];
  books.forEach((book) => {
    const isBookReturned = book.borrows[0].returned;
    return !isBookReturned ? checkedBooks.push(book) : returnedBooks.push(book)
  });
  bookStatus.push(checkedBooks);
  bookStatus.push(returnedBooks);
  return bookStatus;
}

//helper function
function findAccountById(accounts, id) {
  return accounts.find((act) => act.id === id);
}

function getBorrowersForBook(book, accounts) {
  let acts = book.borrows;
  let result = acts.map((act) => {
    //calling helper function
    const accInfo = findAccountById(accounts, act.id);
    const newAct = {
      ...act,
      ...accInfo,
    };
    return newAct;
  });
  return result.slice(0,10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
