function getTotalBooksCount(books) {
  let count = books.reduce((acc, curr) => acc.concat(curr), [])
  .filter(result => result).length;
  return count;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let count = 0;
  for(let i = 0; i < books.length; i++){ 
    if(books[i].borrows[0].returned == false){
      count = count + 1; 
    } 
  } return count;
}

function getMostCommonGenres(books) {

  const bookGenres = books.map((book) => book.genre);
  const results = [];
  
  bookGenres.map((genre) => {
    const genreExists = results.findIndex((element) => element.name === genre);
    if (genreExists >= 0) {
      results[genreExists].count = results[genreExists].count + 1;
    } else {
      results.push({ name: genre, count: 1 });
    }
  });
  results.sort((genreA, genreB) => genreB.count - genreA.count);
  if (results.length >= 5) {
    return results.slice(0, 5);
  }
  return results;
}

function getMostPopularBooks(books) {
  //mapping out array of books with just book title & number of borrows
  const popular = books.map((book) => ({
    name: book.title,
    count: book.borrows.length,
  }));
  // sort books by most popular first
  popular.sort((bookA, bookB) => bookB.count - bookA.count);
  return popular.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {

  return authors.map(author => {
    // loop through the author array
    author.count = books.filter(book => book.authorId === author.id).reduce((author, book) => author + (book.borrows && book.borrows.length || 0), 0);
    // to get the count, filter the book array and then reduce it to a sum of all matching books borrows array length
    author.name = `${author.name.first} ${author.name.last}`;
    delete author.id
    // remove the id since that isn't part of the desired result
    return author
  }).sort((authorA, authorB) => authorB.count - authorA.count).slice(0, 5)

}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
