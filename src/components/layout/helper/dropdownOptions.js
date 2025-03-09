export const defaultDropdownOptions = {
  coverTrigger: false,
  constrainWidth: false,
};

export const dropdownOptions = {
  ...defaultDropdownOptions,
  closeOnClick: false,
  hover: true,
};

export const adminDropdownOptions = {
  ...dropdownOptions,
  alignment: 'right',
};

export const sidebarDropdownOptions = {
  ...defaultDropdownOptions,
  closeOnClick: true,
  inDuration: 300,
  outDuration: 200,
  onOpenStart: (el) => {
    if (window.innerWidth <= 992) {
      el.closest("li").classList.add("dropdown-expanded");
    }
  },
  onCloseEnd: (el) => {
    if (window.innerWidth <= 992) {
      el.closest("li").classList.remove("dropdown-expanded");
    }
  },
};
