const express = require('express'),
			bodyParser = require('body-parser'),
			Sequelize = require('sequelize')
			

const sequelize = new Sequelize('hristache_10691', 'root', '', {
	dialect : 'mysql',
	define : {
		timestamps : false
	}
})

//detalii tabela evenimente
let Eveniment = sequelize.define('eveniment', {
	nume : {
		type : Sequelize.STRING,
		allowNull : false,
		validate : {
			len : [3, 40]
		}
	},
	data_inceput : {
		type : Sequelize.DATE,
		allowNull : false,
		defaultValue : Sequelize.NOW
	},
	data_final : {
		type : Sequelize.DATE,
		allowNull : false,
		defaultValue : Sequelize.NOW
	}
}, {
	underscored : true
})
// sf detalii tabela evenimente

//detalii tabela detalii
let Detalii = sequelize.define('detalii', {
	locatie : {
		type : Sequelize.STRING,
		allowNull : false,
		validate : {
			len : [2, 40]
		}
	},
	detalii : {
		type : Sequelize.TEXT,
	allowNull : false
	},
	
	latitudine : {
		type : Sequelize.FLOAT,
		allowNull : false,
		validate : {
			len : [4, 1000]
		}
	},
	longitudine : {
		type : Sequelize.FLOAT,
		allowNull : false,
		validate : {
			len : [4, 1000]
		}
	}
})

//sf detalii tabela detalii

Eveniment.hasMany(Detalii)


const app = express()
app.use(bodyParser.json())
app.use(express.static('../frontend/build'))

// Create tables
app.get('/create', (req, res, next) => {
	sequelize.sync({force : true})
		.then(() => res.status(201).send('Tabele create'))
		.catch((err) => next(err))
})
//tables created


//get event  
app.get('/eveniment', (req, res, next) => {
  Eveniment.findAll()
		.then((evenimeniment) => res.status(200).json(evenimeniment))
		.catch((err) => next(err))
})
//

//set event :
app.post('/eveniment', (req, res,next) => {
  Eveniment.create(req.body)
		.then(() => res.status(201).send('Eveniment Adaugat'))
		.catch((err) => next(err))
})
//

//get event by id:

app.get('/eveniment/:id', (req, res, next) => {
  Eveniment.findById(req.params.id, {include : [Detalii]})
		.then((eveniment) => {
			if (eveniment){
				res.status(200).json(eveniment)
			}
			else{
				res.status(404).send('Evenimentul nu a fost gasit')
			}
		})
		.catch((err) => next(err))
})
//


//edit event by id
app.put('/eveniment/:id', (req, res, next) => {
	Eveniment.findById(req.params.id)
		.then((eveniment) => {
			if (eveniment){
				return eveniment.update(req.body, {fields : ['nume']})
			}
			else{
				res.status(404).send('Evenimentul nu a fost gasit')
			}
		})
		.then(() => {
			if (!res.headersSent){
				res.status(201).send('Evenimentul a fost modificat')
			}
		})
		.catch((err) => next(err))
})

//
//delete event by id:
app.delete('/eveniment/:id', (req, res, next) => {
  Eveniment.findById(req.params.id)
		.then((evenimeniment) => {
			if (evenimeniment){
				return evenimeniment.destroy()
			}
			else{
				res.status(404).send('Evenimentul nu a fost gasit')
			}
		})
		.then(() => {
			if (!res.headersSent){
				res.status(201).send('Evenimentul a fost sters')
			}
		})
		.catch((err) => next(err))
})
// 

//get messages
app.get('/eveniment/:aid/detalii', (req, res, next) => {
	Eveniment.findById(req.params.aid)
		.then((evenimeniment) => {
			if (evenimeniment){
				return evenimeniment.getDetaliis()
			}
			else{
				res.status(404).send('Detaliile nu au fost gasite')
			}
		})
		.then((detalii) => {
			if (!res.headersSent){
				res.status(200).json(detalii)
			}	
		})
		.catch((err) => next(err))
})
//


//adaugare detalii evenimeniment
app.post('/eveniment/:eid/detalii', (req, res, next) => {
	Eveniment.findById(req.params.eid)
		.then((eveniment) => {
			if (eveniment){
				let detalii = req.body
				detalii.eveniment_id = eveniment.id
				return Detalii.create(detalii)
			}
			else{
				res.status(404).send('Detaliile nu au fost gasite')
			}
		})
		.then((detalii) => {
			if (!res.headersSent){
				res.status(200).send('Detaliile au fost adaugate')
			}	
		})
		.catch((err) => next(err))
	
})

//

app.get('/eveniment/:eid/detalii/:did', (req, res, next) => {
	Detalii.findById(req.params.did)
		.then((detalii) => {
			if (detalii){
				res.status(200).json(detalii)
			}
			else{
				res.status(404).send('Detaliile nu au fost gasite')
			}
		})
		.catch((err) => next(err))
})
//editare detalii
app.put('/eveniment/:eid/detalii/:did', (req, res, next) => {
	Detalii.findById(req.params.did)
		.then((detalii) => {
			if (detalii){
				return detalii.update(req.body, {fields : ['locatie', 'detalii']})
			}
			else{
				res.status(404).send('Detaliile nu au fost gasite')
			}
		})
		.then(() => {
			if (!res.headersSent){
				res.status(201).send('Detaliile au fost modificate')
			}
		})
		.catch((err) => next(err))
})
//
//delete detalii by id

app.delete('/eveniment/:eid/detalii/:did', (req, res, next) => {
	Detalii.findById(req.params.did)
		.then((detalii) => {
			if (detalii){
				return detalii.destroy()
			}
			else{
				res.status(404).send('Detaliile nu au fost gasite')
			}
		})
		.then(() => {
			if (!res.headersSent){
				res.status(201).send('Detaliile au fost sterse')
			}
		})
		.catch((err) => next(err))
})
//


app.use((err, req, res, next) => {
	console.warn(err)
	res.status(500).send('some error...')
})
app.listen(8080)