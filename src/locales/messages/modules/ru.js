export default {
  app: {
    name: 'Урок',
    defaultUserImage: '/img/default-user.png'
  },
  content: {
    username: 'Логин',
    password: 'Пароль',
    login: 'Войти',
    logout: 'Выйти',
    fullName: 'ФИО',
    create: 'Создать',
    add: 'Добавить',
    enterValue: 'Введите значение',
    goBack: 'Назад',
    tryFollowingPages: 'Пожалуйста, попробуйте перейти на одну из следующих страниц:'
  },
  menu: {
    main: 'Главная',
    heroCreate: 'Добавить героя'
  },
  validation: {
    required: 'Необходимо заполнить поле',
    requiredAllFields: 'Необходимо заполнить все поля',
    requiredAllTableFields: 'Необходимо заполнить все поля таблицы',
    requiredAllTablesFields: 'Необходимо заполнить все поля таблиц',
    email: 'Введите корректный e-mail',
    integer: 'Введите целое число',
    decimal: 'Введите число',
    url: 'Введите корректную ссылку. Например "https://site.com"',
    minValue: 'Введите число не меньше {min}',
    maxValue: 'Введите число не больше {max}',
    maxLength: 'Поле должно состоять не более чем из {size} символов',
    employeeTypeRule: 'Необходимо выбрать как минимум один тип сотрудника',
    sectionsRule: 'Необходимо выбрать как минимум одну секцию',
    sectionsValueRule: 'Необходимо заполнить все поля активных секций'
  },
  imageCropUpload: {
    hint: 'Для загрузки нажмите или перетащите файл в данную область',
    loading: 'Загрузка…',
    noSupported: 'Не поддерживается браузером, пожалуйста, используйте Internet Explorer 10+ или другие браузеры',
    success: 'Загрузка завершена',
    fail: 'Ошибка при загрузке',
    preview: 'Превью',
    btn: {
      off: 'Отмена',
      close: 'Закрыть',
      back: 'Назад',
      save: 'Сохранить'
    },
    error: {
      onlyImg: 'Только изображения',
      outOfSize: 'Изображение превышает ограничение размера: ',
      lowestPx: 'Размер изображения слишком мал. Ожидается по крайней мере: '
    }
  },
  hero: {
    heroAdd: 'Добавить героя',
    mainPhoto: 'Фотография героя',
    shortDescription: 'Краткое описание',
    description: 'Описание'
  }
}
