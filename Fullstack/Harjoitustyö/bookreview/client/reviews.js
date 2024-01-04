const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get("bookId");
const form = document.getElementById('usrform')
sessionStorage.setItem('bookid', bookId);

function init() {
    let infoText = document.getElementById('infoText')
    const headerText = document.getElementById('bookname')
    const welcomeTxt = document.getElementById('welcomeTxt')
    headerText.innerHTML='Ladataan kirjaa palvelimelta, odota :)'
    const commentsection = document.getElementById("comment-section")
    getBook(bookId)
    const infofield2 = document.getElementById("infoText2")
    if (isAuthenticated()) {
        // jos käyttäjä ei ole kirjautunut, avataan popup
        logoutBtn.style.display = isAuthenticated ? 'block' : 'none';
        welcomeTxt.innerHTML= `Welcome ${localStorage.username}`
        welcomeTxt.style.display = 'block'
        commentsection.style.display="flex"
        let usrbtn=document.getElementById("LoginBtn");
        usrbtn.onclick = function() { toggleForm('userForm') };
        let InfoField=document.getElementById("UserField");
        InfoField.innerHTML=`Hello ${localStorage.username}`;
        return;
    }else{
        infofield2.style.display = 'block'
        commentsection.style.display="none"
    }
}
// voidaan tarkistaa onko käyttäjä kirjautunut sisään
const isAuthenticated=()=> {
    const accessToken = localStorage.getItem('accessToken');
    return accessToken !== null;
}
// tyhjätään kirjautumistiedot
const clearAuthenticatedUser = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('email');
    localStorage.removeItem('username');
}
// laitetaan käyttäjän tiedot sekä tokeni storageen. Tämä pitäisi muovata sessionstorageen
const setAuthenticatedUser = (accessToken, email, username) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('email', email);
    localStorage.setItem('username', username)
}
// ulos kirjautuminen
function logoutUser() {
    // tyhjätään storage
    clearAuthenticatedUser();
    logoutBtn.style.display = 'none';
    location.reload()
}
// kirjan haku
async function getBook(bookId) {
    try{
        let response = await fetch(`http://localhost:3000/books/books/${bookId}`)
        
        let book = await response.json()
        infoText.innerHTML= ' yhteys onnistui' 
        render(book)
        renderReviews(book)
    } catch(error) {
        console.log(error)
        infoText.innerHTML = 'Ongelmia palvelimeen yhdistämisessä :('
    }
    


}
// kirjan tietojen renderöinti
const render = (book) => {
    
    const header=document.getElementById('bookname')
    infoText.innerHTML= ' ' 
    header.innerHTML=book.name
    if (book.AVGrating){
        const ratingEl = document.createElement('p')
        ratingEl.classList.add("avgratingEl")
        const numStars = book.AVGrating;
        // generoidaan tähdet
        for (let i = 1; i <= 5; i++) {
            const starEl = document.createElement('span');
            if (i <= numStars) {
                starEl.innerHTML = '<i class="fa-solid fa-star fa-xs"></i>';
            } else if (i === Math.ceil(numStars) && numStars % 1 !== 0.5) {
                starEl.innerHTML = ''; 
            } else if (i === Math.ceil(numStars) && numStars % 1 === 0.5) {
                starEl.innerHTML = '<i class="fa-solid fa-star-half-stroke fa-xs"></i>';
            } else {
                starEl.innerHTML = ''; 
            }
            ratingEl.appendChild(starEl);
            header.appendChild(ratingEl)
        }
    }
    for (const key in book){
         if(key === 'author' || key === 'year'){
            const info = document.createElement("p");
            info.textContent = `${key}: ${book[key]}`;
            info.classList.add("info-item")
            header.appendChild(info);
        }
    }
    
    
}
// kirjojen arvostelujen arvostelua varten renderöinti.
const renderStars =(review, reviewDiv) =>{
        if (review.rating){
            const ratingEl = document.createElement('p')
            ratingEl.classList.add("ratingEl")
            const numStars = review.rating;
            for (let i = 1; i <= 5; i++) {
                const starEl = document.createElement('span');
                if (i <= numStars) {
                    starEl.innerHTML = '<i class="fa-solid fa-star fa-xs"></i>';
                } else if (i === Math.ceil(numStars) && numStars % 1 !== 0.5) {
                    starEl.innerHTML = ''; 
                } else if (i === Math.ceil(numStars) && numStars % 1 === 0.5) {
                    starEl.innerHTML = '<i class="fa-solid fa-star-half-stroke fa-xs"></i>';
                } else {
                    starEl.innerHTML = '';
                }
        
                ratingEl.appendChild(starEl);
            }
            reviewDiv.appendChild(ratingEl);
        }
    
}
const renderReviews =(book) =>{
    const reviewsSection = document.getElementById("review-section");
    book.reviews.forEach(review => {
        username = localStorage.username
        // mikäli kommentin postaajan käyttäjänime = sama kuin kirjautunut 
        if(review.user === username){
            const reviewDiv =document.createElement('div');
            renderStars(review, reviewDiv)
            reviewDiv.classList.add("ownreview");
            
            let attr = document.createAttribute('id')
            attr.value= review._id
            const userEl = document.createElement('h1')
            userEl.textContent="you"
            userEl.classList.add("userEl")
            const contentEl = document.createElement('p')
            contentEl.textContent=review.content
            contentEl.classList.add("contentEl")
            const dateEl = document.createElement('p')
            dateEl.textContent=review.date
            dateEl.classList.add("dateEl")
            reviewDiv.appendChild(userEl);
            reviewDiv.appendChild(contentEl);
            reviewDiv.appendChild(dateEl);
            reviewDiv.setAttributeNode(attr)
            reviewsSection.appendChild(reviewDiv)
            let span = document.createElement('span')
            let edit = document.createElement('span')
            // luodaan uusi class-attribuutti
            let span_attr = document.createAttribute('class')
            let span_attr2 = document.createAttribute('class')
            span_attr.value = 'delete'
            span_attr2.value = 'edit'
            
            edit.classList.add("options")

            let x = document.createElement(`span`)
            let e = document.createElement(`span`)

            x.setAttributeNode(span_attr)
            e.setAttributeNode(span_attr2)

            e.innerHTML='<i class="fa-regular fa-pen-to-square fa-xs"></i>'
            x.innerHTML='<i class="fa-solid fa-trash-can fa-xs"></i>'
            x.onclick = function() { removeComment(review._id, book.name) }
            e.onclick = function() { editComment(review._id, bookId) }
            edit.appendChild(e)
            edit.appendChild(x)
            reviewDiv.appendChild(edit);
        }else{
            const reviewDiv =document.createElement('div');
            renderStars(review, reviewDiv)
            
            reviewDiv.classList.add("review");
            const userEl = document.createElement('h1')
            userEl.textContent=review.user
            userEl.classList.add("userEl")
            const contentEl = document.createElement('p')
            contentEl.textContent=review.content
            contentEl.classList.add("contentEl")
            const dateEl = document.createElement('p')
            dateEl.textContent=review.date
            dateEl.classList.add("dateEl")
            reviewDiv.appendChild(userEl);
            reviewDiv.appendChild(contentEl);
            reviewDiv.appendChild(dateEl);
            reviewsSection.appendChild(reviewDiv)
        }
        
        /*reviewDiv.appendChild(userEl);
        reviewDiv.appendChild(contentEl);
        reviewDiv.appendChild(dateEl);
        reviewsSection.appendChild(reviewDiv) */
        })
    
}



