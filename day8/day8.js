var screen = (input, settings) => {
	var display = [[]];
	
	//init: zero out the screen.
	for(var y = 0; y < settings.height; y++)
	{
		display[y] = new Array(settings.width);
		display[y].fill(false, 0, settings.width);
	}
	
	var drawRect = (width, height) => {
		for(var y = 0; y < Math.min(height, settings.height); y++)
			for(var x = 0; x < Math.min(width, settings.width); x++)
				display[y][x] = true;
	};
	
	var shiftRow = (row, dist) => {
		dist %= settings.width;
		
		if(dist < 0) //Since we wrap shifting -2 is equivalent to shifting settings.width - 2
			dist += settings.width;
	
		display[row] = display[row].splice(settings.width -  dist).concat(display[row]);
	};
	
	var shiftCol = (col, dist) => {
		dist = -dist; //FML I wrote this backwards (So we shift up instead of down. Invert dist.)
		dist %= settings.height;
		
		if(dist < 0) //Since we wrap shifting -2 is equivalent to shifting settings.width - 2
			dist += settings.height;

		var holder = [];		
		for(var y = 0; y < settings.height; y++)
		{
			holder[y] = display[y][col];
			display[y][col] = ((y + dist) % settings.height < y) ? holder[(y + dist) % settings.height] : display[(y + dist) % settings.height][col];
		}
	};
	
	var getDisplay = () => {
		return display.reduce((output, col) => {
			return output += col.reduce((colOutput, row) => {
				return colOutput += row ? '#' : '.';
			}, '') + '\n';
		}, '');
	};
	
	var countPixels = () => { 
		return display.reduce((output, col) => {
				return output += col.reduce((colOutput, row) => {
					return colOutput += row ? 1 : 0;
				}, 0);
			}, 0);
	};
	
	for(var i = 0; i < input.length; i++)
	{
		/*
			This only makes sense looking at the the input:
			
			'rect 3x2',
			'rotate column x=1 by 1',
			'rotate row y=0 by 4',
			'rotate column x=1 by 1'
		*/
		
		var args = input[i].split(' '); //get first word, either rect or rotate
		
		switch(args[0]) //switch on rect/rotate
		{
			case 'rect': //if rect
				args = args[1].split('x'); //Split 3x2
				drawRect(+args[0], +args[1]); //pass in draw rect, +'3' === 3 (IE: +'string number' is a shorthand for Number parse)
				break;
			case 'rotate': //If rotate
				switch(args[1]) //switch on column/row
				{
					case 'column':
						shiftCol(+args[2].split('=')[1], +args[4]); //grab 'x=1', split on =, take number. Convert last number and run.
						break;
					case 'row':
						shiftRow(+args[2].split('=')[1], +args[4]);		
				}
		}
	}
	
	//output:
	console.log(getDisplay()); 
	console.log(countPixels());
};

screen([
	'rect 3x2',
	'rotate column x=1 by 1',
	'rotate row y=0 by 4',
	'rotate column x=1 by 1'
], {width: 7, height: 3});

