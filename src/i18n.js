import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

const resources = {
  en: {
    translation: {
      search: {
        placeholder: "Type a card name...",
        button: "Search",
        loading: "Loading cards...",
        noResults: "No cards found",
        empty: "Type a card name to search!",
        error: "Error searching cards",
        counter: "Life Counter",
      },
      pagination: {
        previous: "Previous",
        next: "Next",
        page: "Page {{current}} of {{total}}",
      },
      lifeCounter: {
        title: "Life Counter",
        poison: "Poison",
        roll: "Roll",
        changeLife: "Change Life",
        rolled: "You rolled {{value}}!",
      },
    },
  },
  pt: {
    translation: {
      search: {
        placeholder: "Digite o nome da carta...",
        button: "Buscar",
        loading: "Carregando cartas...",
        noResults: "Nenhuma carta encontrada",
        empty: "Digite o nome de uma carta para pesquisar!",
        error: "Erro ao buscar carta",
        counter: "Contador de Vida",
      },
      pagination: {
        previous: "Anterior",
        next: "Próxima",
        page: "Página {{current}} de {{total}}",
      },
      lifeCounter: {
        title: "Contador de Vida",
        poison: "Veneno",
        roll: "Rolar",
        changeLife: "Alterar Vida",
        rolled: "Você rolou {{value}}!",
      },
    },
  },
}

const savedLanguage = localStorage.getItem("i18nextLng")
const defaultLanguage = savedLanguage || "en"

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: defaultLanguage,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "i18nextLng",
      caches: ["localStorage"],
    },
  })

  if (!savedLanguage) {
    localStorage.setItem("i18nextLng", defaultLanguage)
  }

export default i18n