function post(event){
    event.preventDefault();
    // ottaa käyttäjänimen suoraan localStoragesta.
    const name = localStorage.getItem('username');
    const comment = document.getElementById("comment").value;
    const rating = document.getElementById("rating").value;
    let trimmedcomment = comment.trim()
    if (rating != ""  && trimmedcomment.length > 2){
        // postcomment funktion kutsu, parametreinä nimi, kommentti ja arvio
        Postcomment(name, comment, rating);
    }else{
        alert("Please dont leave input fields empty, comment must be atleast 2 characters long")
    }
}
// kommentin postaus 
async function Postcomment(user, content, rating,event  ){
    const reviewData = {
        user,
        content,
        date: new Date(),
        rating
    };
    try {
        const response = await fetch(`http://localhost:3000/books/books/${bookId}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData),
        });

        if (response.ok) {
        
            
            location.reload()
            document.getElementById('comment').value=' ';
        } 
        } catch (error) {
            console.error('An error occurred:', error);
        
}}

async function removeComment(id, bookname) {
    const confirmation = window.confirm('Are you sure you want to delete this comment?');
    if (confirmation) {
        const response = await fetch(`http://localhost:3000/books/books/${bookname}/reviews/${id}`, {
        method: 'DELETE'
        })
        let responseJson = await response.json()
        let review = document.getElementById(id)
        review.parentNode.removeChild(review)
        
        let ReviewList = document.getElementById('review-section')
        if (!ReviewList.hasChildNodes()) {
        let infoText = document.getElementById('infoText')
        infoText.innerHTML = 'Ei arvosteluja'
        }
        location.reload()   
    }
}
async function editComment(id, bookid){

    selected = document.getElementById(`${id}`)
    selected.classList.toggle('ownreviewselected')
    const inputfield = document.getElementById('comment')
    inputfield.setAttribute('placeholder', 'Leave empty to cancel')
    const editButton = document.getElementById('submit-button');
    editButton.innerText = 'Save';
    editButton.setAttribute('onclick', `SaveComment('${id}', '${bookid}', event)`);
}
async function SaveComment(reviewId, bookid, event) {
    event.preventDefault()
    const rating = document.getElementById("rating").value
    const editButton = document.getElementById('submit-button');
    let newComment = document.getElementById('comment'); 
    const data = { 'editedText': newComment.value, 'rating': rating }; // otetaan uusi texti ja arvostelu bodyyn
    let trimmedcomment = newComment.value.trim()
    if(trimmedcomment.length > 2 && rating != ""){
    const response = await fetch(`http://localhost:3000/books/books/edit/${bookid}/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {  'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.status === 200) {
        // Reload or update the reviews on the page after successful editing
        //getBook(bookId)
        location.reload()
    }else{
        alert('Comment editing failed.');
        
    }}else{
        alert("Please dont leave input fields empty, comment must be atleast 2 characters long")
        editButton.innerText = 'Submit';
        editButton.setAttribute('onclick', `post(event)`);
        newComment.value = '';
    }
    // resetoidaan edit nappi ja teksti kenttä
    editButton.innerText = 'Submit';
    editButton.setAttribute('onclick', `post(event)`);
    newComment.value = '';
    newComment.setAttribute('placeholder', 'Enter text here...')
    selected = document.getElementById(`${reviewId}`)
    selected.classList.toggle('ownreviewselected')
}



const registerUser = async (usrname, email, passwd1, passwd2) =>{
    try{
        const errorfield1=document.getElementById("errorfield1")
        const errorfield2=document.getElementById("errorfield2")
        // tarkastaa salasanojen yhtäläisyyden
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
    setAuthenticatedUser(accessToken, email, username) // tallennetaan tokeni, email ja username localstorageen
    errorField.innerHTML = `Login successful! Welcome, ${username}`;
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
            registerUser(usrname, email, passwd1, passwd2); //kutsutaan funktio joka postaa käyttäjän tietokantaan
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
    
    const forms = ['registerForm', 'loginForm', 'userForm' ];
    forms.forEach(form => {
        const element = document.getElementById(form);
        if (form === formId) {
            element.style.display = 'flex';
        } else {
            element.style.display = 'none';
        }
    });
}
