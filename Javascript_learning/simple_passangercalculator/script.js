
let count = 0
let number=document.getElementById("count-el")
let log=document.getElementById("save-el")
let welcomeEl = document.getElementById("welcome-el")
let name1 = "Leevi"
let greeting = "Welcome back"
let mygreeting = greeting + "," + " " + name1
welcomeEl.innerText = mygreeting
welcomeEl.innerText += "👋"

function welcome(){
    welcomeEl.innerText = mygreeting
}

function addcount(){
    count += 1
    number.innerText = count
    console.log(count)
}

function save(){
    let history = 0
    history = count + "-"
    log.textContent += history
    count = 0
    number.innerText = count

}
//function for resetting
function reset() {
    count = 0
    log.innerText = count


}



