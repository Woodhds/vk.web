const categories = [
  {
    id: 1,
    title: 'Деньги',
    color: '#5caf75',
    hidden: false,
  },
  {
    id: 3,
    title: 'Еда',
    color: '#d00418',
    hidden: false,
  },
  {
    id: 10,
    title: 'Косметика',
    color: '#1a03e4',
    hidden: false,
  },
  {
    id: 12,
    title: 'Одежда',
    color: '#ff80ff',
    hidden: false,
  },
  {
    id: 11,
    title: 'Домашняя техника',
    color: '#008080',
    hidden: false,
  },
  {
    id: 13,
    title: 'Эл. техника',
    color: '#6cf97a',
    hidden: false,
  },
  {
    id: 15,
    title: 'Кондитерские изд.',
    color: '#35398c',
    hidden: true,
  },
  {
    id: 16,
    title: 'Для детей',
    color: '#ff1111',
    hidden: false,
  },
  {
    id: 17,
    title: 'Мебель',
    color: '#8c8484',
    hidden: false,
  },
  {
    id: 14,
    title: 'Сертификаты',
    color: '#944367',
    hidden: false,
  },
  {
    id: 18,
    title: 'Белье',
    color: '#004080',
    hidden: false,
  },
  {
    id: 19,
    title: 'Посуда',
    color: '#e8fc72',
    hidden: false,
  },
  {
    id: 20,
    title: 'Для авто',
    color: '#800003',
    hidden: false,
  },
  {
    id: 21,
    title: 'Билеты',
    color: '#7368f9',
    hidden: false,
  },
  {
    id: 22,
    title: 'Ювелирка',
    color: '#f0fc1b',
    hidden: false,
  },
  {
    id: 24,
    title: 'Для животных',
    color: '#35f3fd',
    hidden: false,
  },
  {
    id: 25,
    title: 'Не конкурс',
    color: '#676767',
    hidden: false,
  },
  {
    id: 26,
    title: 'Книги',
    color: '#1031eb',
    hidden: false,
  },
  {
    id: 27,
    title: 'Досуг',
    color: '#1e5fe6',
    hidden: false,
  },
  {
    id: 28,
    title: 'Спорт',
    color: '#c51014',
    hidden: false,
  },
  {
    id: 29,
    title: 'Комп. игры',
    color: '',
    hidden: false,
  },
  {
    id: 30,
    title: 'Бытовая химия',
    color: '#1e4bb3',
    hidden: false,
  },
  {
    id: 31,
    title: 'Медицина',
    color: '#D1D5DB',
    hidden: false,
  },
  {
    id: 32,
    title: 'Разное',
    color: '',
    hidden: false,
  },
  {
    id: 33,
    title: 'Инструменты и ремонт',
    color: '#FECACA',
    hidden: false,
  },
  {
    id: 34,
    title: 'Канцтовары',
    color: '#C7D2FE',
    hidden: false,
  },
]

class CategoriesService {
  getCategories() {
    return Promise.resolve(categories.filter(x => !x.hidden))
  }
}

const categoriesService = new CategoriesService()

export default categoriesService
