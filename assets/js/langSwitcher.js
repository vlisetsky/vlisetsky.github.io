// Инициализация текущего языка (по умолчанию — русский)
let currentLang = "ru";

// Функция для обновления текста на странице
function updateText(lang) {
  // Проверяем, есть ли данные для выбранного языка
  if (!langData[lang]) {
    console.error(`Нет данных для языка: ${lang}`);
    return;
  }

  // Обновляем текст всех элементов по их id
  Object.keys(langData[lang]).forEach((name) => {
    // Получаем коллекцию элементов с атрибутом name
    const elements = document.getElementsByName(name);

    if (elements.length > 0) {
      // Обновляем текст для всех найденных элементов
      elements.forEach((element) => {
        element.textContent = langData[lang][name];
      });
    } else {
      console.warn(`Элемент с name "${name}" не найден.`);
    }
  });
}

// Функция для обработки переключения языка
function handleLanguageSwitch(event) {
  event.preventDefault(); // Предотвращаем переход по ссылке
  const selectedLang = event.target.textContent.trim(); // Получаем текст выбранного языка

  // Определяем код языка на основе текста
  switch (selectedLang) {
    case "Русский":
      currentLang = "ru";
      break;
    case "English":
      currentLang = "en";
      break;
    case "Español":
      currentLang = "es";
      break;
    default:
      console.error(`Неизвестный язык: ${selectedLang}`);
      return;
  }

  // Обновляем текст на странице
  updateText(currentLang);

  // Обновляем отображение выбранного языка
  document.querySelector(".selected__lang").textContent = selectedLang;

  // Обновляем активный класс
  document.querySelectorAll("#langSwitcher .translate__lang ul li a").forEach((link) => {
    link.classList.remove("active");
  });
  event.target.classList.add("active");
}

// Добавляем обработчик событий для переключателя языка
function initLangSwitcher() {
  const langLinks = document.querySelectorAll("#langSwitcher .translate__lang ul li a");

  langLinks.forEach((link) => {
    link.addEventListener("click", handleLanguageSwitch);
  });

  // Устанавливаем текст на странице при загрузке
  updateText(currentLang);
}

// Инициализация переключателя языка при загрузке страницы
document.addEventListener("DOMContentLoaded", initLangSwitcher);