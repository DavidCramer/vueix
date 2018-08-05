// Define text-input component.
Vue.component( 'input-checkbox', {
	props: [ 'field', 'value' ],
	template: '<div class="vueix-field">{{field.label}}<input type="checkbox" value="1" v-on:input="$emit(\'input\', $event.target.checked)"></div>',
} );
