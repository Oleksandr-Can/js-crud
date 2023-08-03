// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

// router.get Створює нам один ентпоїнт

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
    this.id = function generateUniqueNumber() {
      let min = 10000
      let max = 99999
      return (
        Math.floor(Math.random() * (max - min + 1)) + min
      )
    }

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
  getList = () => {
    return this.#list
  }
  //Додає переданий в аргументі товар в список створених товарів в приватному полі #list
  add = (product) => {
    this.#list.push(product)
  }
  //Знаходить товар в списку створених товарів за допомогою ID, яке повинно бути числом, та яке передається як аргумент
  getById = (id) => {
    return this.#list.find((product) => product.id === id)
  }
  //Оновлює властивості аргументу data в об’єкт товару, який був знайдений по ID. Можна оновлювати price, name, description
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
  static deleteById = (id) => {
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

let myObject = new Product()
console.log(myObject.id)
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
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.post('/product-create', function (req, res) {
  const { name, price, description } = req.body

  const product = new Product(name, price, description)

  Product.add(product)

  res.render('success-info', {
    style: 'success-info',
    info: 'Product is created',
  })
})
// ================================================================
// Підключаємо роутер до бек-енду
module.exports = router
