// get elements using DOM
const errorMessage = document.getElementById('error-message');
const booksContainer = document.getElementById('books-container');
const searchText = document.getElementById('search-field');
const searchNumber = document.getElementById('search-number');

// function for spinner
const spinner = prop => {
    document.getElementById('spinner').style.display = prop;
}

// function for clearing screen on click button
const screenClear = prop => {
    booksContainer.style.display = prop;
}

// click button to operate
document.getElementById('search-button').addEventListener('click', () => {
    spinner('block');
    screenClear('none');
    errorMessage.textContent = '';
    if (searchText.value === '') {
        booksContainer.textContent = '';
        spinner('none');
        errorMessage.innerText = 'Please write something on the box to search.';
        return;
    }
    else {
        const url = `http://openlibrary.org/search.json?q=${searchText.value}`;
        fetch(url)
            .then(res => res.json())
            .then(data => getBooksData(data.docs));
    }
});

// talking search result and show on website
const getBooksData = books => {
    searchText.value = '';
    booksContainer.textContent = '';
    spinner('none');
    screenClear('flex');
    if (books.length === 0) {
        errorMessage.innerText = 'Sorry, No books found! Try something else. Thank you.';
        return;
    }
    else {
        books.forEach(book => {
            console.log(book)
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="col border border-2 rounded-2 shadow card-size">
                <div class="card h-100">
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : 'No cover found'}-L.jpg" class="card-img-top img-thumbnail book-cover-size" alt="">
                    <div class="card-body">
                      <h4 class="card-title">${book.title}</h4>
                      <p class="card-text"><b>Written by:</b> ${book.author_name ? book.author_name[0] : 'no author name found'}</p>
                      <p><b>Publisher:</b> ${book.publisher ? book.publisher[0] : 'no publisher found'}</p>
                      <p><b>First Published Year:</b> ${book.first_publish_year}</p>
                    </div>
                </div>
            </div>
            `;
            booksContainer.appendChild(div);
        });
    }
}

// to display how many result out of how many results display in a page
document.getElementById('search-button').addEventListener('click', () => {
    searchNumber.style.display = 'none';
    const url = `http://openlibrary.org/search.json?q=${searchText.value}`;
    fetch(url)
        .then(res => res.json())
        .then(data => resultFound(data));
});
const resultFound = results => {
    searchNumber.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <h6>${results.docs.length} out of ${results.numFound} results displayed.</h6>
    `;
    if (results.numFound === 0) {
        searchNumber.style.display = 'none';
        return;
    }
    else {
        searchNumber.style.display = 'block';
        searchNumber.appendChild(div);
    }
}
//finish of JavaScript code