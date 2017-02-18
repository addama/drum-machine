// Drum samples from
// http://smd-records.com/tr808/?page_id=14
// Bass Drum sounds start with “BD”.
// Snare Drum sounds start with “SD”.
// Low Tom sounds start with “LT”.
// Mid Tom sounds start with “MT”.
// Hi Tom sounds start with “HT”.
// Low Conga sounds start with “LC”.
// Mid Conga sounds start with “MC”.
// Hi Conga sounds start with “HC”.
// Rim Shot sound starts with “RS”.
// Claves sounds starts with “CL”.
// Hand Clap sound starts with “CP”.
// Maracas sound starts with “MA”.
// Cowbell sound starts with “CB”.
// Cymbal sounds start with “CY”.
// Open Hi Hat sounds start with “OH”.
// Closed Hi Hat sound starts with “CH”.

// Howler.js
// http://goldfirestudios.com/blog/104/howler.js-Modern-Web-Audio-Javascript-Library

var App = {
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
	
	directory: 'kit/',
	listenToElement: window,
	textarea: '#text',
	button: '#play',
	kit: {},
	
	init: function init() {
		var dirCheck = this.directory.match(/\/$/);
		if (dirCheck === null) this.directory += '/';
		this.listen();
	},
	
	makeHowlOptions: function makeHowlOptions(file) {
		return {
			src: [file],
			autoplay: false,
			loop: false,
			volume: 0.25,
		}
	},
	
	getKeyList: function getKeyList() {
		if (this.keyList) return this.keyList;
		var keyList = [];
		Object.keys(this.keys).forEach(function reduceKeyList(key) {
			keyList.push(App.keys[key]);
		});
		this.keyList = keyList.join(' ');
		return this.keyList;
	},

	listen: function listen() {
		$(this.listenToElement).off('keyup').on('keyup', function keyEvent(event) {
			var key = event.keyCode;
			if (key in App.keys && App.keys[key] in App.kit) {
				var name = App.keys[key];
				var which = 0;
				if (App.kit[name].sound.length > 1) which = (event.shiftKey)?1:0;
				App.playSound(name, which);
			}
		});
		
		$(this.button).off('click').on('click', function playButton() {
			var beats = $(App.textarea).val().split('');
			console.log(text);
			beats.forEach(function(beat) {
				if (beat === ' ') beat = 'SPACE';
				App.playSound(beat.toUpperCase());
			});
		});
	},
	
	playSound: function playSound(key, which=0) {
		this.kit[key].sound[which].play();
	},
	
	bindSoundToKey: function bindSoundToKey(key, name='Instrument', directory='', files=[]) {
		this.getKeyList();
		
		if (this.keyList.indexOf(key) === -1) {
			console.error(key, 'is not a valid key. Valid keys are:', this.keyList);
			return false;
		}
		
		if (typeof files === 'string') files = [ files ];
		if (files.length > 2) {
			files.length = 2;
			console.warn('Only 2 samples can be bound to each key: one normal keypress, \
			and one keypress modified by shift. Additional samples are ignored.');
		}
		
		var dirCheck = directory.match(/\/$/);
		if (dirCheck === null) directory += '/';
		
		var obj = {
			name: name,
			key: key,
			directory: directory,
			files: files,
			sound: []
		}
		
		if (obj.files.length) {
			obj.files.forEach(function makeHowlSounds(name) {
				var file = App.directory + obj.directory + name;
				var options = App.makeHowlOptions(file);
				obj.sound.push(new Howl(options));
			});
		}
		
		this.kit[key] = obj;
		
		return true;
	},
}

App.init();