window.onload = function() {
  //инкапсуляция
  const moneyConverter = (() => {
    const coefficients = {
      UAH: 24.97,
      USD: 1,
      EUR: 0.9
    };

    function moneyConverter({ from, to }) {
      if (!coefficients[from.type] || !coefficients[to.type]) {
        throw new Error('converting is impossible');
      }

      const output =
        (coefficients[to.type] * from.value) / coefficients[from.type];

      return output;
    }

    return moneyConverter;
  })();

  document.getElementById('from').addEventListener('input', event => {
    // +event - перевод в численное значение, таргет - хранит ссылку на элемент, из которого было вызвано событие, event - объект со свойствами события
    const value = +event.target.value;
    const type = document.getElementById('from-type').value;

    const toType = document.getElementById('to-type').value;

    document.getElementById('to').value = moneyConverter({
      from: { value, type },
      to: { type: toType }
    });
  });

  document.getElementById('to').addEventListener('input', event => {
    const value = +event.target.value;
    const type = document.getElementById('from-type').value;

    const toType = document.getElementById('to-type').value;

    document.getElementById('from').value = moneyConverter({
      from: { value, type: toType },
      to: { type }
    });
  });
};
