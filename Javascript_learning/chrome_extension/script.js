// chrome://extensions/
let myLeads = []
const currentEl=document.getElementById("current-btn")
const clearBtn =document.getElementById("clear-btn")
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const list = document.getElementById("ul-el")
const leadsfromlocal = JSON.parse(localStorage.getItem("myLeads"))


if (leadsfromlocal){
    myLeads = leadsfromlocal
    render(myLeads)
}

function render(n){
    let listitems = ""
    for(let i=0; i< n.length; i++){
       
        listitems += `
        <li>
            <a target='_blank>' href =' ${n[i]}'> 
                ${n[i]} 
            </a> 
        </li>
        `         
        //list.innerHTML = listitems
    }
    list.innerHTML = listitems
}

clearBtn.addEventListener("click", function(){
    if (confirm('Are you sure you want to clear your leads')) {
        //clear storage
        localStorage.clear("myLeads")
        myLeads = []
        console.log(myLeads)
        render(myLeads)
        //change clear buttons text to cleared and turn it grey
        clearBtn.innerHTML="CLEARED"
        clearBtn.style="background : grey"
        console.log(leadsfromlocal)
      } else {
       
        
      }
})




inputBtn.addEventListener("click", function(){
    
    if (inputEl.value.length > 0){
        //push input to myleads array
        myLeads.push(inputEl.value)
        inputEl.value =""
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        //return clearbtn style
        clearBtn.style="background :#27a2c4 "
        clearBtn.innerHTML="CLEAR"
        render(myLeads)
        console.log( localStorage.getItem("myLeads"))
    }
    else{
        alert("Empty value")
        inputEl.value =""
    }
})
currentEl.addEventListener("click", function(){
    chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

    
     



