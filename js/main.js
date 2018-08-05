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

// Define text-input component.
Vue.component( 'input-checkbox', {
	props: [ 'field', 'value' ],
	template: '<div class="vueix-field">{{field.label}}<input type="checkbox" value="1" v-on:input="$emit(\'input\', $event.target.checked)"></div>',
} );

// Define text-input component.
Vue.component( 'input-text', {
	props: [ 'field', 'value' ],
	template: '<div class="vueix-field">{{field.label}}<input type="text" :value="value" v-on:input="$emit(\'input\', $event.target.value)"></div>',
} );

// Define text-input component.
Vue.component( 'panel', {
	props: [ 'panel', 'value' ],
	template: '<div class="vueix-panel">{{panel.label}}<div v-for="(name,item) in value"><component v-bind:is="value[name].type"></component></div>',
} );
