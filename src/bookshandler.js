const books = require('./books');
const { nanoid } = require('nanoid');

const filterReadings = (reading, bookRead) => reading === undefined || bookRead === reading;
const filterNames = (name, bookName) => name === undefined || bookName === name;
const filterFinished = (finished, bookFinish) => finished === undefined || bookFinish === finished;

const getALLBooks = (request, h) => {
    const { name, reading, finished } = request.query;

    const filteredBooks = books.filter(book =>
        filterNames(name, book.name) &&
        filterReadings(reading, book.reading) &&
        filterFinished(finished, book.finished)
    );

    const responseBooks = filteredBooks.map(({ id, name, publisher }) => ({ id, name, publisher }));

    return h.response({
        status: 'success',
        data: { books: responseBooks },
    });
};

const addBooks = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    if (readPage > pageCount) {
        return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400);
    }

    if (!name) {
        return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        }).code(400);
    }

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;

    const newBook = { id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt };

    books.push(newBook);

    return h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: { bookId: id },
    }).code(201);
};

const getBookByID = (request, h) => {
    const { bookId } = request.params;
    const book = books.find(b => b.id === bookId);

    if (book) {
        return {
            status: 'success',
            data: { book },
        };
    }

    return h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    }).code(404);
};

const editBooksByID = (request, h) => {
    const { bookId } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    if (!name) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        }).code(400);
    }

    if (readPage > pageCount) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400);
    }

    const finished = pageCount === readPage;
    const updatedAt = new Date().toISOString();
    const index = books.findIndex(book => book.id === bookId);

    if (index !== -1) {
        books[index] = { ...books[index], name, year, author, summary, publisher, pageCount, readPage, finished, reading, updatedAt };
        return h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
    }

    return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    }).code(404);
};

const deleteBookByID = (request, h) => {
    const { bookId } = request.params;
    const index = books.findIndex(book => book.id === bookId);

    if (index !== -1) {
        books.splice(index, 1);
        return h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
    }

    return h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    }).code(404);
};

module.exports = { addBooks, getALLBooks, getBookByID, editBooksByID, deleteBookByID };


