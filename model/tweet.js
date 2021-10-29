const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tweetSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please Put A title for the Tweet!'],
        minlength: [20, "The title should has at least 20 characters!"]
    },
    tweet: {
        type: String,
        required: [true, 'Please Put some details for the Tweet!'],
        maxlength: [50, "The Tweet should has no longer than 50 characters!"]
    },
}, {timestamps: true});

const Tweet= mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
