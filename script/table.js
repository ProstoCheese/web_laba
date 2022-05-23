let data = [{

    "id": 1,

    "model": "Мучача",

    "price": 123000,

    "power": 500,

    "description": "Супер быстрая тачка",

    "brandName": "Ferrari"

}, {

    "id": 2,

    "model": "m7",

    "price": 1250000,

    "power": 1000,

    "description": "Че тут сказать, это бугаги может вейрон",

    "brandName": "BMW"

}]

for (let key in data) {
        let row = document.createElement('tr')
        row.innerHTML = `<td class="login">${data[key].id}</td>
                      <td class="login">${data[key].model}</td>
                      <td class="login">${data[key].price}</td>
                      <td class="login">${data[key].power}</td>
                      <td class="login">${data[key].description}</td>
                      <td class="login">${data[key].brandName}</td>
                     `
        document.querySelector('.car').appendChild(row)
    }