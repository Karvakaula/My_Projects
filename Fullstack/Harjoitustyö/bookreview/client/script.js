
let selections=[]
let search = " "
const displayedBooks = [];
let booknames =[] 

// lataa kirjat sivun avautuessa 
function init() {
    let infoText = document.getElementById('infoText')
    infoText.innerHTML = 'Ladataan kirjoja palvelimelta, odota...'
    loadBooks() 
    // onko kirjautunut?
    if (isAuthenticated()) {
        logoutBtn.style.display = isAuthenticated ? 'block' : 'none';
        let welcomeTxt = document.getElementById("welcomeTxt")
        welcomeTxt.innerHTML= `Welcome ${localStorage.username}`
        welcomeTxt.style.display = 'block'
        let usrbtn=document.getElementById("RegisterBtn");
        
        const profpic = localStorage.picture
        console.log(profpic)
        const profilePictureContainer = document.getElementById('profile-picture-container');
        const img = document.createElement('img');
        img.src = '/bookreview/server/'+profpic;
        profilePictureContainer.innerHTML = ''; // Clear any existing content
        profilePictureContainer.appendChild(img);
        usrbtn.onclick = function() { toggleForm('userForm') };
        let InfoField=document.getElementById("UserField");
        InfoField.innerHTML=`Hello ${localStorage.username}`;
        return;
    }
}

const setAuthenticatedUser = (accessToken, email, username, profilepicture) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('email', email);
    localStorage.setItem('username', username);
    localStorage.setItem('picture', profilepicture)
}
const isAuthenticated=()=> {
    const accessToken = localStorage.getItem('accessToken');
    return accessToken !== null;
}
const clearAuthenticatedUser = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    localStorage.removeItem('picture');
}
function logoutUser() {
    
    clearAuthenticatedUser();
    logoutBtn.style.display = 'none';
    location.reload()
}
function searchfunc(){
    const inputValue = document.getElementById("searchEl");
    let Input = inputValue.value.toLowerCase();
    //console.log(Input)
    const matchingBooks = booknames.filter((book) =>
        book.toLowerCase().startsWith(Input)
    );
    //console.log(matchingBooks)

    if (Input !== "") {
        display(matchingBooks);
        console.log(`matchingbooks:`+matchingBooks)
    } else {
        // jos input tyhjä, renderöi kaikki kirjat loadbooks funktion kautta
        loadBooks();
    }
}

async function loadBooks() {
    try{
        let response = await fetch('http://localhost:3000/books/books'); // haetaan kirjat 
        const books = await response.json();
        //console.log(books)
        infoText.innerHTML= ' ' ; // tyhjätään info
        const bookGrid = document.getElementById("book-grid");
        bookGrid.innerHTML= ' '; // tyhjätään bookgrid
        render(books)
    } catch(error) {
        infoText.innerHTML = 'Ongelmia palvelimeen yhdistämisessä :(';
    }
    
     

}



// kirjan yksittäisten kirjojen haku. parametrinä hakua vastaavat kirjat
async function display(matches) {
    const bookGrid = document.getElementById("book-grid");
    bookGrid.innerHTML=' ';
    matches.forEach(match => { // jokaista parametrillä annettua "matchia" vastaan tulostetaan elementti kirja gridiin.
        fetchBookByName(match) // haetaan kirja
            .then((book) => {
                if (book) {  
                    render(book); // renderöidään (paremetrinä fetchbybooknamen palauttama kirja) 
                }
            })
            .catch(error => {
                console.error("Error fetching book:", error);
            });
    });
}

