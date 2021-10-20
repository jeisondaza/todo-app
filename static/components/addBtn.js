import { LitElement, html, css } from 'https://unpkg.com/lit?module';

export class AddBtn extends LitElement {
    static styles = css`
        *{
            margin: 0;
        }
        .btn{
            background-color: var(--primaryColor);
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 4rem;
            border-radius: 100%;
            width: 6rem;
            height: 6rem;
            box-shadow: 0px 2px 5px #19191a ;
            cursor: pointer;
        }
        .btn:hover{
            background-color: var(--primaryColorH);
        }
        .btn:active{
            background-color: var(--primaryAccent);
        }
        @media screen and (min-width: 700px){
            .btn{
                width: 7rem;
                height: 7rem;
                font-size: 5rem;
            }
        }`;

    constructor() {
        super();
        this.callback;
    }

    callBack(callback) {
        this.callback = callback
    }

    action() {
        this.callback();
        document.body.style.overflow = "hidden";
    }

    render() {
        return html`<p class="btn" @click="${this.action}">+</p>`;
    }
}
customElements.define('add-btn', AddBtn);
