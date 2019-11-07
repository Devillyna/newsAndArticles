function getSize(element) {
  const { offsetWidth, offsetHeight } = element;

  return { w: offsetWidth, h: offsetHeight };
}

function setPosition(element, x, y) {
  element.style.transform = `translateX(${x}px) translateY(${y}px)`;
}

function getPosition(event, element) {
  const { offsetX, offsetY } = event;
  const { w, h } = getSize(element);

  return { x: offsetX - w / 2, y: offsetY - h / 2 };
}

function createPenguin(wrapper) {
  const penguin = document.createElement("div");
  penguin.classList.add("penguin");

  const { w, h } = getSize(wrapper);

  const penguinController = new Penguin(0, 0, 3, w - 80, h - 80);

  window.addEventListener("resize", event => {
    const { w, h } = getSize(wrapper);
    penguinController.setSize(w - 80, h - 80);
  });

  wrapper.addEventListener("click", event => {
    const { x, y } = getPosition(event, penguin);
    penguinController.setEnd(x, y);
  });

  const loop = () => {
    if (!penguinController.isFinished()) {
      setPosition(
        penguin,
        penguinController.currentX,
        penguinController.currentY
      );
      penguinController.next();
    } else {
      penguinController.generateEnd();
    }

    window.requestAnimationFrame(() => loop());
  };
  loop();

  return penguin;
}

window.onload = () => {
  const wrapper = document.getElementById("penguinContainer");

  for (let i = 0; i < 10000; ++i) {
    const penguin = createPenguin(wrapper);

    wrapper.append(penguin);
  }
};
