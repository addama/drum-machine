// Drum samples from
// http://blog.imamusicmogul.com/2014/10/sample-saturdays-glitch-hop-drums/
// http://produceruni.blogspot.com/2012/08/kanye-west-drum-kit.html
// Howler.js
// http://goldfirestudios.com/blog/104/howler.js-Modern-Web-Audio-Javascript-Library

var App = {
	kit: 'IAMM Kit 1',
	parentFolder: 'IAMM Glitch Hop Sample Kit',
	bass: 'IAMM_C1_BASS_DRUM.wav',
	keys: {
		// Directional keys
		38: 'UP',	40: 'DOWN',	37: 'LEFT',	39: 'RIGHT',
		// Control keys (non-modifier)
		13: 'ENTER',	32: 'SPACE',	27: 'ESCAPE',	//9: 'TAB',
		// Numpad keys
		96: 'NP_0',	97: 'NP_1',	98: 'NP_2',	99: 'NP_3',
		100: 'NP_4',	101: 'NP_5',	102: 'NP_6',	103: 'NP_7',
		104: 'NP_8',	105: 'NP_9',
		111: 'NP_DIVIDE',	106: 'NP_MULTIPLY',	109: 'NP_MINUS',
		107: 'NP_PLUS',	110: 'NP_DOT',
		// Keyboard numbers
		48: 'KB_0',	49: 'KB_1',	50: 'KB_2',	51: 'KB_3',
		52: 'KB_4',	53: 'KB_5',	54: 'KB_6',	55: 'KB_7',
		56: 'KB_8',	57: 'KB_9',
		// Keyboard letters
		65: 'A',	66: 'B',	67: 'C',	68: 'D',	69: 'E',	70: 'F',
		71: 'G',	72: 'H',	73: 'I',	74: 'J',	75: 'K',	76: 'L',
		77: 'M',	78: 'N',	79: 'O',	80: 'P',	81: 'Q',	82: 'R',
		83: 'S',	84: 'T',	85: 'U',	86: 'V',	87: 'W',	88: 'X',
		89: 'Y',	90: 'Z',
		//Keyboard symbols
		186: 'SEMICOLON',	187: 'EQUALS',	188: 'COMMA',
		189: 'DASH',		190: 'PERIOD',		191: 'F_SLASH',
		220: 'B_SLASH', 	219: 'L_BRACKET',	221: 'R_BRACKET',
		222: 'QUOTE',	192: 'TILDE',
	},
	
	kit: {
		directory: 'kit/',
		instruments: {
			'SPACE': {
				name: 'Bass',
				directory: 'Bass/',
				file: ['bass29.wav', 'bass70.wav'],
			},
			'A': {
				name: 'Clap',
				directory: 'Clap/',
				file: ['clap28.wav'],
			},
			'S': {
				name: 'Kick',
				directory: 'Kick/',
				file: ['kick11.wav'],
			},
			'D': {
				name: 'Snare',
				directory: 'Snare/',
				file: ['snare14.wav'],
			},
			'Q': {
				name: 'Hi Hat',
				directory: 'Perc/',
				file: ['hi-hat63.wav', 'hi-hat64.wav'],
			},
			'E': {
				name: 'Guitar',
				directory: 'Soundz/',
				file: ['guitar lick95.wav', 'guitar lick97.wav'],
			},
			'W': {
				name: 'Piano',
				directory: 'Piano/',
				file: ['piano17.wav', 'piano52.wav'],
			},
		}
	},
	
	init: function init() {
		Keyboard.init({
			parent: this,
			handlers: this.keyHandler
		});
		
		this.makeSounds();
		this.bindKeys();
	},
	
	getHowlOptions: function getHowlOptions(file) {
		return {
			src: [file],
			autoplay: false,
			loop: false,
			volume: 0.25,
		}
	},
	
	makeSounds: function makeSounds() {
		Object.keys(this.kit.instruments).forEach(function(key) {
			var instrument = App.kit.instruments[key];
			instrument.file.forEach(function(file) {
				var file = App.kit.directory + instrument.directory + file;
				var options = App.getHowlOptions(file);
				instrument.sound = instrument.sound || [];
				instrument.sound.push(new Howl(options));
			});
		});
	},
	
	bindKeys: function bindKeys() {
		$(window).off('keyup').on('keyup', function keyEvent(event) {
			var key = event.keyCode;
			if (key in App.keys && App.keys[key] in App.kit.instruments) {
				var name = App.keys[key];
				var which = 0;
				if (App.kit.instruments[name].sound.length > 1) which = (event.shiftKey)?1:0;
				App.kit.instruments[name].sound[which].play();
			}
		});
	}
}

App.init();