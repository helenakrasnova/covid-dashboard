export default class List {
  constructor() {
      this.apiData;
  }
  sendRequestForData() {
      let request = fetch('https://api.covid19api.com/summary')
      request.then(response => response.json()).then(data => {
          this.apiData = data
         let listItems = this.sortListArray(this.createListItems(this.apiData.Countries))
         document.body.appendChild(this.createList(listItems))
      })
  }

  createList(listItems) {
      const container = document.createElement('section');
      const listWrapper = document.createElement('div')
      const list = document.createElement('ul');
      listWrapper.classList.add('list-wrapper')
      container.classList.add('list-container');
      list.classList.add('main-list');
      listWrapper.appendChild(list);
      listItems.forEach(item => list.appendChild(item))
      listWrapper.appendChild(list);
      container.appendChild(this.createListHeader())
      container.appendChild(listWrapper)
      return container;
  }

  createListHeader() {
      const listHeaderWrapper = document.createElement('div');
      const listHeader = document.createElement('div');
      const listHeaderText = document.createElement('span');
      listHeaderText.classList.add('header-text');
      listHeaderText.textContent = 'Cases by Country/Region/District'
      listHeaderWrapper.classList.add('list-header-wrapper');
      listHeader.classList.add('list-header');
      listHeaderWrapper.appendChild(listHeaderText)
      listHeader.appendChild(listHeaderWrapper)
      return listHeader;
  }
  createListItems(array) {
      const listItemArray = [];
      array.forEach(item => {
          const li = document.createElement('li');
          const spanCases = document.createElement('span');
          const spanCountry = document.createElement('span');
          const caseCountryWrapper = document.createElement('p');
          caseCountryWrapper.classList.add('case-country-wrapper')
          spanCountry.classList.add('country')
          spanCases.classList.add('cases');
          spanCountry.textContent = item.Country
          if(item.Country.length >= 24) {
              spanCountry.textContent = item.CountryCode
          }
          spanCases.textContent = item.TotalConfirmed
          li.classList.add('list-item');
          caseCountryWrapper.appendChild(spanCases);
          caseCountryWrapper.appendChild(spanCountry);
          li.appendChild(caseCountryWrapper);
          li.appendChild(this.getCountryFlag(item))
          listItemArray.push(li)
      })
      return listItemArray;
  }

  sortListArray(array, state = true) {
      let sortedArray = array.sort((a, b) => {
          let firstItem = a.childNodes[0].childNodes[0].textContent;
          let secondItem = b.childNodes[0].childNodes[0].textContent
          return +firstItem < +secondItem ? 1: -1;
      });
      if(state) {

          return sortedArray
      } else {
          sortedArray = array.reverse()
          return sortedArray;
      }

  }
  getCountryFlag(country) {
      const flag = document.createElement('img');
      flag.classList.add(`${country.CountryCode}-flag`);
      flag.setAttribute('alt', `${country.Country} flag`);
      flag.setAttribute('src',`https://www.countryflags.io/${country.CountryCode}/flat/32.png`)
      return flag;
  }
  initList() {
      this.sendRequestForData()
  }
}

const list = new List('countries')
list.initList()
