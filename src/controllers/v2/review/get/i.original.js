const fs = require('fs');
const sharp = require('sharp');
const url = require('url');
var path = require('path');



module.exports = (req, res, next) => {
	// Remove headers info
	res.removeHeader('Transfer-Encoding');
	res.removeHeader('X-Powered-By');

	var {q,file} = req.params
	
	let filePath = path.join(__dirname, `../../../../public/images/${file}`);
	if (!fs.existsSync(filePath)) {
		file = process.env.DEFAULT_IMAGE;
		filePath = path.join(__dirname, `../../../../public/images/${file}`);
	}

	// const quality = parseInt(q) < 100 ? parseInt(q) : 80; // Get quality from query string
	const quality = 80; // Get quality from query string

	const folder = `q${quality}`;
	
	const out_file = `./public/thumb/${folder}/${file}`;
	if (fs.existsSync(path.resolve(out_file))) {
		res.sendFile(path.resolve(out_file));
		return;
	}
	// If no height or no width display original image
	// if (!height || !width) {
	// 	res.sendFile(path.resolve(`public/images/${file}`));
	// 	return;
	// }

	// Use jimp to resize image
	if (!fs.existsSync(`./public/thumb/${folder}`)){
		fs.mkdirSync(`./public/thumb/${folder}`);
	}
    
	sharp(`./public/images/${file}`)
	.webp( { quality: +quality } )
	.toFile(out_file).
	then(() => {
		fs.createReadStream(path.resolve(out_file)).pipe(res)
	}).catch(err => {
		console.log("aaaa")
		res.sendFile(path.resolve(`public/images/${file}`));
	});

	// Jimp.read(`public/images/${file}`)
	// 	.then(lenna => {
	// 		lenna.resize(width, height); // resize
	// 		lenna.quality(quality); // set JPEG quality
	// 		lenna.write(path.resolve(out_file), () => {
	// 			fs.createReadStream(path.resolve(out_file)).pipe(res);
	// 		}); // save and display
	// 	})
	// 	.catch(err => {
	// 		res.sendFile(path.resolve(`public/images/${file}`));
	// 	});

}