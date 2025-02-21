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
		return Promise.all([
			uci.load('sshnpd')
		]);
	},

	render: function(res) {

		var atsign = uci.get_first('sshnpd','','atsign'),
			device = uci.get_first('sshnpd','','device'),
			keyfile = '/root/.atsign/keys/'+atsign+'_key.atKeys',
			keyfound = fs.stat(keyfile);

		var table = E('table', { 'class': 'table' }, [
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
			]);

		var view = E('div', { 'class': 'cbi-map'}, [
			E('h2', {}, [ _('NoPorts atSign Enrollment') ]),
			E('div', { 'class': 'cbi-map-descr'}, _('Keys are located at: '+keyfile+' and are '+keyfound)),
			E('div', { 'class': 'cbi-map-descr'}, _('Press the Enroll button then run this command on a system where '+atsign+' is activated:')),
			E('code','at_activate approve -a '+atsign+' --arx noports --drx '+device),
			table,
						E('div', {'class': 'cbi-section'}, [
				E('div', { 'id' : 'command-output'},
					E('textarea', {
						'id': 'widget.command-output',
						'style': 'width: 100%; font-family:monospace; white-space:pre',
						'readonly': true,
						'wrap': 'on',
						'rows': '20'
					})
				)
			])
		]);

		return view;
	},

	handleSaveApply: null,
	handleSave: null,
	handleReset: null
});