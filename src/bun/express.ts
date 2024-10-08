import express from 'express'

express()
	.set("etag", false)
	.get('/', (req, res) => {
		res.setHeader('content-type', 'text/plain').send('Hi')
	})
	.post('/json', express.json(), ({ body }, res) => {
		res.json(body)
	})
	.get('/id/:id', ({ params: { id }, query: { name } }, res) => {
		res.setHeader('x-powered-by', 'benchmark')
			.setHeader('content-type', 'text/plain')
			.send(`${id} ${name}`)
	})
	.listen(3000)
