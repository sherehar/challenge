const Tweet = require('../model/tweet');
const {handleErrors} = require('../config/errorsHandler');

const homepage = (req,res) => {
    Tweet.find()
        .then(tweets => {
            res.render('homepage',{ pageTitle: 'Welcome To Tweet', tweets})
        })
        .catch(err => console.log(err))
}

const addTweet = (req,res) => {
    const paction ='/add-tweet';
    const pageTitle ='Add Tweet';
    if(req.method === 'GET'){
        res.render('add', {pageTitle, paction , atitle:'', atweet:'', errors: null})
    };
    if(req.method === 'POST'){
        const tweet = new Tweet(req.body);
        tweet.save()
            .then(() => {
                res.redirect('/tweet')
            })
            .catch(err => {
                const errors = handleErrors(err)
                res.render('add', {pageTitle, paction,
                atitle:req.body.title,
                atweet:req.body.tweet,
                errors})
            })
    }
}

const showOneTweet = (req,res) => {
    Tweet.findById(req.params.id)
    .then( tweet => {
        res.render('showOne',{pageTitle: 'Show One Tweet', tweet})
    })
    .catch( err => {
        res.send(err)
    })
}

const editTweet =(req,res) => {
    const pageTitle ='Edit Tweet';
    if(req.method === 'GET'){
        Tweet.findById(req.params.id)
            .then( tweet => {
                const paction = `/tweet/edit/${tweet._id}`;
                res.render('edit',{pageTitle,
                paction,
                atitle:tweet.title,
                atweet:tweet.tweet,
                errors: null
                })
            })
            .catch( err => {
                res.send(err)
            })
    };
    if(req.method === 'POST'){
        Tweet.findByIdAndUpdate (req.params.id, req.body, {runValidators:true})
            .then(result  => {
                res.render('showOne',{pageTitle: 'Show One Tweet', tweet:result})
            })
            .catch(err => {
                Tweet.findById(req.params.id)
                    .then( tweet => {
                        const paction =`/tweet/edit/${tweet._id}`;
                        const errors = handleErrors(err)
                        res.render('add', {pageTitle: 'Edit Tweet', paction,
                        atitle:req.body.title,
                        atweet:req.body.tweet,
                        errors, tweet})
                        
                    })
                    .catch(err => res.send(err))
            })
    };
}

const delTweet = (req,res) => {
    Tweet.findByIdAndDelete(req.params.id)
        .then( result => res.redirect('/tweet'))
        .catch( err => res.send('Can not delete this tweet'))
}
module.exports = {
    homepage,
    addTweet,
    showOneTweet,
    editTweet,
    delTweet
}
