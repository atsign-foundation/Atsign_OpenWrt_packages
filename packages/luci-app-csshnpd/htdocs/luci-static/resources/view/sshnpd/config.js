'use strict';
'require view';
'require form';

// Project code format is tabs, not spaces
return view.extend({
	render: function() {
		var m, s, o;

		/*
		The first argument to form.Map() maps to the configuration file available
		via uci at /etc/config/. In this case, 'sshnpd' maps to /etc/config/sshnpd.

		If the file is completely empty, the form sections will indicate that the
		section contains no values yet. As such, your package installation (LuCI app
		or software that the app configures) should lay down a basic configuration
		file with all the needed sections.

		The relevant ACL path for reading a configuration with UCI this way is
		read > uci > ["example"]

		The relevant ACL path for writing back the configuration is
		write > uci > ["example"]
		*/
		m = new form.Map('sshnpd', _('NoPorts'),
			_('Daemon Configuration'));

		s = m.section(form.TypedSection, 'sshnpd', _('sshnpd config'));
		s.anonymous = true;

		s.option(form.Value, 'atsign', _('Device atSign'),
			_('The device atSign e.g. @device'));

		s.option(form.Value, 'manager', _('Manager atSign'),
			_('The manager atSign e.g. @manager'));

		s.option(form.Value, 'device', _('Device name'),
			_('The name for this device e.g. openwrt'));

		s.option(form.Value, 'args', _('Additional arguments'),
			_('Further command line arguments for the NoPorts daemon'));

		s.option(form.Value, 'otp', _('Enrollment OTP/STP'),
			_('One Time Passcode (OTP) for device atSign enrollment'));

		o = s.option(form.Flag, 'enabled', _('Enabled'),
			_('Check here to enable the service'));
		o.default = '1';
		o.rmempty = false;

		return m.render();
	},
});
