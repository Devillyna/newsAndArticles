export const stringToHTML = str => {
  const el = document.createElement('div');
  el.innerHTML = str;
  return el.firstChild;
};

export const readFile = file =>
  new Promise(resolve => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      resolve(reader.result);
    });

    reader.readAsDataURL(file);
  });
