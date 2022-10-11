import {datubasea} from './datubasea.js'


let indizea = 0
const URLBASE = 'https://covers.openlibrary.org/b/id/'
let izenburua  = document.getElementById('izenburua');
let irudia = document.getElementById('irudia')
let egilea = document.getElementById('egilea')
let isbn = document.getElementById('isbn')
let aurrera = document.getElementById('aurrera')
let atzera = document.getElementById('atzera')
let bilatu = document.getElementById('bilatu')
let libKop= document.getElementById("libKop")

function eremuakBete(){

    izenburua.value = datubasea[indizea].izenburua
    data.value = datubasea[indizea].data
    egilea.value = datubasea[indizea].egilea
    isbn.value = datubasea[indizea].isbn
    irudia.src = URLBASE + datubasea[indizea].filename 
    libKop.textContent=datubasea.length

}
function convert(book){
    let key=Object.keys(book)
    let title = book[key].details.full_title
    if(title===undefined) title=book[key].details.title
    return {
        "isbn": book[key].bib_key.replace('ISBN:',''),
        "egilea": book[key].details.authors.map(auth=>auth.name).join(','),
        "data": book[key].details.publish_date,
        "izenburua":title,
        "filename": book[key].thumbnail_url.replace('https://covers.openlibrary.org/b/id/','').replace('S.jpg','M.jpg')
    }
}


function kargatu(){

    eremuakBete()

    aurrera.addEventListener('click', (event) => {
        if (indizea < datubasea.length-1)
            indizea++
        eremuakBete()
    })
    atzera.addEventListener('click', (event) => {
        if (indizea > 0)
            indizea--
        eremuakBete()
    })
    bilatu.addEventListener('click',async (event)=>{
        indizea=datubasea.findIndex(item=>item.isbn==isbn.value)
        if(indizea==-1){
            let book= await fetch('https://openlibrary.org/api/books?bibkeys=ISBN:'+isbn.value+'&format=json&jscmd=details').then(r=> r.json())
            datubasea.push(convert(book))
            indizea=datubasea.length-1
        }
        eremuakBete()
    })


}

window.onload = kargatu;

