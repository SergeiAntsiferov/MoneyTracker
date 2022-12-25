// Handling catch error ()
async function catch_handler(error, source) {
    console.log("Error source - " + source)
    console.log(error)
}

export default catch_handler