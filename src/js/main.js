var vueix = new Vue( {
	el: '.vueix-app',
	data: {},
	created: function() {
		this.initData();
	},
	methods: {
		initData: function() {
			self.data = vueixInstance.data;
		},
		saveData: function() {

			var xhr = new XMLHttpRequest();
			var self = this;
			xhr.open( 'POST', vueixInstance.url );
			xhr.onload = function() {
				// @todo: Log result.
			};
			xhr.send();
		}
	}
} );
