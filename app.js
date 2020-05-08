
let form = document.getElementById('myForm')

form.addEventListener('submit', saveBookmark)

function saveBookmark(e) {
    // Target form values
    let siteName = document.getElementById('siteName').value
    let siteUrl = document.getElementById('siteURL').value

    
    let data = {
        name: siteName,
        url: siteUrl
    }
    
    // Set up Localstorage
    if(localStorage.getItem('bookmarks') === null) {
        // Initialize Array
        let bookmarks = []

        // Push into the array
        bookmarks.push(data)

        // Set up Localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    } else {
        // Get bookmarks from localstorage
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'))

        // Push data to bookmarks
        bookmarks.push(data)

        // Set data back to bookmarks
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))

    }

    // Call getbookmarks function
    getBookmarks()
    //Prevent Default Submission of form
    e.preventDefault()
}

function getBookmarks() {
    // Fetch Bookmarks
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'))

    // Target the UI Area here
    let bookmarksArea = document.getElementById('bookmarks')

    bookmarksArea.innerHTML = '';

    for(let i = 0; i < bookmarks.length; i++) {
        let bookmarkName = bookmarks[i].name
        let bookmarkUrl = bookmarks[i].url

        bookmarksArea.innerHTML += '<div class="card">' 
                                    + '<div class="card-body">' +
                                            '<h3 class="card-title">' + bookmarkName + '</h3>' +
                                            '<a class="btn btn-primary mr-3" href="'+bookmarkUrl+' target="_blank">Visit</a>' +
                                            '<a class="btn btn-danger" href="#" onclick="removeBookmark(\''+bookmarkUrl+'\')">' + 'Delete' + '</a>'
    }
}

function removeBookmark(url) {
    // Fetch the bookmarks
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'))

    // Loop through the bookmarks to get the individual bookmarks
    for(let i = 0; i < bookmarks.length; i++) {
        if(bookmarks[i].url == url) {
            bookmarks.splice(i, 1)
        }
    }

    // Re-set bookmarks in localstorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    // console.log(url)

    getBookmarks()
}