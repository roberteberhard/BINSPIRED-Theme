const selectors = {
  customerBody:  document.body,
  customerAddresses: '[data-customer-addresses]',
  addressModal: '[aria-modal-expanded]',
  addressScroll: '[data-scroll]',
  addressCloseButton: 'button[data-close]',
  addAddressButton: 'button[data-add]',
  editAddressButton: 'button[data-edit]',
  deleteAddressButton: 'button[data-delete]',
  countrySelectors: 'select[data-country-selector]'
};

const attributes = {
  expanded: 'aria-modal-expanded'
};

class CustomerAddresses {
  constructor() {
    this.elements = this.getElements();
    if (Object.keys(this.elements).length === 0) return;
    this.setupcountrySelectors();
    this.setupEventListeners();
  }

  getElements() {
    const container = document.querySelector(selectors.customerAddresses);
    return container ? {
      container,
      addressScroll: container.querySelector(selectors.addressScroll),
      addressModal: container.querySelector(selectors.addressModal),
      closeButtons: document.querySelectorAll(selectors.addressCloseButton),
      addButtons: document.querySelectorAll(selectors.addAddressButton),
      editButtons: container.querySelectorAll(selectors.editAddressButton),
      deleteButtons: container.querySelectorAll(selectors.deleteAddressButton),
      countrySelectors: container.querySelectorAll(selectors.countrySelectors)
    } : {};
  }

  setupEventListeners() {
    this.elements.countrySelectors.forEach((element) => {
      element.addEventListener('change', this.handleCountryProvincesOnSelect);
    });
    this.elements.addButtons.forEach((element) => {
      element.addEventListener('click', this.handleShowAddressModalOnButtonClick);
    });
    this.elements.closeButtons.forEach((element) => {
      element.addEventListener('click', this.handleCloseAddressModalOnButtonClick.bind(this));
    });
    this.elements.editButtons.forEach((element) => {
      element.addEventListener('click', this.handleEditAddressModalOnButtonClick);
    });
    this.elements.deleteButtons.forEach((element) => {
      element.addEventListener('click', this.handleDeleteAddressOnButtonClick);
    });
  }

  setupcountrySelectors() {
    if(this.elements.countrySelectors.length < 1) return;
    this.elements.countrySelectors.forEach(select => {
      const selectedCountry = this.getSelectedCountry(select);
      if(!selectedCountry) return;

      const provinces = selectedCountry.dataset.provinces;
      const arrayOfProvince = JSON.parse(provinces);
      const provinceContainer = document.querySelector(`#AddressProvinceContainer${select.dataset.id}`);
      const provinceSelector = document.querySelector(`#AddressProvince${select.dataset.id}`);

      if(arrayOfProvince < 1) {
        provinceContainer.style.display = "none";
      } else {
        provinceContainer.style.display = "block";
      }

      provinceSelector.innerHTML = '';
      let options = '';
      for(let index = 0; index < arrayOfProvince.length; index++) {
        if(arrayOfProvince[index][0] === provinceSelector.getAttribute('value')) {
          options += `<option value="${arrayOfProvince[index][0]}" selected>${arrayOfProvince[index][0]}</option>`;
        } else {
          options += `<option value="${arrayOfProvince[index][0]}">${arrayOfProvince[index][0]}</option>`;
        }
      }
      provinceSelector.innerHTML = options;
    });
  }

  getSelectedCountry(select) {
    let option;
    let selectedOption;
    for (let index = 0; index < select.options.length; index++) {
      option = select.options[index];
      if(option.value === select.getAttribute('value')) {
        selectedOption = option;
        selectedOption.setAttribute('selected', 'selected');
        break;
      }
    }
    return selectedOption;
  }

  handleCountryProvincesOnSelect = ({ currentTarget }) => {
    const provinces = currentTarget.options[currentTarget.selectedIndex].dataset.provinces;
    const arrayOfProvince = JSON.parse(provinces);
    const provinceContainer = document.querySelector(`#AddressProvinceContainer${currentTarget.dataset.id}`);
    const provinceSelector = document.querySelector(`#AddressProvince${currentTarget.dataset.id}`);

    if(arrayOfProvince < 1) {
      provinceContainer.style.display = "none";
    } else {
      provinceContainer.style.display = "block";
    }

    provinceSelector.innerHTML = '';
    let options = '';
    for(let index = 0; index < arrayOfProvince.length; index++) {
      options += `<option value="${arrayOfProvince[index][0]}">${arrayOfProvince[index][0]}</option>`;
    }
    provinceSelector.innerHTML = options;
  }

  showAddressModal(target) {
    target.setAttribute(
      attributes.expanded,
      (target.getAttribute(attributes.expanded) === 'false').toString()
    );
  }

  hideAddressModal(target) {
    target.setAttribute(attributes.expanded, 'false');
  }

  fixScroll() {
    const { customerBody } = selectors;
    customerBody.style.overflowY = "hidden";
    this.elements.addressScroll.scroll({top:0,behavior:'auto'});
  }

  releaseScroll() {
    const { customerBody } = selectors;
    customerBody.style.overflowY = "";
  }

  handleShowAddressModalOnButtonClick = () => {
    this.fixScroll();
    this.showAddressModal(this.elements.addressModal);
  }

  handleEditAddressModalOnButtonClick = ({ currentTarget }) => {
    const id = currentTarget.dataset.id;
    const target = document.querySelector(`#${id}`);
    this.fixScroll();
    this.showAddressModal(target);
  }

  handleCloseAddressModalOnButtonClick = (event) => {
    event.preventDefault();
    const id = event.currentTarget.dataset.id;
    const target = document.querySelector(`#${id}`);
    this.releaseScroll();
    this.hideAddressModal(target);
  }

  handleDeleteAddressOnButtonClick = ({ currentTarget }) => {
    const url = currentTarget.dataset.url;
    const txt = currentTarget.dataset.confirmation;
    const confirmation = window.confirm(txt);
    if (confirmation) { document.querySelector(`form[action="${url}"]`).submit(); }
  }

}
