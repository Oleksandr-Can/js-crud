const express = require('express')

const router = express.Router()

// ================================================================

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'index',
  })
  // ↑↑ сюди вводимо JSON дані
})

//=================================================================
class Product {
  //Приватне поле, яке містить список створених товарів
  static #list = []

  constructor(name, price, description) {
    //Унікальне число з 5 цифр, яке потрібно отримати через функцію Math.random
    function generateUniqueNumber() {
      let min = 10000
      let max = 99999
      return (
        Math.floor(Math.random() * (max - min + 1)) + min
      )
    }

    this.id = generateUniqueNumber()

    //Дата в форматі ISO рядка, яка створена та додана при створенні об’єкта в методі класу constructor
    this.createDate = new Date().toISOString()
    //Текстова назва товару
    this.name = name
    //Ціна товару, число
    this.price = price
    //Текстовий опис товару
    this.description = description
  }
  //Повертає список створених товарів
  static getList() {
    return this.#list
  }
  //Додає переданий в аргументі товар в список створених товарів в приватному полі #list
  static add = (product) => {
    this.#list.push(product)
  }
  //Знаходить товар в списку створених товарів за допомогою ID, яке повинно бути числом, та яке передається як аргумент
  static getById(id) {
    return this.#list.find((product) => product.id === id)
  }
  //Оновлює властивості аргументу data в об’єкт товару, який був знайдений по ID. Можна оновлювати price, name, description
  static update(product, data) {
    // Оновити дані продукту
    product.name = data.name
    product.price = data.price
    product.description = data.description
  }

  static updateById = (id, data) => {
    const product = this.getById(id)

    if (product) {
      this.update(product, data)
      return true
    } else {
      return false
    }
  }

  //Видаляє товар по його ID зі списку створених товарів
  static deleteById(id) {
    const index = this.#list.findIndex(
      (product) => product.id === id,
    )

    if (index !== -1) {
      this.#list.splice(index, 1)
      return true
    } else {
      return false
    }
  }
}

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/product-create', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('product-create', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'product-create',
  })
})
// ↑↑ сюди вводимо JSON дані

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.post('/product-create', function (req, res) {
  const { name, price, description, id } = req.body

  const product = new Product(name, price, description, id)

  Product.add(product)

  res.render('alert', {
    style: 'alert',
    info: 'Success',
    discribe: 'Product was created',
  })
})

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/product-list', function (req, res) {
  // res.render генерує нам HTML сторінку
  const list = Product.getList()
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('product-list', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'product-list',
    data: {
      products: {
        list,
        isEmpty: list.length === 0,
      },
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/product-edit', function (req, res) {
  // res.render генерує нам HTML сторінку
  const { id } = req.query

  const product = Product.getById(Number(id))

  // ↙️ cюди вводимо назву файлу з сontainer
  if (product) {
    // Вивести дані продукту в полях форми в container/product-edit
    res.render('product-edit', {
      style: 'product-edit',
      data: {
        products: {
          product,
          isEmpty: false,
        },
      },
    })
  } else {
    // Відобразити container/alert з інформацією Товар з таким ID не знайдено
    res.render('alert', {
      style: 'alert',
      info: 'Unsuccessfully',
      discribe: 'No product with this ID found',
    })
  }

  // ↑↑ сюди вводимо JSON дані
})

//=======================================================

// ↙️ тут вводимо шлях (PATH) до сторінки
router.post('/product-edit', function (req, res) {
  // Отримати оновлені дані товару з req.body
  const { name, price, description, id } = req.body

  // Оновити дані в товарі за допомогою id
  const result = Product.updateById(Number(id), {
    name,
    price,
    description,
  })

  res.render('alert', {
    style: 'alert',
    info: result ? 'Success' : 'Unsuccessfully',
    discribe: result
      ? 'Product was updated'
      : 'No product with this ID found',
  })
})

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/product-delete', function (req, res) {
  // res.render генерує нам HTML сторінку

  const { id } = req.query

  const result = Product.deleteById(Number(id))

  res.render('alert', {
    style: 'alert',
    info: result ? 'Success' : 'Unsuccessfully',
    discribe: result
      ? 'Product was deleted'
      : 'No product with this ID found',
  })

  // ↑↑ сюди вводимо JSON дані
})
// ================================================================

// Підключаємо роутер до бек-енду
module.exports = router
