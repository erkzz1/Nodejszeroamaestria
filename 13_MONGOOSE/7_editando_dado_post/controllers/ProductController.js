const Product = require('../models/Product')

module.exports = class ProductController {
  static async showProducts(req, res) {
    const products = await Product.find().lean() // find para encontrar e lean para formatar os dados para o handlebars
    // entendelos e mostrar para o usuário

    res.render('products/all', { products })
  }

  static createProduct(req, res) {
    res.render('products/create')
  }

  static async createProductPost(req, res) {
    const name = req.body.name
    const image = req.body.image
    const price = req.body.price
    const description = req.body.description

    const product = new Product({ name, image, price, description })

    await product.save()

    res.redirect('/products')
  }

  static async getProduct(req, res) {
    const id = req.params.id

    const product = await Product.findById(id).lean()

    res.render('products/product', { product })
  }

  //   static async removeProduct(req, res) {
  //     const id = req.params.id

  //     await Product.removeProductById(id)

  //     res.redirect('/products')
  //   }

  static async editProduct(req, res) {
    const id = req.params.id

    const product = await Product.findById(id).lean()

    res.render('products/edit', { product })
  }

  static async editProductPost(req, res) {
    const id = req.body.id
    const name = req.body.name
    const image = req.body.image
    const price = req.body.price
    const description = req.body.description

    await Product.updateOne({ _id: id }, { name, image, price, description }).lean()

    res.redirect('/products')
  }
}
