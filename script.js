let titles = ['Montag', 'Dienstag', 'Mittwoch'];
let notes = ['Einkaufen', 'Kochen', 'Gassi gehen'];

let trashTitles = [];
let trashNotes = [];


function init() {
    loadArray();
    render();

}


function render() {
    let notesGallery = document.getElementById('notes_gallery');
    notesGallery.innerHTML = '';

    for (let i = 0; i < notes.length; i++) {
        notesGallery.innerHTML += `
              <div class="post">
                  <b>${titles[i]}</b>
                   ${notes[i]}
                 <div class="icon"><img onclick="deleteNotes(${i})" src="img/papierkorb.png" alt="Garbage"> 
                     <a href="index.html"></a>
                 </div>  
             </div>`;
    }
}


function addNewNote() {
    let title = document.getElementById('title');
    let note = document.getElementById('note');


    if (title.value === "" && note.value === "") {
        alert("Bitte fülle Titel oder Notiz aus.");
        return;
    }


    titles.push(title.value);
    notes.push(note.value);

    title.value = '';
    note.value = '';

    saveArray();
    render();

}


function deleteNotes(i) {

    trashTitles.push(titles[i]);
    trashNotes.push(notes[i]);

    titles.splice(i, 1);
    notes.splice(i, 1);

    render();
    saveArray();
}


function saveArray() {
    let titlesAsText = JSON.stringify(titles);
    let notesAsText = JSON.stringify(notes);
    localStorage.setItem('titles', titlesAsText);
    localStorage.setItem('notes', notesAsText);
}


function loadArray() {
    let titlesAsText = localStorage.getItem('titles');   // Objekte aus localStorage abrufen
    let notesAsText = localStorage.getItem('notes');
    if (titlesAsText && notesAsText) {
        titles = JSON.parse(titlesAsText);       //Text in ein JS Objekt umwandeln
        notes = JSON.parse(notesAsText);
        console.log('geladene Titel: ', titles);
        console.log('geladene Notizen: ', notes);
    }

}


function openTrashContainer() {
    renderTrash();
    let trashContainer = document.getElementById('trash_container');
    trashContainer.classList.remove('d-none');
}


function closeTrashContainer() {
    let trashContainer = document.getElementById('trash_container');
    trashContainer.classList.add('d-none');
}


function renderTrash() {
    let trashContainer = document.getElementById('trash_gallery');

    trashContainer.innerHTML = '';

    for (let i = 0; i < trashNotes.length; i++) {
        trashContainer.innerHTML += `
              <div class="deleted-note">
                  <b>${trashTitles[i]}</b>
                  <p>${trashNotes[i]}</p>
                  <img class="icon2" onclick="permanentDelete(${i})" src="img/papierkorb.png" alt="Garbage"> 
                  <img class="icon3" onclick="restoreNotes(${i})" src="img/restore.png" alt=""> 
              </div>`;
    }
}


function permanentDelete(i) {
    trashTitles.splice(i, 1);
    trashNotes.splice(i, 1);

    renderTrash();
}


function restoreNotes(i) {
    if (i >= 0 && i < trashTitles.length) {

        titles.push(trashTitles[i]);
        notes.push(trashNotes[i]);


        trashTitles.splice(i, 1);
        trashNotes.splice(i, 1);


        saveArray();
        renderTrash();
        render();
    } else {
        alert("Ungültiger Index");
    }
}
