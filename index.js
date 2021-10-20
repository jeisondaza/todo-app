import './static/components/addBtn.js'
import './static/components/modalWindow.js'
import './static/components/tabMenu.js'
import './static/components/toDo.js'
import './static/components/underlineBtn.js'

import { View } from './app/view.js'
import { Model } from './app/model.js'

document.addEventListener('DOMContentLoaded', () => {
    const model = new Model();
    const view = new View();

    model.setView(view);
    view.setModel(model);

    view.render();
});