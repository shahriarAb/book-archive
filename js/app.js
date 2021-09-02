const errorMessage = document.getElementById('error-message');
const booksContainer = document.getElementById('books-container');
const searchText = document.getElementById('search-field');

const spinner = prop =>{
    document.getElementById('spinner').style.display = prop;
}

document.getElementById('search-button').addEventListener('click', () => {
    spinner('block');
    if (searchText.value === '') {
        booksContainer.textContent = '';
        errorMessage.innerText = 'Please write something to search on the box!!';
        return;
    }
    else {
        const url = `http://openlibrary.org/search.json?q=${searchText.value}`;
        fetch(url)
            .then(res => res.json())
            .then(data => getBooksData(data.docs));
    }
});

const getBooksData = books => {
    booksContainer.textContent = '';
    errorMessage.textContent='';
    spinner('none');
    if(books.length === 0){
        errorMessage.innerText = 'Sorry, No books found! Try something else. Thank you.';
        return;
    }
    else{
        books.forEach(book => {
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="col border border-2 rounded-2 shadow card-size">
                <div class="card h-100">
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : 'No cover found'}-L.jpg" class="card-img-top img-thumbnail book-cover-size" alt="">
                    <div class="card-body">
                      <h3 class="card-title">${book.title}</h3>
                      <p class="card-text"><b>Written by:</b> ${book.author_name}</p>
                      <p><b>Publisher:</b> ${book.publisher}</p>
                      <p><b>First Published Year:</b> ${book.first_publish_year}</p>
                    </div>
                </div>
            </div>
            `;
            booksContainer.appendChild(div);
        });
    }
}

document.getElementById('search-button').addEventListener('click', () => {
    const url = `http://openlibrary.org/search.json?q=${searchText.value}`;
    fetch(url)
        .then(res => res.json())
        .then(data => resultFound(data));
});
const resultFound = results => {
    const searchNumber = document.getElementById('search-number');
    searchNumber.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <h5>${results.docs.length} of ${results.numFound} results displayed.</h5>
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