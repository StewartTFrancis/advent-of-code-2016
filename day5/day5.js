var md5 = require('md5'); /* Yes, I know this moves from 'runs anywhere' javascript to node specific... but I'm not writing an MD5 implementation. */
var inpt = ['wtnhxymk'];

((input) => {
	
	var i = 0;
	var currhash;
	var pass = "";
	do{
		currhash = md5(input[0] + (i++));
		
		//process.stdout.write(i + ' : ' + currhash + '\n');
		
		if(currhash.substr(0,5) == '00000')
		{
			pass += currhash[5];
			
			process.stdout.write('\033[0;0H');		
			process.stdout.write(i + ' : ' + currhash + '\n');
			console.log(pass);
		}
		
	} while(pass.length < 8);
})(inpt);