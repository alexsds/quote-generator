const QUOTE_API_URL = 'https://type.fit/api/quotes';
const TWITTER_API_URL = 'https://twitter.com/intent/tweet';

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText= document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoading() {
    loader.hidden = false;
}

function hideLoading() {
    loader.hidden = true;
}

function showQuoteContainer() {
    quoteContainer.hidden = false;
}

function hideQuoteContainer() {
    quoteContainer.hidden = true;
}

function getRandomQuote() {
    const index = Math.floor(Math.random() * apiQuotes.length);
    return apiQuotes[index];
}

function setQuoteData(quote) {
    quoteText.textContent = quote.text;
    authorText.textContent = quote.author ? quote.author : 'Unknown';
    quote.text.length > 120 ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote');;
}

function newQuote() {
    hideQuoteContainer();
    showLoading();
    setQuoteData(getRandomQuote());
    hideLoading();
    showQuoteContainer();
}

async function getQuotes() {
    hideQuoteContainer();
    showLoading();
    try {
        const response = await fetch(QUOTE_API_URL);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        console.log(error);
    }   
}

function tweetQuote() {
    const twitterUrl = `${TWITTER_API_URL}?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

newQuoteButton.addEventListener('click', newQuote);
twitterButton.addEventListener('click', tweetQuote)

getQuotes();