import { LitElement, html, css} from 'https://unpkg.com/lit?module';

export class TabMenu extends LitElement {
    static properties = {
        tabs: { 
            converter: {fromAttribute: (valeu) => valeu.split(", ")}
        },
        underlineSize: {
            type: String
        },
    }

    static styles = css`
    :host{
        display: flex;
        justify-content: space-around;
        top: 0;
        position: sticky;
        background-color: var(--mainThemeColor);
        padding-block: 1rem;
    }`;

    constructor(){
        super();
        this.tabs;
        this.state;
        this.addEventListener("selected", this.setState);
    }
    
    geneTabs = (content) => html`<underline-btn content="${content}" class="${this.underlineSize}">
                                 </underline-btn>`;

    render() {
        return html`${this.tabs.map((tab) => this.geneTabs(tab))}`;
    }

    //this sets the default selection for the first option.
    firstUpdated(){
        this.deftSelec = this.renderRoot.querySelector('underline-btn').active = true;
        this.state = "All";
    }

    //these two methods are to set the state of the user selection.
    getNodeList = (element) => element.shadowRoot.querySelectorAll('underline-btn');

    setState(e){
        const data = e.detail.data;
        for (const item of this.getNodeList(e.target)) {
            item.active = false;
        }
        data.active = true;
        this.state = data.content;
    }

    getState(){
        return this.state;
    }
}
customElements.define('tab-menu', TabMenu);
