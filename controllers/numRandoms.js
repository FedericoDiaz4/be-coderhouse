process.on('message', cantNums => {
    process.send(generoListaRandom(cantNums));
    process.exit();
})

process.send('listo');

const generoListaRandom = (cantNums) => {
    const arrNumeros = new Map();
    for (let i = 0; i < cantNums; i++) {
        let randomNum = Math.floor(Math.random() * 1000) + 1;
        if (arrNumeros.has(randomNum)) {
            arrNumeros.set(randomNum, arrNumeros.get(randomNum) + 1)
        } else {
            arrNumeros.set(randomNum, 1);
        }
    }
    const objNumeros = Object.fromEntries(arrNumeros);
    return objNumeros;
}