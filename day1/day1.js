//var inpt = 'R8, R4, R4, R8';
var inpt = 'R1, R3, L2, L5, L2, L1, R3, L4, R2, L2, L4, R2, L1, R1, L2, R3, L1, L4, R2, L5, R3, R4, L1, R2, L1, R3, L4, R5, L4, L5, R5, L3, R2, L3, L3, R1, R3, L4, R2, R5, L4, R1, L1, L1, R5, L2, R1, L2, R188, L5, L3, R5, R1, L2, L4, R3, R5, L3, R3, R45, L4, R4, R72, R2, R3, L1, R1, L1, L1, R192, L1, L1, L1, L4, R1, L2, L5, L3, R5, L3, R3, L4, L3, R1, R4, L2, R2, R3, L5, R3, L1, R1, R4, L2, L3, R1, R3, L4, L3, L4, L2, L2, R1, R3, L5, L1, R4, R2, L4, L1, R3, R3, R1, L5, L2, R4, R4, R2, R1, R5, R5, L4, L1, R5, R3, R4, R5, R3, L1, L2, L4, R1, R4, R5, L2, L3, R4, L4, R2, L2, L4, L2, R5, R1, R4, R3, R5, L4, L4, L5, L5, R3, R4, L1, L3, R2, L2, R1, L3, L5, R5, R5, R3, L4, L2, R4, R5, R1, R4, L3';

((input) => {
	var directions = input.split(', ');
	
	var traversed = [[]];
	var point;
	
	var r90 = 90 * (Math.PI /180); //90 degrees in radians (I realize pi/2 == 90 * (pi / 180)... but this is easier to read)
	
	var results = directions.reduce((pos, curr) => {
		if(curr[0] == 'R')
			pos.angle -= r90; //Womp  < 180 ^ 90 > 0 v 270, coordinates are counter-clockwise. Had that backwards.
		else
			pos.angle += r90;
		
		var dist = parseInt(curr.substr(1, curr.length - 1));
		
		point = {x: pos.x, y: pos.y};
		
		pos.y += Math.round(dist * Math.sin(pos.angle));
		pos.x += Math.round(dist * Math.cos(pos.angle));
		
		/*I realize this will fill a rectangle from the starting/ending points, but since we're constrained to 90 degrees it should work. Otherwise, yeah, we essentially have a bounding box instead of an overlapping vector check.*/
		//Also, I realize I'm (ab)using the heck out of JavaScript arrays... but hey array[-27][-3] just *works* in JavaScript.
		if(traversed) //We null traversed out once we find the first place we cross.
		for(var y = Math.min(point.y, pos.y); y <= Math.max(point.y, pos.y); y++)
		for(var x = Math.min(point.x, pos.x); x <= Math.max(point.x, pos.x); x++)
		{
			if(traversed[y] && traversed[y][x] && (point.y != y || point.x != x)) //If we've been here, but aren't at the starting point.
			{
				console.log('We crossed at: ', {x:x,y:y}, 'distance: ', Math.abs(x) + Math.abs(y));
				traversed = null; //null it out so we don't keep checking.
				return pos; //Return early so we don't touch traversed again this iteration.
			}
			else if (!traversed[y]) //If we haven't been on this row yet, initialize. 
				traversed[y] = [];
		
			traversed[y][x] = true;
		}
		
		return pos;
		
	}, {'angle': r90, 'x': 0, 'y': 0});
	
	console.log(Math.abs(results.x) + Math.abs(results.y));
})(inpt);