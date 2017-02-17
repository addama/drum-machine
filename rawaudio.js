		var audio = new (window.AudioContext || window.webkitAudioContext)();
		var wave = audio.createOscillator();
		var gain = audio.createGain();
		var distortion = audio.createWaveShaper();
		var key = 5;
		
		wave.type = 'sawtooth';
		wave.frequency.value = '34.6478';
		wave.start();
		
		distortion.curve = makeDistortionCurve(440);
		distortion.connect(gain);
		distortion.oversample = '4x';
		
		gain.gain.value = 0.3;
		gain.connect(audio.destination);
		
		
		var playing = false;
		
		$('#startStop').on('mousedown', function() {
			if (playing) {
				playing = false;
				return wave.disconnect();
			} else {
				playing = true;
				return wave.connect(distortion);
			}
		});
		
		$('#upScale').on('click', function() {
			key += 1;
			wave.frequency.value = getFreq();
		});
		
		$('#dnScale').on('click', function() {
			key -= 1;
			wave.frequency.value = getFreq();
		});
		
		function getFreq() {
			if (key > 88) key = 88;
			if (key < 1) key = 1;
			var freq = Math.pow(2, ((key - 49) / 12)) * 440;
			return freq;
		}
		
		function makeDistortionCurve(amount) { // function to make curve shape for distortion/wave shaper node to use
			var k = typeof amount === 'number' ? amount : 50,
				n_samples = 44100,
				curve = new Float32Array(n_samples),
				deg = Math.PI / 180,
				i = 0,
				x;
			for ( ; i < n_samples; ++i ) {
				x = i * 2 / n_samples - 1;
				curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
			}
			return curve;
		};