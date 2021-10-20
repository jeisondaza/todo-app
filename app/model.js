export class Model {

    constructor() {
        this.view;
        this.idCount;
        this.toDos = JSON.parse(localStorage.getItem("toDosList"));
        //this create a [] if localStorage is empity.
        if (!this.toDos || this.toDos.length < 1) {
            this.idCount = 1
            this.toDos = []
        } else {
            this.idCount = this.toDos.length + 1;
        }
    }

    setView(view) {
        this.view = view;
    }

    getToDos() {
        if (!JSON.parse(localStorage.getItem("toDosList"))) {
            return this.toDos;
        }
        return JSON.parse(localStorage.getItem("toDosList"));
    }

    getAll() {
        return this.getToDos();
    }

    getChecked() {
        const filter = this.getToDos().filter(toDo => toDo.check == true);
        return filter;
    }

    getUnchecked() {
        const filter = this.getToDos().filter(toDo => toDo.check == false);
        return filter;
    }

    addToDo(toDoData) {
        const toDoReady = this.setId(toDoData);
        this.toDos.push(toDoReady)
        this.save(this.toDos);
        this.view.render(toDoReady);
    }

    setId(toDo) {
        toDo.id = this.idCount;
        this.idCount++;
        return toDo;
    }

    editToDo(toDo) {
        this.toDos[toDo.id - 1] = toDo;
        this.save(this.toDos);
        this.view.renderEdition(toDo);
    }

    deleteDoTo(id) {
        this.toDos = this.toDos.filter(toDo => toDo.id != id);
        this.save(this.toDos);
    }

    save(toDos) {
        const toDosConverted = JSON.stringify(toDos);
        localStorage.setItem('toDosList', toDosConverted);
    }

}