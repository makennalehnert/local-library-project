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

function getBorrowersForBook(book, accounts) {
  let transactions = book.borrows;
  let result = transactions.map((transaction) => {
    const accInfo = accounts.find((account) => account.id === transaction.id);
    const newTransaction = {
      ...transaction,
      ...accInfo,
    };
    return newTransaction;
  });
  result.splice(10);
  return result;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
