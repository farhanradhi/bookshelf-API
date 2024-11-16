const {addBooks, getALLBooks, getBookByID, 
    editBooksByID, deleteBookByID} = require('./bookshandler');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBooks,
    },

    {
        method: 'GET',
        path: '/books',
        handler: getALLBooks,
    },

    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBookByID,
    },

    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBookByID,
    },

    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: editBooksByID,
    },
]

module.exports = routes;