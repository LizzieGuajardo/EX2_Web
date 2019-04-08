//Lizzie M. Guajardo Mozo
//A00818258
//EX2

const request = require ('request')

//https://collectionapi.metmuseum.org/public/collection/v1/objects/1
const displayPiece = function(objectID,srchTerm,callback){
	const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/'+objectID
	request({url:url, json:true}, function(error,response){
		if(error){//no se puede acceder a la liga
			callback('Service unavailabe', undefined)
		}
		//"message": "could not parse objectID"
		else if (response.body.message == "could not parse objectID"){
			callback('could not parse objectID', undefined)
		}
		else{
			var constituents = "null"
			var title = "null"
			var year = "null"
			var metUrl = "null"

			if(response.body.constituents){ //Si no hay autor
				constituents = response.body.constituents[0].name
			}
			if(response.body.title){ //Si no hay titulo
				title = response.body.title
			}
			if(response.body.objectEndDate){ //Si no hay año
				year = response.body.objectEndDate
			}
			if(response.body.objectURL){ //Si no hay url
				metUrl = response.body.objectURL
			}
			
			const info = 
			{
			  	searchTerm : srchTerm,
			  	artist : constituents,			  	
			  	title: title,
			 	year: year,
			  	technique: response.body.medium,
			  	metUrl: metUrl
			}
			callback(undefined, info)
		}
	})
}

//https://collectionapi.metmuseum.org/public/collection/v1/search?q=sunflowers
const searchObject = function(objectName,callback){ //
	const url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q='+objectName
	request({url:url, json:true}, function(error,response){
		if(error){//no se puede acceder a la liga
			callback('Service unavailabe', undefined) //
		}
		else if (response.body.total == 0 || !response.body.objectIDs){
			callback('No se encontaron resultados', undefined)
		}
		else{
			const data = response.body
			const info = 
			{
				objectID : data.objectIDs[0]
			}
			displayPiece(info.objectID,objectName,function(error,response){
				if(error)
				{
					callback(undefined, error)
				}else
				{
					callback(undefined, response)
				}
			})
		}
	})
}

module.exports = {
  searchObject: searchObject,
  displayPiece: displayPiece
}