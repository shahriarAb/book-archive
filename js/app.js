const searchButton = () => {
    const searchText = document.getElementById('search-field').value;
    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => getBooksData(data.docs));
}
const getBooksData = books => {
    const booksContainer = document.getElementById('books-container');
    books.forEach(book => {
        console.log(book);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="col border border-2 rounded-2 shadow">
            <div class="card h-100">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : 'No cover found'}-L.jpg" class="card-img-top img-thumbnail book-cover-size" alt="">
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
            </div>
        </div>
        `;
        booksContainer.appendChild(div);
    })
}