// kirjan haku funktio, parametrinä kirjan nimi
async function fetchBookByName(name) {
    try {
        const response = await fetch(`http://localhost:3000/books/books/name/${name}`);
        
        if (response.ok) {
            const book = await response.json();
            const bookId = book[0]._id;
            return book
        } else {
            //alert("Book not found.");
        }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    
}

// kirja elementtien event listener, 
document.addEventListener("click", function (event) {
    const bookItem = event.target.closest(".book-item"); // stackoverflowsta, toimii hyvin
    
    if (bookItem) {
        const bookId = bookItem.getAttribute("data-bookid");
        if (bookId) {
            // luodaan uuden sivun urli (tänne jää bookid) voidaan napata id reviews sivulla
            const reviewsPageURL = `reviews.html?bookId=${bookId}`;
            
            // avataan uusi ikkuna 
            window.open(reviewsPageURL, "_blank");
        }
    }
});

document.getElementById('closeForm').addEventListener('click', function () {
    popupForm.classList.toggle('visible');
});
// eri formien näyttö
function toggleForm(formId, event) {
    if(event){
        event.preventDefault();
    }
    // jos popupform ei oo näkyvissä ni muutetaan näkyväksi
    const popupForm = document.getElementById('popupForm');
    if(popupForm.classList != "visible"){
        popupForm.classList.toggle('visible');
    }
    const forms = ['registerForm', 'loginForm', 'userForm'];
    forms.forEach(form => {
        const element = document.getElementById(form);
        if (form === formId) {
            element.style.display = 'flex';
        } else {
            element.style.display = 'none';
        }
    });
}

// kirja elementin luonti
const createbookEl=(book) =>{
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book-item")
        bookDiv.setAttribute("data-bookid", book._id) 

        const title = document.createElement("h2");
        title.textContent = book.name;

        const author = document.createElement("p");
        author.textContent = book.author;

        const year = document.createElement("p");
        year.textContent = `Year: ${book.year}`;
        
        const reviews = document.createElement("p");

        if (book.reviews){
            reviews.textContent = `Reviews: ${book.reviews.length}`;
        }else{
            reviews.textContent = "No reviews yet"
        }
        
        bookDiv.appendChild(title);
        bookDiv.appendChild(author);
        bookDiv.appendChild(year);
        bookDiv.appendChild(reviews);
        return(bookDiv)
}

const render = (books) => {
    const bookGrid = document.getElementById("book-grid");
    books.forEach(book => {
        const bookName=book.name
        if (!booknames.includes(bookName)) {
            booknames.push(bookName);
        }
        const bookDiv = createbookEl(book); 
        bookGrid.appendChild(bookDiv);
    });
}

// käyttäjän rekisteröingi
// testataan tehdä tällä = () => {} tavalla
const registerUser = async (usrname, email, passwd1, passwd2) =>{
try{
    const errorfield1=document.getElementById("errorfield1")
    const errorfield2=document.getElementById("errorfield2")
    if(passwd1!==passwd2){
        errorfield2.innerHTML="Passwords dont match"
        return;
    }
    const data = {
        username: usrname,
        password: passwd1,
        email: email
    };
    const response = await fetch(`http://localhost:3000/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            console.log(response)
        }
        return response.json();
    })
    .then(data => {
        console.log('Registration successful:', data);
        errorfield2.innerHTML="Registration successful!"
    })
    }catch(error) {
        errorfield2.innerHTML='Error during registration:', error
        console.error('Error during registration:', error);
    }
    
}
const loginUser = async (email, passwd) =>{
    
    try {
        const data = {
            email: email,
            password: passwd,
        };
        const response = await fetch(`http://localhost:3000/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if (!response.ok) {
        const errorField = document.getElementById('errorfield1L');
        errorField.textContent = 'Invalid username or password';
        return;
    }
    const errorField = document.getElementById('errorfield1L');
    const responseBody = await response.json();
    const accessToken = responseBody.accessToken;
    const username = responseBody.username
    const profilepicture = responseBody.pic
    console.log(profilepicture)
    setAuthenticatedUser(accessToken, email, username, profilepicture)
    console.log(responseBody)
    errorField.innerHTML = `Login successful! Welcome, ${username}`;
    logoutBtn.style.display = isAuthenticated ? 'block' : 'none';
    location.reload()
} catch (error) {
    console.error('Error during login:', error);
}
}
document.getElementById("register").addEventListener("click", function (event) {
    event.preventDefault();
    const usrname=document.getElementById("username").value
    const email=document.getElementById("email").value
    const passwd1 = document.getElementById("passwd").value
    const passwd2=document.getElementById("passwd2").value
    const errorfield1=document.getElementById("errorfield1")
    const errorfield2=document.getElementById("errorfield2")
    if (usrname != "" && passwd1 != "" && email != ""){
        registerUser(usrname, email, passwd1, passwd2);
    }else{
        errorfield1.innerHTML="Please dont leave fields empty"
    }
    
});
document.getElementById("Login").addEventListener("click", function (event) {
    event.preventDefault()
    const errorfield1=document.getElementById("errorfield1L")
    const errorfield2=document.getElementById("errorfield2L")
    const password=document.getElementById("passwdLogin").value
    const email=document.getElementById("emailLogin").value
    loginUser(email,password)

})

document.getElementById('userForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
  
    try {
      const response = await fetch(`http://localhost:3000/users/upload/${localStorage.username}`, {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        console.log('Profile picture uploaded successfully');
      } else {
        console.error('Failed to upload profile picture');
      }
    } catch (error) {
      console.error('Error during profile picture upload:', error);
    }
  });
  