'use strict';
'require view';
'require dom';
'require fs';
'require ui';
'require uci';
'require network';


return view.extend({
	handleCommand: function(exec, args) {
		var buttons = document.querySelectorAll('.diag-action > .cbi-button');

		for (var i = 0; i < buttons.length; i++)
			buttons[i].setAttribute('disabled', 'true');

		return fs.exec(exec, args).then(function(res) {
			var out = document.querySelector('textarea');

			dom.content(out, [ res.stdout || '', res.stderr || '' ]);
		}).catch(function(err) {
			ui.addNotification(null, E('p', [ err ]))
		}).finally(function() {
			for (var i = 0; i < buttons.length; i++)
				buttons[i].removeAttribute('disabled');
		});
	},

	handleEnroll: function() {
		return this.handleCommand('at_enroll.sh', "");
	},

	load: function() {
		return uci.load('sshnpd').then(function() {
			var atsign = uci.get_first('sshnpd','','atsign'),
				keyfile = '/root/.atsign/keys/'+atsign+'_key.atKeys';
				return L.resolveDefault(fs.stat(keyfile), {});
		});
	},

	render: function(res) {

		var has_atkey = res.path,
			atsign = uci.get_first('sshnpd','','atsign'),
			device = uci.get_first('sshnpd','','device'),
			otp = uci.get_first('sshnpd','','otp'),
			enrollready = atsign && device && otp && !has_atkey,

			instructions = E('div', { 'class': 'cbi-map-descr'}, _('Press the Enroll button then run this command on a system where '+atsign+' is activated:')),

			enrollcmd = E('code','at_activate approve -a '+atsign+' --arx noports --drx '+device),

			table = E('table', { 'class': 'table' }, [
				E('tr', { 'class': 'tr' }, [
					E('td', { 'class': 'td left' }, [
						E('span', { 'class': 'diag-action' }, [
							E('button', {
								'class': 'cbi-button cbi-button-action',
								'click': ui.createHandlerFn(this, 'handleEnroll')
							}, [ _('Enroll') ])
						])
					]),
				])
			]),

			cmdwindow = E('div', {'class': 'cbi-section'}, [
			E('div', { 'id' : 'command-output'},
				E('textarea', {
					'id': 'widget.command-output',
					'style': 'width: 100%; font-family:monospace; white-space:pre',
					'readonly': true,
					'wrap': 'on',
					'rows': '20'
				})
			)
			]),

			view = E('div', { 'class': 'cbi-map'}, [
			E('h2', {}, [ _('NoPorts atSign Enrollment') ]),
			atsign ? E([]) : E('div', { 'class': 'cbi-map-descr'}, _('atSign must be configured')),
			device ? E([]) : E('div', { 'class': 'cbi-map-descr'}, _('Device must be configured')),
			otp ? E([]) : E('div', { 'class': 'cbi-map-descr'}, _('OTP must be configured. An OTP can be generated using:')),
			otp ? E([]) : E('code','at_activate otp -a '+atsign),
			has_atkey ? E('div', { 'class': 'cbi-map-descr'}, _('Existing key found at: '+has_atkey)) : E([]),
			enrollready ? instructions : E([]),
			enrollready ? enrollcmd  : E([]),
			enrollready ? table : E([]),
			enrollready ? cmdwindow : E([]),
		]);

		return view;
	},

	handleSaveApply: null,
	handleSave: null,
	handleReset: null
});