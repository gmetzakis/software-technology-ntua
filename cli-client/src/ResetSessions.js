import axios from 'axios'

export async function ResetSessions(args){

    let myArray = process.argv.slice(2)

    if (typeof args._[1] != 'undefined'){
        console.log("Dont use any parameters when calling ressetsessions")
        return
    }

    if ((myArray.length > 2 && myArray.includes('Admin')) || (myArray.length > 1 && !(myArray.includes('Admin')))){
        console.log('In order to use ressetsessions you have two options:')
        console.log('1) In any case (logged in or not) type: ressetsessions')
        console.log('2) If you want to flex that you are an admin you can type: Admin --ressetsessions')
        return
    }

    var url = 'http://localhost:8765/evcharge/api/admin/resetsessions'
    axios.post(url, {headers : {
        'Content-Type' : 'application/x-www-form-urlencoded'
    }})
    .then((response => {
        console.log("Success", response.data)
    }))
    .catch((error) => {
        console.log("Error", error)
    })
}