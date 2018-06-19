<?php
use Brain\Cortex\Route\RouteCollectionInterface;
use Brain\Cortex\Route\QueryRoute;

/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://studiovisual.com.br/
 * @since      1.0.0
 *
 * @package    Wp_Crosswords
 * @subpackage Wp_Crosswords/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Wp_Crosswords
 * @subpackage Wp_Crosswords/public
 * @author     StudioVisual < >
 */
class Wp_Crosswords_Public {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Wp_Crosswords_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Wp_Crosswords_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/wp-crosswords-public.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Wp_Crosswords_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Wp_Crosswords_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/wp-crosswords-public.js', array( 'jquery' ), $this->version, false );

	}

	public function create_shortcode_palavra_cruzada() {
		add_shortcode('palavra_cruzada', function($atts) {
		    $data = shortcode_atts([
		        'id' => '',
		    ], $atts);
		    if ('' === $data['id']) {
		    	return;
		    }
		    $crossword = $this->get_crossword($data['id']);
		    ob_start();
		    include 'partials/crossword-puzzle.php';
		    return ob_get_clean();
		});
	}

	public function cortex_routes(RouteCollectionInterface $routes) {
	    $routes->addRoute(new QueryRoute(
	        'wp-crosswords/eval',
	        function(array $matches) {
	        	var_dump('teste');
	        	die();
	        }
	    ));
	}

	private function get_crossword($post_id) {
		$crossword = function_exists('get_field') ?
			get_field('palavra-cruzada', $post_id) : '';
		if (! $crossword || '' === $crossword) {
			return [];
		}
		return json_decode($crossword);
	}
}
