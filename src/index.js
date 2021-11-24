const generate = require('./generate')

const args = process.argv.slice(2)

switch(args[0]){
    case 'generate':
        generate(args[1], args[2])
        break
    default:
        throw new Error(`invalid argument ${args[0]}, must be one of 'generate', 'serve', 'build'`)
}
