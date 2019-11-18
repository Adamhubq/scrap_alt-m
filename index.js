// const puppeteer = require('puppeteer');
const fs = require('fs');
 

 async function tune() {
 	await setTimeout(() => {}, 5000)
 }


// (async () => {
//   const browser = await puppeteer.launch();

//   let objects = [];
// 	const page = await browser.newPage();
//   for (let i = 62; i--;) {
//   	try {
//   await tune();
//   await page.goto(`https://www.arti-m.ru/novyy-god/page-${i}/?features_hash=60-113164-121397-122732`);
//   let names = await page.evalute(() => {
//   	let ss = [];
//   	document.querySelectorAll('.product-title')
//   		.forEach(element => ss.push(element.textContent))
//   	return ss
//   })
//   console.log(names);
//   names.map(val => objects.push(val));}
//   catch(e){
//   	console.log('----');
//   	console.log(e);
//   	console.log('----');
//   }
//  }
//  fs.writeSync('ss.json', JSON.stringify(objects))
//   await browser.close();
// })();


// const puppeteer = require('puppeteer');
 
// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://metanit.com/web/nodejs/2.8.php');
//   await page.screenshot({path: 'example.png'});
 
//   await browser.close();
// })();


 
var request = require('request-promise');

(async () => {
	let object = [];

	for (let i = 62; i--;) {
		try {
			await tune();
			body = await request(`https://www.arti-m.ru/novyy-god/page-${i}/?features_hash=60-113164-121397-122732`)
			
			// await request(`https://www.arti-m.ru/novyy-god/page-${i}/?features_hash=60-113164-121397-122732`, 
			// 	function (error, response, body) {
			// 	console.log('error:', error); // Print the error if one occurred
			let array = [];
			body.replace(/[\n,\s]/gim, '').match(/ty-code(">[0-9-]+)/gim).map(val => {
				array.push(val.split('>')[1])
				// array[val.split('>')[1]] = undefined;
			})
			
			body.replace(/\n/g, '').replace(/&quot;/g, '')
				.match(/class="product-title" title="[A-Za-zа-яА-Я.,\'()= \*0-9-\"\"\/\`\'Ё]+/g).map((val, index) => {
					let obj = {};
					obj[array[index]] = val.split('product-title" title="')[1];
					object.push(obj);
				})
			// body.replace(/[\n,\s]/gim, '').match(/ty-code(">[0-9-]+)/gim).map(val => {
			// 	console.log(val);
			// 	array.push(val.split('>')[1])
			// })

			console.log(object);
			// });

		} catch(e) {
			console.log('----');
			console.log(e);
			console.log('----');
		}
	}

	await fs.writeFileSync('ss.json', JSON.stringify(object))
})()


