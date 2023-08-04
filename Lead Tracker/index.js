let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("savetab-btn")
const savefileBtn = document.getElementById("savefile-btn")
const leadsfromLocalStorage = JSON.parse( localStorage.getItem("myLeads"))

if (leadsfromLocalStorage) {
  myLeads = leadsfromLocalStorage
  render(myLeads)
}

function render(leads){
  let listitems = []
  for (let i = 0 ; i < leads.length; i++){
    listitems += `
    <li>
      <a target='_blank' href='${leads[i]}'>
        ${leads[i]}
      </a>
    </li>`
  }
  ulEl.innerHTML= listitems
}

tabBtn.addEventListener("click", function(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
  })
})

deleteBtn.addEventListener("dblclick", function(){
  localStorage.clear()
  myLeads = []
  render(myLeads)
})

inputBtn.addEventListener("click", function(){
  myLeads.push(inputEl.value)
  inputEl.value = ""
  localStorage.setItem("myLeads", JSON.stringify(myLeads))
  render(myLeads)
  console.log( localStorage.getItem("myLeads") )
})

savefileBtn.addEventListener("click", function(){
    let data = localStorage.getItem('myLeads');
    if (!data) {
      alert('No data found in local storage.');
      return;
    }
    let csv = '';
    let lines = data.split(',');
    for (let i = 0; i < lines.length; i++) {
      csv += lines[i] + '\n';
    }
    let link = document.createElement('a');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
    link.setAttribute('download', 'tabs.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  })
