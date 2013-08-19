growl = require 'growl'

# Export Plugin
module.exports = (BasePlugin) ->
	# Define Growl Plugin
	class GrowlPlugin extends BasePlugin
		# Plugin Name
		name: 'growl'
		config:
			enabled: true

		# Listen to notify event
		notify: (message, opts) ->
			growl message, opts