const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
    {
        id: String,
        name: { type: String, required: true },
        author: { type: String, required: true },
        year: { type: Number, min: 0 },
        AVGrating: { type:Number, default:0 },
        reviews: [
            {
                user: String,
                content: String,
                date: {
                    type: Date, //tämä date formi vähän huono mutta en ole löytänyt parempaa
                },
                rating: { type: Number, min: 0, max: 5 },
            },
        ],
    },
    { // Testissä methodit, tämä toimi ainakin ihan kivasti
        methods: { 
            calculateAverageRating() {
                if (!this.reviews || this.reviews.length === 0) {
                    return 0;
                }
                console.log("Functioning stuff");
                //console.log(this.reviews)
                const validRatings = this.reviews.filter(review => typeof review.rating === 'number');
    
                    if (validRatings.length === 0) {
                        return 0;
                    }
                    const totalRating = validRatings.reduce((sum, review) => sum + review.rating, 0);
                    divide= totalRating / validRatings.length;
                    rounded=(Math.round(divide * 2) / 2).toFixed(1) // tämä poimittu stackoverflowsta, toimii
                    return rounded;
            },
        },
    }
);

const Book = mongoose.model('Book', bookSchema, 'books') 

module.exports = Book;