import express from 'express'
import serverless from 'serverless-http'
import bodyParser from 'body-parser'

const { pool, client } = require('./config/db')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/posts/', async (req, res) => {
  const query = 'SELECT * FROM posts'
  client.query(query, (err, results) => {
    if (err) {
      const response = { data: null, message: err.message }
      res.send(response)
    }

    const posts = [...results]
    const response = {
      data: posts,
      message: 'All posts retrieved.'
    }
    res.send(response)
  })
})

app.get('/posts/:id', (req, res) => {
  const id = req.params.id
  const query = `SELECT * FROM posts WHERE id=${id}`
  client.query(query, (err, results) => {
    if (err) {
      const response = { data: null, message: err.message }
      res.send(response)
    }

    const post = results[0]
    const response = {
      data: post,
      message: `Post ${post.title} retrieved.`
    }
    res.status(200).send(response)
  })
})

app.post('/post/', (req, res) => {
  const { title, content, image } = req.body

  const query = `INSERT INTO posts (title, content, imaage) VALUES ('${title}', '${content}', '${image}')`
  client.query(query, (err, results) => {
    if (err) {
      const response = { data: null, message: err.message }
      res.send(response)
    }

    const { id } = results
    const post = { id, title, content, image }
    const response = {
      data: post,
      message: `Post ${title} added.`
    }
    res.status(201).send(response)
  })
})

app.put('/post/:id', (req, res) => {
  const { id } = req.params
  const query = `SELECT * FROM posts WHERE id=${id} LIMIT 1`
  client.query(query, (err, results) => {
    if (err) {
      const response = { data: null, message: err.message }
      res.send(response)
    }

    const { id, title, content, image } = { ...results[0], ...req.body }
    const query = `UPDATE posts SET title='${title}', content='${content}', image='${image}' WHERE id='${id}'`
    client.query(query, (err, results) => {
      if (err) {
        const response = { data: null, message: err.message }
        res.send(response)
      }

      const post = {
        id,
        title,
        content,
        image
      }
      const response = {
        data: post,
        message: `Post ${title} is updated.`
      }
      res.send(response)
    })
  })
})

app.delete('/post/:id', (req, res) => {
  const { id } = req.params
  const query = `DELETE FROM posts WHERE id=${id}`
  client.query(query, (err, results) => {
    if (err) {
      const response = { data: null, message: err.message }
      res.send(response)
    }

    const response = {
      data: null,
      message: `Post with id: ${id} deleted.`
    }
    res.send(response)
  })
})

app.all('*', (req, res) => {
  const response = { data: null, message: 'Route not found!' }
  res.status(400).send(response)
})

module.exports.handler = serverless(app)
