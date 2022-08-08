import TrekRouter from '../src'

const router = new TrekRouter()

router.add('GET', '/', 'root')
router.add('GET', '/id/:id', 'named')
// router.add('GET', '/id/:id/:name', 'nested params')
// router.add('GET', '/name/:name/a', 'named params')

console.log(router.find('GET', '/'))
console.log(router.find('GET', '/id/1'))
console.log(router.find('GET', 'http://localhost:8080/id/1'))
// console.log(router.find('GET', '/ida'))

// console.dir(router.routes, {
//     depth: null
// })
