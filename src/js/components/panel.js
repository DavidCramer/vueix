// Define text-input component.
Vue.component( 'panel', {
	props: [ 'panel', 'value' ],
	template: '<div class="vueix-panel">{{panel.label}}<div v-for="(name,item) in value"><component v-bind:is="value[name].type"></component></div>',
} );
