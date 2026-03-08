'use strict'

const BLOCKME = [4850,48732,48733,48734,48735,48736,48737,48738,48739,690019,70234,70235,70236,70237,70238,70251,70252,70253,70254,70255,70256,103132,776021,905433,905434,47660800,47660900,47661000,47662300,99001170,99006000,99007200,999001011],
	CRYSTALS = [10306,10316,10906,10916,11006,11016,12001,12003,12120,12130]

module.exports = function Normalifier(mod) {
	
	let enabled = true,
		log = false,
		niceName = mod.proxyAuthor !== 'caali' ? '[Norm] ' : ''
	
	mod.hook('S_ABNORMALITY_BEGIN', 4, event => {
		if(mod.game.me.is(event.target) && log) console.log('[Norm] Abnormality: ' + event.id + ' Duration: ' + event.duration + ' Stacks: ' + event.stacks)
		if(enabled && BLOCKME.indexOf(event.id) > -1) return false
	})
	
	mod.hook('S_ABNORMALITY_REFRESH', 2, event => {
		if(enabled && CRYSTALS.indexOf(event.id) > -1) return false
	})
	
	// ################ //
	// ### Commands ### //
	// ################ //

	mod.command.add('norm', (param) => {
		if (param == null) {
			enabled = !enabled
			mod.command.message(niceName + 'Normalifier ' + (enabled ? '<font color="#56B4E9">enabled</font>' : '<font color="#E69F00">disabled</font>'))
			console.log('Normalifier ' + (enabled ? 'enabled' : 'disabled'))
		}
		else if (param == 'log') {
			log = !log
			mod.command.message(niceName + 'Logging ' + (log ? '<font color="#56B4E9">enabled</font>' : '<font color="#E69F00">disabled</font>'))
			console.log('[Norm] Logging ' + (log ? 'enabled' : 'disabled'))
		}
		else mod.command.message('Commands:\n'
			+ ' "norm" (enable/disable Normalifier),\n'
			+ ' "norm log" (enable/disable logging)'
			)
	})
}
