var inpt = 'R1, R3, L2, L5, L2, L1, R3, L4, R2, L2, L4, R2, L1, R1, L2, R3, L1, L4, R2, L5, R3, R4, L1, R2, L1, R3, L4, R5, L4, L5, R5, L3, R2, L3, L3, R1, R3, L4, R2, R5, L4, R1, L1, L1, R5, L2, R1, L2, R188, L5, L3, R5, R1, L2, L4, R3, R5, L3, R3, R45, L4, R4, R72, R2, R3, L1, R1, L1, L1, R192, L1, L1, L1, L4, R1, L2, L5, L3, R5, L3, R3, L4, L3, R1, R4, L2, R2, R3, L5, R3, L1, R1, R4, L2, L3, R1, R3, L4, L3, L4, L2, L2, R1, R3, L5, L1, R4, R2, L4, L1, R3, R3, R1, L5, L2, R4, R4, R2, R1, R5, R5, L4, L1, R5, R3, R4, R5, R3, L1, L2, L4, R1, R4, R5, L2, L3, R4, L4, R2, L2, L4, L2, R5, R1, R4, R3, R5, L4, L4, L5, L5, R3, R4, L1, L3, R2, L2, R1, L3, L5, R5, R5, R3, L4, L2, R4, R5, R1, R4, L3';

((input) => {
	var directions = input.split(', ');
	
	var results = directions.reduce((pos, curr) => {
		if(curr[0] == 'R')
			pos.angle = (pos.angle + 90) % 360;
		else
			pos.angle = (pos.angle == 0) ? 270 : pos.angle - 90;
		
		var dist = parseInt(curr.substr(1, curr.length - 1));
		
		switch(pos.angle)
		{
			case 0:
				pos.y += dist;
			break;
			
			case 90:
				pos.x += dist;
			break;
			
			case 180:
				pos.y -= dist;
			break;
			
			case 270:
				pos.x -= dist;
		}
	
	return pos;
		
	}, {'angle': 0, 'x': 0, 'y': 0});
	
	console.log(Math.abs(results.x) + Math.abs(results.y));
})(inpt);