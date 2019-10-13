export const stringToHTML = str => {
  const el = document.createElement('div');
  el.innerHTML = str;
  return el.firstChild;
};