screen(	["rect 1x1",
	"rotate row y=0 by 10",
	"rect 1x1",
	"rotate row y=0 by 10",
	"rect 1x1",
	"rotate row y=0 by 5",
	"rect 1x1",
	"rotate row y=0 by 3",
	"rect 2x1",
	"rotate row y=0 by 4",
	"rect 1x1",
	"rotate row y=0 by 3",
	"rect 1x1",
	"rotate row y=0 by 2",
	"rect 1x1",
	"rotate row y=0 by 3",
	"rect 2x1",
	"rotate row y=0 by 2",
	"rect 1x1",
	"rotate row y=0 by 3",
	"rect 2x1",
	"rotate row y=0 by 5",
	"rotate column x=0 by 1",
	"rect 4x1",
	"rotate row y=1 by 12",
	"rotate row y=0 by 10",
	"rotate column x=0 by 1",
	"rect 9x1",
	"rotate column x=7 by 1",
	"rotate row y=1 by 3",
	"rotate row y=0 by 2",
	"rect 1x2",
	"rotate row y=1 by 3",
	"rotate row y=0 by 1",
	"rect 1x3",
	"rotate column x=35 by 1",
	"rotate column x=5 by 2",
	"rotate row y=2 by 5",
	"rotate row y=1 by 5",
	"rotate row y=0 by 2",
	"rect 1x3",
	"rotate row y=2 by 8",
	"rotate row y=1 by 10",
	"rotate row y=0 by 5",
	"rotate column x=5 by 1",
	"rotate column x=0 by 1",
	"rect 6x1",
	"rotate row y=2 by 7",
	"rotate row y=0 by 5",
	"rotate column x=0 by 1",
	"rect 4x1",
	"rotate column x=40 by 2",
	"rotate row y=2 by 10",
	"rotate row y=0 by 12",
	"rotate column x=5 by 1",
	"rotate column x=0 by 1",
	"rect 9x1",
	"rotate column x=43 by 1",
	"rotate column x=40 by 2",
	"rotate column x=38 by 1",
	"rotate column x=15 by 1",
	"rotate row y=3 by 35",
	"rotate row y=2 by 35",
	"rotate row y=1 by 32",
	"rotate row y=0 by 40",
	"rotate column x=32 by 1",
	"rotate column x=29 by 1",
	"rotate column x=27 by 1",
	"rotate column x=25 by 1",
	"rotate column x=23 by 2",
	"rotate column x=22 by 1",
	"rotate column x=21 by 3",
	"rotate column x=20 by 1",
	"rotate column x=18 by 3",
	"rotate column x=17 by 1",
	"rotate column x=15 by 1",
	"rotate column x=14 by 1",
	"rotate column x=12 by 1",
	"rotate column x=11 by 3",
	"rotate column x=10 by 1",
	"rotate column x=9 by 1",
	"rotate column x=8 by 2",
	"rotate column x=7 by 1",
	"rotate column x=4 by 1",
	"rotate column x=3 by 1",
	"rotate column x=2 by 1",
	"rotate column x=0 by 1",
	"rect 34x1",
	"rotate column x=44 by 1",
	"rotate column x=24 by 1",
	"rotate column x=19 by 1",
	"rotate row y=1 by 8",
	"rotate row y=0 by 10",
	"rotate column x=8 by 1",
	"rotate column x=7 by 1",
	"rotate column x=6 by 1",
	"rotate column x=5 by 2",
	"rotate column x=3 by 1",
	"rotate column x=2 by 1",
	"rotate column x=1 by 1",
	"rotate column x=0 by 1",
	"rect 9x1",
	"rotate row y=0 by 40",
	"rotate column x=43 by 1",
	"rotate row y=4 by 10",
	"rotate row y=3 by 10",
	"rotate row y=2 by 5",
	"rotate row y=1 by 10",
	"rotate row y=0 by 15",
	"rotate column x=7 by 2",
	"rotate column x=6 by 3",
	"rotate column x=5 by 2",
	"rotate column x=3 by 2",
	"rotate column x=2 by 4",
	"rotate column x=0 by 2",
	"rect 9x2",
	"rotate row y=3 by 47",
	"rotate row y=0 by 10",
	"rotate column x=42 by 3",
	"rotate column x=39 by 4",
	"rotate column x=34 by 3",
	"rotate column x=32 by 3",
	"rotate column x=29 by 3",
	"rotate column x=22 by 3",
	"rotate column x=19 by 3",
	"rotate column x=14 by 4",
	"rotate column x=4 by 3",
	"rotate row y=4 by 3",
	"rotate row y=3 by 8",
	"rotate row y=1 by 5",
	"rotate column x=2 by 3",
	"rotate column x=1 by 3",
	"rotate column x=0 by 2",
	"rect 3x2",
	"rotate row y=4 by 8",
	"rotate column x=45 by 1",
	"rotate column x=40 by 5",
	"rotate column x=26 by 3",
	"rotate column x=25 by 5",
	"rotate column x=15 by 5",
	"rotate column x=10 by 5",
	"rotate column x=7 by 5",
	"rotate row y=5 by 35",
	"rotate row y=4 by 42",
	"rotate row y=2 by 5",
	"rotate row y=1 by 20",
	"rotate row y=0 by 45",
	"rotate column x=48 by 5",
	"rotate column x=47 by 5",
	"rotate column x=46 by 5",
	"rotate column x=43 by 5",
	"rotate column x=41 by 5",
	"rotate column x=38 by 5",
	"rotate column x=37 by 5",
	"rotate column x=36 by 5",
	"rotate column x=33 by 1",
	"rotate column x=32 by 5",
	"rotate column x=31 by 5",
	"rotate column x=30 by 1",
	"rotate column x=28 by 5",
	"rotate column x=27 by 5",
	"rotate column x=26 by 5",
	"rotate column x=23 by 1",
	"rotate column x=22 by 5",
	"rotate column x=21 by 5",
	"rotate column x=20 by 1",
	"rotate column x=17 by 5",
	"rotate column x=16 by 5",
	"rotate column x=13 by 1",
	"rotate column x=12 by 3",
	"rotate column x=7 by 5",
	"rotate column x=6 by 5",
	"rotate column x=3 by 1",
	"rotate column x=2 by 3"], {width: 50, height: 6});