import { LitElement, html, css } from 'https://unpkg.com/lit?module';

export class UnderlineBtn extends LitElement {
    static properties = {
        content: {
            type: String
        },
        active: {
            type: Boolean
        }
    }


    constructor() {
        super();
        this.content;
        this.active;
    }

    static styles = css`
        :host{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        :host(.S){
            width: var(--ulBtnS);
        }
        :host(.M){
            width: var(--ulBtnM);
        }
        :host(.L){
            width: var(--ulBtnL);
        }
        
        .btnText{
            margin: 0;
            cursor:pointer;
        }
        .btnText:hover{
            color: var(--primaryColor)
        }
        .selected{
            color: var(--primaryColor)
        }
        
        .underline{
            height: 3px;
            width: inherit;
            background-color: var(--primaryColor);
            border: none;
        }`;

    //Event is bubbled to parent element.
    selection() {
        const options = {
            detail: { data: this },
            bubbles: true,
            composed: true
        }
        const notiSelec = new CustomEvent("selected", options);
        this.dispatchEvent(notiSelec);
    }

    render() {
        return html`<p class="btnText ${this.active ? " selected" : "" }" @click=${this.selection}>${this.content}</p>
<hr ?hidden=${!this.active} class="underline">`;
    }
}
customElements.define('underline-btn', UnderlineBtn);
