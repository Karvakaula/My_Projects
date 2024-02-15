const express = require('express');
const router = express.Router();
const Book = require('../Schemas/bookSchema.js') // haetaan kirja schema
const { ObjectId } = require('mongoose').Types;

// kirjojen lisäämiseen
router.post('/books', async (request, response) => {
    // const {name, author, year, reviews } testaa toimiiko 
    const { name } = request.body
    const { author } = request.body
    const { year } = request.body
    const { reviews } = request.body
    const book = new Book({
        name,
        author,
        year,
        reviews
    });

    
    try {
        const savedBook = await book.save();
        response.json(savedBook); 
    } catch (error) {
        response.status(500).json({ error: 'mönkään meni' });
    }
})

// kommentin lisäykseen, eli url /books/id/reviews 
router.post('/books/:bookId/reviews', async (request,response) =>{
    const bookId = request.params.bookId; 
    const { user } = request.body
    const { content } = request.body
    const { date } = request.body
    const { rating } = request.body

    try {
        // etsitään kirja id:llä
        const book = await Book.findById(bookId);
        if (book) {
            // pusketaan kommentti arvoineen kirjan reviews listaan.
            book.reviews.push({ user, content: content, date, rating });
            // lasketaan uusi keskiarvo kirjalle
            book.AVGrating = book.calculateAverageRating(book.reviews)
            console.log(book.AVGrating)
            const updatedBook = await book.save();
            response.json(updatedBook);
        } else {
            response.status(404).json({ error: 'Book not found.' });
        }
    } catch (error) {
        response.status(500).json({ error: 'An error occurred while adding the review.' });
    }
})

router.get('/books', async (request, response) => {
    try {
        const books = await Book.find();
        response.status(200).json(books);
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/books/:bookId/reviews', async (request,response) => { // jäänyt turhaksi ??
    const bookId = request.params.bookId; 
    const reviews = await Book.findOne({bookId})
    if (reviews) response.json(reviews)
    else response.status(404).end()
})
router.get('/books/:id', async (request,response) => { 
    const bookId = request.params.id;
    console.log(bookId)
    if (!ObjectId.isValid(bookId)) {
        response.status(400).json({ error: 'Invalid book ID' });
        return;
    }

    const book = await Book.findOne({ _id: new ObjectId(bookId) });
    
    if (book) {
        const averageRating = book.calculateAverageRating();
        console.log("Average Rating:", averageRating);
        book.AVGrating = averageRating
        response.json(book);
        
    } else {
        response.status(404).end();
    }
})
router.get('/books/name/:bookname', async (request, response) =>{
    const bookname = request.params.bookname; 
    const book = await Book.find({ name:bookname })
    response.json(book)
})

router.delete('/books/:bookname/reviews/:id', async (request, response) => {
    const bookname = request.params.bookname;
    const revId = request.params.id;
    
    
    try {
        const book = await Book.findOne({ name: bookname });
        

        const updatedBook = await Book.findOneAndUpdate(
            { name: bookname },
            { $pull: { reviews: { _id: revId } } },
            { new: true }
        );
        if (updatedBook) {
            response.json(updatedBook);
        } else {
            response.status(404).json({ error: 'Book not found.' });
        }
    } catch (error) {
        response.status(500).json({ error: 'An error occurred while deleting the review.' });
    }
});

router.put('/books/edit/:bookId/reviews/:id', async (request, response) => {
    const bookId = request.params.bookId;
    const revId = request.params.id;
    try {
        const book = await Book.findById(bookId);

        if (book) {
            const review = book.reviews.find(review => review.id === revId);

            if (review) {
                // Check if the user already liked the review
                const userId = request.body.userId; // Assuming you have user ID in the request body
                const userLikedIndex = review.likes.indexOf(userId);

                if (userLikedIndex === -1) {
                    // If the user hasn't liked the review, add their ID to the likes array
                    review.likes.push(userId);
                } else {
                    // If the user already liked the review, remove their ID from the likes array
                    review.likes.splice(userLikedIndex, 1);
                }

                // Save the updated book with the modified review
                const updatedBook = await book.save();
                response.json(updatedBook.reviews);
            } else {
                response.status(404).json({ error: 'Review not found.' });
            }
        } else {
            response.status(404).json({ error: 'Book not found.' });
        }
    } catch (error) {
        response.status(500).json({ error: 'An error occurred while updating the review.' });
    }
});

module.exports = router;