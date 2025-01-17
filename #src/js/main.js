//enable scroll
function enableScroll() {
  if (document.querySelectorAll(".fixed-block")) {
      document.querySelectorAll(".fixed-block").forEach(block => block.style.paddingRight = '0px')
  }
  document.body.style.paddingRight = '0px'
  document.body.classList.remove("no-scroll")
}
//disable scroll
function disableScroll() {
  let paddingValue = window.innerWidth > 350 ? window.innerWidth - document.documentElement.clientWidth + 'px' : 0
  if (document.querySelectorAll(".fixed-block")) {
      document.querySelectorAll(".fixed-block").forEach(block => block.style.paddingRight = paddingValue)
  }
  document.body.style.paddingRight = paddingValue
  document.body.classList.add("no-scroll");
}

let animSpd = 400 //переменная для скорости анимации

// бургер
const burger = document.querySelector("#burger");

if (burger) {
  const subscribeButton = document.querySelector(".header__subscribe"); // Находим кнопку подписки
  const mobileLinks = document.querySelector(".header__links-mobile"); // Находим все мобильные ссылки
  const mobileMenu = document.querySelector(".mobile-menu"); // Находим мобильное меню
  const ham = document.querySelector(".ham"); // Находим иконку бургера

  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    subscribeButton.classList.toggle("active");
    mobileLinks.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    ham.classList.toggle("active");

    if (burger.classList.contains("active")) {
      disableScroll();
    } else {
      enableScroll();
    }
  });
}

// меню десткоп
const menuTriggers = document.querySelectorAll("[data-menu-open]");

if (menuTriggers.length) {
  menuTriggers.forEach((trigger) => {
    const menuId = trigger.getAttribute("data-menu-open"); // Получаем ID связанного меню
    const menu = document.querySelector(`[data-menu="${menuId}"]`); // Находим соответствующее меню
    const overlay = document.querySelector(".overlay"); // Находим оверлей
    const allMenus = document.querySelectorAll("[data-menu]"); // Находим все меню

    if (menu) {
      // Функция для отображения активного меню
      const showMenu = () => {
        // Закрыть все другие меню
        allMenus.forEach((otherMenu) => {
          if (otherMenu !== menu) {
            otherMenu.classList.remove("active");
          }
        });
        menu.classList.add("active");
        overlay.classList.add("show");
      };

      // Функция для скрытия меню
      const hideMenu = () => {
        menu.classList.remove("active");
        overlay.classList.remove("show");
      };

      // Наведение на триггер
      trigger.addEventListener("mouseenter", showMenu);

      // Наведение на меню
      menu.addEventListener("mouseenter", showMenu);

      // Уход с меню
      menu.addEventListener("mouseleave", (e) => {
        // Если мышь ушла с меню и не на триггер, скрываем меню
        if (!trigger.matches(":hover")) {
          hideMenu();
        }
      });
    }
  });

  // Найти все элементы меню и соответствующие заголовки
  const headerMenus = document.querySelectorAll(".header__menu");
  const header = document.querySelector(".header");

  // Функция для проверки состояния активных меню
  const updateHeaderRadius = () => {
    let hasActiveMenu = false;

    // Проверяем, есть ли хотя бы одно меню с классом .active
    headerMenus.forEach((menu) => {
      if (menu.classList.contains("active")) {
        hasActiveMenu = true;
      }
    });

    // Убираем или возвращаем радиус в зависимости от состояния
    if (hasActiveMenu) {
      header.style.borderBottomRightRadius = "0";
      header.style.borderBottomLeftRadius = "0";
    } else {
      header.style.borderBottomRightRadius = "52px";
      header.style.borderBottomLeftRadius = "52px";
    }
  };

  // Наблюдатели для всех меню
  headerMenus.forEach((menu) => {
    const observer = new MutationObserver(() => {
      updateHeaderRadius();
    });

    // Настраиваем наблюдение за изменением классов
    observer.observe(menu, { attributes: true, attributeFilter: ["class"] });
  });
}

// аккордион
new Accordion(".accordion-container");

// тултип
const buttons = document.querySelectorAll(".tooltip-btn");

if (buttons.length) {
  buttons.forEach((button) => {
    const tooltipId = button.getAttribute("data-tooltip-target");
    const tooltip = document.querySelector(`[data-tooltip="${tooltipId}"]`);

    if (tooltip) {
      // Открытие тултипа
      button.addEventListener("click", (e) => {
        e.stopPropagation(); // Предотвращаем закрытие тултипа при клике на кнопку
        closeAllTooltips(); // Закрываем другие тултипы
        tooltip.classList.toggle("active"); // Тогглим текущий тултип
        button.classList.toggle("active"); // Добавляем класс active кнопке
      });
    }

    // Закрытие тултипов при клике вне
    document.addEventListener("click", (e) => {
      closeAllTooltips();
      button.classList.remove("active"); // Добавляем класс active кнопке
    });
  });

  // Функция для закрытия всех тултипов
  function closeAllTooltips() {
    const allTooltips = document.querySelectorAll(".tooltip");
    allTooltips.forEach((tooltip) => {
      tooltip.classList.remove("active");
    });
  }
}

// модальное окно
const modalOpenBtn = document.querySelectorAll(".mod-open-btn")
const modalCloseBtn = document.querySelectorAll(".mod-close-btn")
const modal = document.querySelectorAll(".modal")

//open modal
function openModal(modal) {
  let activeModal = document.querySelector(".modal.open")
  if (!activeModal) {
      disableScroll()
  }
  if (activeModal) {
    activeModal.classList.remove("open")
  }
  modal.classList.add("open")
}
//close modal
function closeModal(modal) {
  modal.classList.remove("open")
  setTimeout(() => {
    enableScroll()
  }, animSpd);
}
// modal click outside
modal.forEach(mod => {
  mod.addEventListener("click", e => {
      if (!mod.querySelector(".modal__content").contains(e.target) || mod.querySelector(".btn-close").contains(e.target)){
          closeModal(mod)
      }
  })
})
// modal button on click
modalOpenBtn.forEach(btn => {
  btn.addEventListener("click", e => {
      e.preventDefault()
      let href = btn.getAttribute("data-modal")
      openModal(document.getElementById(href))
  })
})
// modal close button on click
modalCloseBtn.forEach(btn => {
  btn.addEventListener("click", e => {
      e.preventDefault()
      let href = btn.getAttribute("data-modal")
      closeModal(document.getElementById(href))
  })
})

//mask input
const inp = document.querySelectorAll('input[type=tel]')
if (inp) {
    inp.forEach(item => {
        Inputmask({ "mask": "+7 999 999-99-99" }).mask(item);
    })
}