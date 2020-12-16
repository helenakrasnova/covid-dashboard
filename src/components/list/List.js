import ListServices from '../../services/ListService';

export default class List {
  constructor() {
    this.listServices = new ListServices();
  }

  createList(listItems) {
    const container = document.createElement('section');
    const listWrapper = document.createElement('div');
    const list = document.createElement('ul');
    listWrapper.classList.add('list-wrapper');
    container.classList.add('list-container');
    list.classList.add('main-list');
    listWrapper.appendChild(list);
    listItems.forEach((item) => list.appendChild(item));
    listWrapper.appendChild(list);
    container.appendChild(this.createListHeader());
    container.appendChild(listWrapper);
    return container;
  }

  createListHeader() {
    const listHeaderWrapper = document.createElement('div');
    const listHeader = document.createElement('div');
    const listHeaderText = document.createElement('span');
    listHeaderText.classList.add('header-text');
    listHeaderText.textContent = 'Cases by Country/Region/District';
    listHeaderWrapper.classList.add('list-header-wrapper');
    listHeader.classList.add('list-header');
    listHeaderWrapper.appendChild(listHeaderText);
    listHeader.appendChild(listHeaderWrapper);
    return listHeader;
  }

  createListItems(array) {
    const listItemArray = [];
    array.forEach((item) => {
      const li = document.createElement('li');
      const spanCases = document.createElement('span');
      const spanCountry = document.createElement('span');
      const caseCountryWrapper = document.createElement('p');
      caseCountryWrapper.classList.add('case-country-wrapper');
      spanCountry.classList.add('country');
      spanCases.classList.add('cases');
      spanCountry.textContent = item.Country;
      if (item.Country.length >= 24) {
        spanCountry.textContent = item.CountryCode;
      }
      if (item.Country === 'Bosnia and Herzegovina') {
        spanCountry.textContent = 'Bosnia';
      }
      spanCases.textContent = item.TotalConfirmed;
      li.classList.add('list-item');
      caseCountryWrapper.appendChild(spanCases);
      caseCountryWrapper.appendChild(spanCountry);
      li.appendChild(caseCountryWrapper);
      li.appendChild(this.getCountryFlag(item));
      listItemArray.push(li);
    });
    return listItemArray;
  }

  sortListArray(array, state = true) {
    let sortedArray = array.sort((a, b) => {
      const firstItem = a.childNodes[0].childNodes[0].textContent;
      const secondItem = b.childNodes[0].childNodes[0].textContent;
      return +firstItem < +secondItem ? 1 : -1;
    });
    if (state) {
      return sortedArray;
    }
    sortedArray = array.reverse();
    return sortedArray;
  }

  getCountryFlag(country) {
    const flag = document.createElement('img');
    flag.classList.add(`${country.CountryCode}-flag`);
    flag.setAttribute('alt', `${country.Country} flag`);
    flag.setAttribute('src', `https://www.countryflags.io/${country.CountryCode}/flat/32.png`);
    return flag;
  }

  async initList() {
    const dataFromApi = await this.listServices.getTotalCases();
    const listItems = this.sortListArray(this.createListItems(dataFromApi));
    const list = this.createList(listItems);
    return list;
  }
}
