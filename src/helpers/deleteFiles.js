const fs = require('fs')

export default function deleteFiles({files=[], callback=()=>{}}){
	if(!files.length){
		return callback();
	}
	
	files.forEach((item, index) => {
		fs.unlink(process.cwd()+'/upload_files/imagens/'+item, function(err){
			
			console.log(err);

			if((files.length && index >= files.length) || (files.length===1 && index === files.length-1)){
				callback();
			}

		})	
	});

	
	
	
}