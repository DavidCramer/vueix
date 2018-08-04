var vueix = new Vue( {
	el: '.vueix-app',
	data: {
		vueix : null
	},
	mounted: function() {
		this.initData();
	},
	methods: {
		initData: function() {
			var init = this.$el.getAttribute( 'data-vueix' );
			var data = JSON.parse( init );
			this.vueix = data.data;
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
