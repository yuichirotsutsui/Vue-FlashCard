const storageKey = "wordList";
let _data;

class DataManager {
  constructor() {
    this.load();
  }

  get data() {
    return _data;
  }

  load() {
    _data = JSON.parse(localStorage.getItem(storageKey)) || [];
  }

  save() {
    localStorage.setItem(storageKey, JSON.stringify(this.data));
  }
}

module.exports = new DataManager();
