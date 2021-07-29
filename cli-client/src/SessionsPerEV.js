import axios from 'axios'
import { type } from 'os';
var fs = require('fs'); 

export async function SessionsPerEV(args){

    let myArray = process.argv.slice(3)

    if (typeof args.ev === 'boolean' || typeof args.ev === 'undefined' || typeof args.ev != 'number'){
        console.log('You have to set parameter --ev using a number')
        return
    }
    if (typeof args.datefrom === 'boolean' || typeof args.datefrom === 'undefined' 
        || typeof args.datefrom != 'number'){
        console.log('You have to set parameter --datefrom using 8 numbers')
        return
    }
    if (typeof args.dateto === 'boolean' || typeof args.dateto === 'undefined'
        || typeof args.datefrom != 'number'){
        console.log('You have to set parameter --dateto using 8 numbers')
        return
    }
    if (args.format !== 'json' && args.format !== 'csv' && typeof args.format !== 'undefined'){
        console.log('Parameter --format has to be either json or csv')
        console.log('If you delete this parameter json is selected')
        return
    }

    if ((myArray.length > 8 && args.format) || (myArray.length > 6 && (!args.format))){
        console.log('You used more parameters than needed. Follow the syntax as shown below:')
        console.log('SessionsPerEV --ev ID --datefrom Date --dateto Date --format Format')
        console.log('*You can skip parameter --format. By default json format is selected.')
        return
    }

    var url = 'http://localhost:8765/evcharge/api/SessionsPerEV'
    url = url + '/' + args.ev + '/' + args.datefrom + '/' + args.dateto
    var token_path = './softeng20bAPI.token'
    //console.log(url)
    function request(url, path){
        fs.readFile(path, 'utf8',
        function get_request(err, data){
            if (err){
                console.log('Error when trying to read the file')
                return
            }
            var token = data
            var body = {}
            var headers = {
                'x-observatory-auth' : token,
                'Content-Type' : 'application/x-www-form-urlencoded'
            }

            axios.get(url, {headers})
            .then(response => {
                console.log(response.data[0])
            })
            .catch((error) => {
                console.log("Error", error.response.status)
                console.log(error.response.data.message)
            })
        })
    }
    fs.access(token_path, fs.F_OK, (err) => {
        if (err){
            console.error('You need to log in first')
            return
        }
        request(url, token_path)
    })
    return
}
    