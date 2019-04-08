//Lizzie M. Guajardo Mozo
//A00818258
//EX 2

const express = require('express')
const path = require ('path')
const met = require('./met.js')

const app = express()

const port = process.env.PORT || 3000

const publicDir = path.join(__dirname, 'public')
app.use(express.static(publicDir))

//http://localhost:3000
app.get('/', function(req,res){
	res.send('<h1>Examen Parcial 2 Desarrollo Web!<h1>')
})

//http://localhost:3000/students/A00818258
app.get('/students/:id',function(req,res){
	if(req.params.id == "A00818258"){
		return res.send
		({
		  id: "A00818258",
		  fullname: "Lizzie Marielle Guajardo Mozo",
		  nickname: "Lizzie G",
		  age: 21
		})
	}
	else{
		return res.send
		({
			error:"Matrícula no identificada. Intente con students/A00818258"
		})
	}	
})

//http://localhost:3000/met?search=sunflower
app.get("/met", function(req,res){
	//ESTA LINEA PERMITE QUE LLEGUEN REQUEST DE DONDE SEA, AUNQUE SEAN LOCALES
	res.setHeader('Access-Control-Allow-Origin','*');
	if(!req.query.search){
		return res.send({
			error: 'Tienes que dar un objeto o un autor'
		})
	}
	else
	{
		met.searchObject(req.query.search, function(error, response){
			if(error){
				return res.send({
					error: error
				})
			}
			else
			{
				res.send({
					searchTerm : response.searchTerm,
				  	artist : response.artist,
				  	title: response.title,
				 	year: response.year,
				  	technique: response.technique,
				  	metUrl: response.metUrl
				})
			}	
		})
	}
})

//Por si se accesa a un pagina que no existe
//http://localhost:3000/aboutasdfasdfasdfadf
app.get('*',function(req,res){
	res.send({
		error: 'Esta ruta no existe'
	})
})

//En el puerto 3000
app.listen(port,function(){
	console.log('up and running')
})