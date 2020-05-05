'use strict'

const Post = use('App/Models/Post')
const { validate } = use('Validator')

class PostController {

  /**
   * Fetch all posts inside our database.
   *
   * ref: http://adonisjs.com/docs/4.1/lucid#_all
   */
  async index({ request, response }) {
    const posts = await Post.all()

    return response.json(posts)
  }

  /**
   * Store new data into storage.
   */
  async store({ request, response }) {

    // Get data from request
    const data = request.only(['title', 'body'])

    // Validation rules
    const rules = {
      title: 'required|min:3',
    }

    // Validate incoming request.
    const validation = await validate(data, rules)

    if (validation.fails()) {
      return validation.messages()
    }

    // Store request into storage.
    const post = await Post.create(data)

    return response.json(post)
  }

  /**
   * Show specified resource in storage.
   */
  async show({ params, response }) {
    const post = await Post.findOrFail(params.id)

    return response.json(post)
  }

  /**
   * Update specified resource in storage.
   */
  async update({ params, request, response }) {
    // Get data from request
    const data = request.only(['title', 'body'])

    // Validation rules
    const rules = {
      title: 'required|min:3',
    }

    // Validate incoming request.
    const validation = await validate(data, rules)

    if (validation.fails()) {
      return validation.messages()
    }

    const post = await Post.findOrFail(params.id)

    post.merge(data)

    await post.save()

    return response.json(post)
  }

  /**
   * Delete specified resource in storage.
   */
  async destroy({ params, response }) {
    const post = await Post.findOrFail(params.id)
    await post.delete()

    return response.json({ message: `Post ${params.id} deleted.`})
  }
}

module.exports = PostController
