export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    addItem(item) {
        this._element = this._renderer(item);
        this._container.prepend(this._element);
    }

    renderItems() {
        this._items.forEach((item) => this.addItem(item));
        this._element = undefined;
    }

    _clearContainer() {
        this._container.innerHTML = '';
    }

    setItems(items) {
        this._items = items;
        this._clearContainer();
        this.renderItems();
    }
}