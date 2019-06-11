let noteContents = [];

//================ Controller ==================
class NoteControl {
    constructor(noteView) {
        this.noteView = noteView;
    }
    init() {
        this.noteView.init();
    }
    getNotes() {
        return noteContents;
    }
    addNotes(note) {
        noteContents.push(note);
    }
    removeNote(index) {
        noteContents.splice(index, 1);
    }
    editNotes(index, content, color, date) {
        let tmp = {};
        tmp['content'] = content;
        tmp['color'] = color;
        tmp['date'] = date;
        noteContents[index] = tmp;
    }
}


// ============== View ========================= 
class NoteView {
    init() {
        this.renderNoteListModule();
        this.addNoteModule();
        this.editNoteModule();
    }
    resetInputBox() {
        document.getElementById('note-content').value = '';
    }
    buttonClick(input) {
        let index = input.target.getAttribute('data-index');
        let action = input.target.getAttribute('action');

        if (action == 'delete') {
            noteApp.removeNote(index);
            this.renderNoteListModule();
        } else if (action == 'edit') {
            this.switchToEditMode(index);
            this.addNoteIndexToEdit(index);
        }
    }
    switchToEditMode(index) {
        document.getElementById('add-note-btn').style.display = 'none';
        document.getElementById('edit-note-btn').style.display = 'block';
        document.getElementById('note-content').value = noteContents[index].content;
        document.getElementById('color').value = noteContents[index].color;
    }
    addNoteModule() {
        const $addNote = document.getElementById('add-note-btn');
        $addNote.addEventListener("click", this.addNotesClick.bind(this));
    }
    editNoteModule() {
        const $editNote = document.getElementById('edit-note-btn');
        $editNote.addEventListener("click", this.editNotesClick.bind(this));
    }
    addNoteIndexToEdit(index) {
        const $editNote = document.getElementById('edit-note-btn');
        $editNote.setAttribute('data-index', index);
    }
    editNotesClick(input) {
        document.getElementById('edit-note-btn').style.display = 'none';
        document.getElementById('add-note-btn').style.display = 'block';
        let index = document.getElementById('edit-note-btn').getAttribute('data-index')
        let content = document.getElementById('note-content').value;
        let color = document.getElementById('color').value;
        let date = this.createTime();
        noteApp.editNotes(index, content, color, date);
        this.renderNoteListModule();
        this.resetInputBox();
    }
    addNotesClick(e) {
        const $noteDetails = document.getElementById('note-content');
        const $noteColor = document.getElementById('color');
        let tmpObj = {};
        tmpObj['content'] = $noteDetails.value;
        tmpObj['color'] = $noteColor.value;
        tmpObj['date'] = this.createTime();
        noteApp.addNotes(tmpObj);
        this.renderNoteListModule();
        this.resetInputBox();
    }
    createTime() {
        let time = new Date();
        time = time.toLocaleString('en-US', { month: 'long', day: '2-digit', hour: 'numeric', minute: 'numeric', hour12: true });
        return time;
    }
    renderNoteListModule() {
        const notes = noteApp.getNotes();
        const $ContactListUI = document.getElementById('note-list'); // cache #contact-list DOM
        $ContactListUI.innerHTML = ''; // clear HTML from the DOM
        for (let i = 0, len = notes.length; i < len; i++) {
            let $li = document.createElement('div');
            $li.setAttribute('class', 'note-list-item');
            $li.setAttribute('data-index', i);
            $li.style.borderLeft = '10px solid ' + (notes[i].color).toLowerCase();

            let $header = document.createElement("div");
            $header.setAttribute('class', 'note-header');
            $header.style.color = (notes[i].color).toLowerCase();
            $header.setAttribute('data-index', i);
            $header.innerText = `${"Note " + parseInt(i + 1)}`;

            let $trashIcon = document.createElement("button");
            $trashIcon.setAttribute('class', 'far fa-trash-alt');
            $trashIcon.setAttribute('data-index', i);
            $trashIcon.setAttribute('action', 'delete');
            $trashIcon.addEventListener("click", this.buttonClick.bind(this));


            let $editIcon = document.createElement("button");
            $editIcon.setAttribute('class', 'fas fa-pencil-alt');
            $editIcon.setAttribute('data-index', i);
            $editIcon.setAttribute('action', 'edit');
            $editIcon.addEventListener("click", this.buttonClick.bind(this));

            let $iconHolder = document.createElement("div");
            $iconHolder.setAttribute('class', 'icon-holder');
            $iconHolder.append($trashIcon)
            $iconHolder.append($editIcon)



            let $content = document.createElement("div");
            $content.setAttribute('class', 'note-content');
            $content.innerText = `${notes[i]['content']}`;

            let $date = document.createElement("div");
            $date.setAttribute('class', 'date-time');
            $date.innerText = `${notes[i]['date']}`;

            //$li.appendChild = document.createElement('div')
            $li.append($header)//`${"Note " + parseInt(i+1)},${notes[i]['content']}`;
            $li.append($iconHolder)
            $li.append($content)
            $li.append($date)
            $ContactListUI.append($li);
        }
    }
}


const noteView = new NoteView();
const noteApp = new NoteControl(noteView);
noteApp.init();
