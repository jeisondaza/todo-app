import { LitElement, html, css} from 'https://unpkg.com/lit?module';

export class ModalWindow extends LitElement {
    static styles = css`
    :host{
        background-color: var(--cardColor);
        width: 30rem;
        height: 40rem;
        box-shadow: 0px 8px 20px #000000;
        border-radius: 10px;
        position: absolute;
        top: 50px;
        left: 50%;
        -ms-transform: translateX(-50%);
        transform: translateX(-50%);
    }

    .cancel{
        cursor: pointer;
        padding: 1rem;
        text-align: right;
        font-size: 28px;
    }

    .modal__contnr{
        padding-inline: 4rem;
    }

    .title__text, .descrip__text{
        margin-block-end: 0.5rem;
        font-size: 1.5rem;
    }
    .title__input, .descrip__input{
        width: 94%;
        margin-block-end: 2rem;
        background-color: var(--inputColor);
        border: 2px solid var(--inputColor);
        border-radius: 5px;
        color: var(--mainThemeTextColor);
        padding: 0.5rem;
        font-size: 1.2rem;
    }
    .title__input:focus, .descrip__input:focus{
        -webkit-appearance: none; 
        outline: none;
        border: 2px solid var(--primaryColor);
    }
    .title__input{
        height: 2.5rem;
    }
    .title__input::placeholder{
        font-weight: bold;
        color: #fa7f81;
    }
    .descrip__input{
        resize: none;
    }

    .btn__contnr{
        text-align: center;
    }
    .btn__save{
        color: var(--mainThemeTextColor);
        border: none;
        background-color: var(--action);
        border-radius: 8px;
        height: 3.5rem;
        width:60%;
        cursor: pointer
    }
    .btn__save:active{
        background-color: var(--actionAccent);
    }

    @media screen and (min-width: 1000px){
        :host{
            width: 40rem;
            height: 48rem;
        }
        .title__text, .descrip__text{
            font-size: 1.8rem; 
        }
        .title__input, .descrip__input{
            font-size: 1.8rem; 
        }
        .btn__save{
            font-size: 1.8rem; 
            height: 4.5rem;
        }
    }
`;

    constructor() {
        super();
        this.iconsFont = html`<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">`;
        this.inputTitle;
        this.inputDescrip;
        this.dataEdit;
        this.editingMode = false;
    }

    //Close the modal windows
    close() {
        this.hidden = true;
        this.editingMode = false;
        document.body.style.overflow = "auto";
    }

    //Event dispach of the modal button
    action() {
        if (this.inputTitle.value == '') {
            this.inputTitle.placeholder = "The title is required."
        }

        else if (this.editingMode) {
            const toDoData = {
                id: this.dataEdit.id,
                check: this.dataEdit.check,
                title: this.inputTitle.value,
                descrip: this.inputDescrip.value
            }
            this.prepareEvent(toDoData, "editedData");
            this.close();
        }

        else {
            const toDoData = {
                id: "",
                check: false,
                title: this.inputTitle.value,
                descrip: this.inputDescrip.value
            }
            this.prepareEvent(toDoData, "newData");
            this.close();
        }
    }

    prepareEvent(data, name) {
        const options = {
            detail: { data: data },
            bubbles: true,
            composed: true
        }
        const sentData = new CustomEvent(name, options);
        this.dispatchEvent(sentData);
    }

    clearInputs() {
        this.inputTitle.value = "";
        this.inputTitle.placeholder = "";
        this.inputDescrip.value = "";
    }

    //Here this receives the data to edit.
    editFromData(data) {
        this.dataEdit = data;
        this.inputTitle.value = this.dataEdit.title;
        this.inputTitle.placeholder = "";
        this.inputDescrip.value = this.dataEdit.descrip;
        this.editingMode = true;
    }

    render() {
        return html`
            ${this.iconsFont}
            <div class="cancel__contnr">
                <span class="material-icons cancel" @click="${this.close}">cancel</span>
            </div>
            <div action="${this.action}" class="modal__contnr">
                <p class="title__text">Title</p>
                <input type="text" name="title" class="title__input">
                <p class="descrip__text">Description</p>
                <textarea name="detail" cols="28" rows="8" class="descrip__input"></textarea>
            </div>
            <div class="btn__contnr">
                <button class="btn__save" @click="${this.action}">Save</button>
            </div>`;
    }

    firstUpdated() {
        this.inputTitle = this.renderRoot.querySelector('.title__input');
        this.inputDescrip = this.renderRoot.querySelector('.descrip__input');
    }
}
customElements.define('modal-window', ModalWindow);
