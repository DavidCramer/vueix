<?php
/*
 * Plugin Name: VUEIX
 * Plugin URI:
 * Description:
 * Version: 0.0.1
 * Author: David Cramer
 * Author URI: https://cramer.co.za
 * Text Domain: vueix
 * License: GPL2+
*/

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

// Constants.
define( 'VUEIX_PATH', plugin_dir_path( __FILE__ ) );
define( 'VUEIX_CORE', __FILE__ );
define( 'VUEIX_URL', plugin_dir_url( __FILE__ ) );
define( 'VUEIX_VER', '0.0.1' );

// Includes and run.
//include_once VUEIX_PATH . 'vueix-bootstrap.php';
//include_once VUEIX_PATH . 'classes/vueix.php';

add_filter( 'the_content', function () {
	wp_enqueue_script( 'vue', VUEIX_URL . '/js/vue.js', array(), VUEIX_VER, true );
	wp_enqueue_script( 'vueix', VUEIX_URL . '/js/main.js', array( 'vue' ), VUEIX_VER, true );

	$data = array(
		'url'  => './',
		'data' => array(
			'name'    => 'David',
			'details' => array(
				'surname' => 'cramer',
				'age'     => '38',
			),

		),
	);

	$structure = array(
		'name'    => array(
			'label' => 'First Name',
			'type'  => 'text',
		),
		'details' => array(
			'surname' => array(
				'label' => 'Last Name',
				'type'  => 'text',
			),
			'age'     => array(
				'label' => 'Age',
				'type'  => 'text',
			),
		),
	);

	?>
	<div class="vueix-app" data-vueix="<?php echo esc_attr( wp_json_encode( $data ) ); ?>">

		<?php foreach ( $structure as $name => $item ) : ?>
			<?php if ( !isset( $item['type'] ) ) : ?>
				<div>
					<h5><?php echo $name; ?></h5>
					<?php foreach ( $item as $key => $value ) : ?>
						<input-text v-bind:field="<?php echo esc_attr( wp_json_encode( $value ) ); ?>" v-model="vueix.<?php echo esc_attr( $name ); ?>.<?php echo esc_attr( $key ); ?>" v-if="vueix"></input-text>
					<?php endforeach; ?>
				</div>
			<?php else: ?>
				<input-text v-bind:field="<?php echo esc_attr( wp_json_encode( $item ) ); ?>" v-model="vueix.<?php echo esc_attr( $name ); ?>" v-if="vueix"></input-text>
			<?php endif; ?>
		<?php endforeach; ?>
		<pre>{{vueix}}</pre>
	</div>
	<?php
} );

