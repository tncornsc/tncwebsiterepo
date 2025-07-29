// playermodule.js

const PlayerModule = (() => {
  const key = "User_player_data";

  const baseData = {
    Inventory: [],
    Money: [], // Example: ["kromer:50", "glitchcoin:2"]
    Statuseffects: [],
    EquipmentHead: "",
    EquipmentBody: "",
    EquipmentWeapon: ""
  };

  function init() {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(baseData));
    }
  }

  function load() {
    init();
    return JSON.parse(localStorage.getItem(key));
  }

  function save(data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  function get(field) {
    const data = load();
    return data[field];
  }

  function set(field, value) {
    const data = load();
    data[field] = value;
    save(data);
  }

  function pushTo(field, value) {
    const data = load();
    if (Array.isArray(data[field])) {
      data[field].push(value);
      save(data);
    }
  }

  function removeFrom(field, value) {
    const data = load();
    if (Array.isArray(data[field])) {
      const index = data[field].indexOf(value);
      if (index !== -1) {
        data[field].splice(index, 1);
        save(data);
      }
    }
  }

  function modifyCurrency(type, amount) {
    const data = load();
    let found = false;
    data.Money = data.Money.map(entry => {
      const [t, a] = entry.split(":");
      if (t === type) {
        found = true;
        return `${t}:${Math.max(0, parseInt(a) + amount)}`;
      }
      return entry;
    });
    if (!found) data.Money.push(`${type}:${Math.max(0, amount)}`);
    save(data);
  }

  function getCurrency(type) {
    const data = load();
    for (let entry of data.Money) {
      const [t, a] = entry.split(":");
      if (t === type) return parseInt(a);
    }
    return 0;
  }

  return {
    load,
    save,
    get,
    set,
    pushTo,
    removeFrom,
    modifyCurrency,
    getCurrency
  };
})();
