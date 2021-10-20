import { LitElement, html, css } from 'https://unpkg.com/lit?module';


export class ToDo extends LitElement {

    static properties = {
        data: { type: Object },
    };

    static styles = css`
        :host{
            background-color: var(--cardColor);
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-radius: 5px;
            padding: 1rem;
            width: 100%;
            box-sizing: border-box;
        }
        :host(.checked){
            background-color: var(--cardChecked);
            color: var(--checkedColor);
        }

        .title, .options{
            display: flex;
            align-items: center;
            column-gap: 1rem;
        }

        input{
            cursor:pointer;
        }

        .material-icons{
            cursor: pointer;
        }
        .material-icons:active{
            background-color: var(--cardChecked);
        }
        .edit{
            color: white;
        }
        .danger{
            color: var(--danger);
        }

        @media screen and (min-width: 700px){
            .material-icons{
                font-size: 3rem;
            }
        }

        @media screen and (min-width: 1000px){
            :host{
                padding: 1rem 2rem;
            }

            input{
                width: 2rem;
                height: 2rem;
            }

            .title{
                font-size: 2rem;
            }
            
            .options{
                column-gap: 2rem;
            }
        }`;

    constructor() {
        super();
        this.iconsFont = html`<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">`;
        this.check;
        this.data;
    }

    checkedToDo() {
        this.classList.toggle("checked")
        this.data.check = this.check.checked
        const options = {
            detail: { data: this.data },
            bubbles: true,
            composed: true
        }
        const editData = new CustomEvent("checkToDo", options);
        this.dispatchEvent(editData);
    }

    edit() {
        const options = {
            detail: { data: this.data },
            bubbles: true,
            composed: true
        }
        const editData = new CustomEvent("editData", options);
        this.dispatchEvent(editData);
    }

    delete() {
        const options = {
            detail: { data: this.data.id },
            bubbles: true,
            composed: true
        }
        const editData = new CustomEvent("deleteToDo", options);
        this.dispatchEvent(editData);
        this.remove();
    }

    render() {
        return html`
        ${this.iconsFont}
        <div class="title">
            <input type="checkbox" @click="${this.checkedToDo}">
            <p>${this.data.title}</p>
        </div>
        <div class="options">
            <span class="material-icons edit" @click="${this.edit}">edit</span>
            <span class="material-icons danger" @click="${this.delete}">delete</span>
        </div>
        `;
    }

    firstUpdated() {
        this.check = this.renderRoot.querySelector('input');
        if (this.data.check) {
            this.check.checked = true
            this.classList.add("checked");
        }
    }
}
customElements.define('to-do', ToDo);
