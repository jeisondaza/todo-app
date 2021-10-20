export class View {

    constructor() {
        this.model;
        this.menu = this.getElement('tab-menu');
        this.toDoList = this.getElement('.toDos');
        this.addBtn = this.getElement('add-btn');
        this.modal = this.getElement('modal-window');

        this.menu.addEventListener('click', this.render);
        this.addBtn.callBack(() => { this.modal.hidden = false; this.modal.clearInputs() });
        this.modal.addEventListener('newData', this.createToDo);
        this.modal.addEventListener('editedData', this.editToDo);
        this.toDoList.addEventListener('editData', this.getEdit);
        this.toDoList.addEventListener('deleteToDo', this.toDelete);
        this.toDoList.addEventListener('checkToDo', this.checkToDo);
    }

    setModel(model) {
        this.model = model;
    }

    render = () => {
        this.clearView();
        const toDosForRender = this.optionRender(this.menu.getState());
        for (const toDo of toDosForRender) {
            let toDoTag = document.createElement("to-do");
            toDoTag.data = toDo;
            toDoTag.id = toDo.id;
            this.toDoList.appendChild(toDoTag);
        }
    }

    clearView() {
        const toDosList = document.querySelectorAll("to-do")
        for (const toDo of toDosList) {
            toDo.remove();
        }
    }

    renderEdition(singleToDo) {
        let toDo = document.getElementById(singleToDo.id);
        toDo.data = singleToDo;
    }

    createToDo = (e) => {
        const data = e.detail.data;
        this.model.addToDo(data);
    }

    getEdit = (e) => {
        const data = e.detail.data;
        this.modal.editFromData(data);
        this.modal.hidden = false;
    }

    editToDo = (e) => {
        const data = e.detail.data;
        this.model.editToDo(data);
    }

    toDelete = (e) => {
        const data = e.detail.data;
        this.model.deleteDoTo(data);
    }

    checkToDo = (e) => {
        const data = e.detail.data;
        this.model.editToDo(data);
    }

    //This pairs the filter options on the menu with the corresponding methods.
    optionRender(option) {
        let toDosForRender;
        if (option == "All") {
            toDosForRender = this.model.getAll();
        }
        else if (option == "Checked") {
            toDosForRender = this.model.getChecked();
        }
        else if (option == "Unchecked") {
            toDosForRender = this.model.getUnchecked();
        }
        return toDosForRender;
    }

    //This generalizes the queries to the DOM.
    getElement = (selector) => document.querySelector(selector);

}