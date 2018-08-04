// Define text-input component.
Vue.component( 'input-text', {
	props: [ 'field', 'value' ],
	template: '<div class="vueix-field">{{field.label}}<input type="text" :value="value" v-on:input="$emit(\'input\', $event.target.value)"></div>',
} );
