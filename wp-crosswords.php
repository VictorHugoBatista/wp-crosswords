<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://studiovisual.com.br/
 * @since             1.0.0
 * @package           Wp_Crosswords
 *
 * @wordpress-plugin
 * Plugin Name:       WP Crosswords
 * Plugin URI:         
 * Description:       Adiciona a funcionalidade de criação de jogos de palavras cruzadas interativos. Os jogos são adicionados ao site por meio de shortcodes gerados no momento da criação.
 * Version:           0.0.0
 * Author:            StudioVisual
 * Author URI:        https://studiovisual.com.br/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       wp-crosswords
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'PLUGIN_NAME_VERSION', '0.0.0' );

require_once 'acf-crosswords/acf-crosswords-field.php';

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-wp-crosswords-activator.php
 */
function activate_wp_crosswords() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-wp-crosswords-activator.php';
	Wp_Crosswords_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-wp-crosswords-deactivator.php
 */
function deactivate_wp_crosswords() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-wp-crosswords-deactivator.php';
	Wp_Crosswords_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_wp_crosswords' );
register_deactivation_hook( __FILE__, 'deactivate_wp_crosswords' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-wp-crosswords.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_wp_crosswords() {

	$plugin = new Wp_Crosswords();
	$plugin->run();

}
run_wp_crosswords();
