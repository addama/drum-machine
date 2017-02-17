var Keyboard = {
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
	
	handlers: {},
	chain: [],
	combos: {},
	
	keyPresses: 0,
	chainLength: 10,
	parent: window,
	target: window,
	
	init: function keyboardInit(options) {
		/*
		options = {
			target: ELEMENT_ID | null(window),
			chainLength: LENGTH_OF_CHAIN | null(10),
			parent: YOUR_OBJECT | null('window'),
			keyPresses: NUMBER | null(0),
			handlers: {
				KEY_CONSTANT: HANDLER(),
				...
			},
			combos: {
				COMBO_NAME: {
					keys: [KEY1, KEY2, ...],
					handler: HANDLER(),
				},
				...
			}
		}
		*/
		if (options.target) this.target = options.target;
		if (options.keyPresses) this.keyPresses = options.keyPresses;
		if (options.parent) this.parent = options.parent;
		if (options.chainLength) this.chainLength = options.chainLength;
		if (options.combos) this.combos = options.combos;
		if (options.handlers) this.handlers = options.handlers;
		
		this.bind();
	},
	
	_listen: function keyboardListen(keyCode, withShift) {
		var key = this.keys[keyCode];
		//console.log(keyCode, key, withShift);
		this.keyPresses ++;
		this.chain.push(key);
		if (this.chain.length > this.chainLength) this.chain.shift();
		if (this.handlers[key] instanceof Function) {
			this.handlers[this.keys[keyCode]].call(this.parent, key, withShift);
		}
		this.checkCombos();
	},
	
	bind: function keyboardBind() {
		$(this.target).off('keyup').on('keyup', function keyEvent(event) {
			if (event.keyCode in Keyboard.keys) {
				Keyboard._listen(event.keyCode, (event.shiftKey)?true:false);
			}
		});
	},
	
	listKeys: function keyboardKeys() {
		var list = [];
		for (var key in this.keys) {
			list.push(this.keys[key]);
		}
		return list;
	},
	
	checkCombos: function keyboardCheckCombos() {
		if (this.chain.length > 0) {
			var chain = this.chain.join('');
			for (var combo in this.combos) {
				var string = this.combos[combo].keys.join('');
				if (chain.indexOf(string) !== -1) {
					this.combos[combo].handler.call(this.parent);
					this.chain = [];
					break;
				}
			}
		}
	},

}