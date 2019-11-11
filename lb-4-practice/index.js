function getSize(element) {
  const { offsetWidth, offsetHeight } = element;

  return { w: offsetWidth, h: offsetHeight };
}

function setPosition(element, x, y) {
  element.style.transform = `translateX(${x}px) translateY(${y}px)`;
}

function getPosition(event) {
  const { offsetX, offsetY } = event;

  return { x: offsetX, y: offsetY };
}

function createPenguin(wrapper) {
  return new Promise(resolve =>
    setTimeout(() => {
      const penguin = document.createElement("div");
      penguin.classList.add("penguin");

      const { w, h } = getSize(wrapper);

      const penguinController = new Penguin(0, 0, 80, 80, 3, w, h);

      window.addEventListener("resize", event => {
        const { w, h } = getSize(wrapper);
        penguinController.setSize(w, h);
        penguinController.generateEnd();
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

      resolve(penguin);
    }, 0)
  );
}

window.onload = () => {
  const wrapper = document.getElementById("penguinContainer");

  for (let i = 0; i < 100; ++i) {
    createPenguin(wrapper).then(penguin => {
      wrapper.append(penguin);
    });
  }
};
