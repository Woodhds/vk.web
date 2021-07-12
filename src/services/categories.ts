const categories = [
  {
    id: 1,
    title: 'Деньги',
    color: '#5caf75',
  },
  {
    id: 3,
    title: 'Еда',
    color: '#d00418',
  },
  {
    id: 10,
    title: 'Косметика',
    color: '#1a03e4',
  },
  {
    id: 12,
    title: 'Одежда',
    color: '#ff80ff',
  },
  {
    id: 11,
    title: 'Домашняя техника',
    color: '#008080',
  },
  {
    id: 13,
    title: 'Эл. техника',
    color: '#6cf97a',
  },
  {
    id: 15,
    title: 'Кондитерские изд.',
    color: '#35398c',
  },
  {
    id: 16,
    title: 'Для детей',
    color: '#ff1111',
  },
  {
    id: 17,
    title: 'Мебель',
    color: '#8c8484',
  },
  {
    id: 14,
    title: 'Сертификаты',
    color: '#944367',
  },
  {
    id: 18,
    title: 'Белье',
    color: '#004080',
  },
  {
    id: 19,
    title: 'Посуда',
    color: '#e8fc72',
  },
  {
    id: 20,
    title: 'Для авто',
    color: '#800003',
  },
  {
    id: 21,
    title: 'Билеты',
    color: '#7368f9',
  },
  {
    id: 22,
    title: 'Ювелирка',
    color: '#f0fc1b',
  },
  {
    id: 23,
    title: 'Посуда',
    color: '#a86466',
  },
  {
    id: 24,
    title: 'Для животных',
    color: '#35f3fd',
  },
  {
    id: 25,
    title: 'Не конкурс',
    color: '#676767',
  },
  {
    id: 26,
    title: 'Книги',
    color: '#1031eb',
  },
  {
    id: 27,
    title: 'Досуг',
    color: '#1e5fe6',
  },
  {
    id: 28,
    title: 'Спорт',
    color: '#c51014',
  },
  {
    id: 29,
    title: 'Комп. игры',
    color: '',
  },
  {
    id: 30,
    title: 'Бытовая химия',
    color: '#1e4bb3',
  },
]

class CategoriesService {
  getCategories() {
    return Promise.resolve(categories)
  }
}

const categoriesService = new CategoriesService()

export default categoriesService
