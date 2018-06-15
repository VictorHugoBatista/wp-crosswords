(function($){
	var crossword_editor = {
		data: {},
		elements: {},
		initialize: function() {
			if (this.initializeElements()) {
				this.setupEditor();
			}
		},
		initializeElements: function() {			
			var $crossword_editor = $('.crossword-editor');
			if (! $crossword_editor.length) {
				return false;
			}
			this.elements = {
				$crossword_editor: $crossword_editor,
			};
			return true;
		},
		setupEditor: function() {
			this.data.crossword_size = {
				x: 10,
				y: 10,
			};
			var self = this;
			this.data.crosword_letters =
				Array(this.data.crossword_size.y).fill().map(function(){
					return Array(self.data.crossword_size.x).fill()
				});
		}, 
	};
	
	/**
	*  initialize_field
	*
	*  This function will initialize the $field.
	*
	*  @date	30/11/17
	*  @since	5.6.5
	*
	*  @param	n/a
	*  @return	n/a
	*/
	
	function initialize_field( $field ) {
		crossword_editor.initialize();
	}
	
	
	if( typeof acf.add_action !== 'undefined' ) {
	
		/*
		*  ready & append (ACF5)
		*
		*  These two events are called when a field element is ready for initizliation.
		*  - ready: on page load similar to $(document).ready()
		*  - append: on new DOM elements appended via repeater field or other AJAX calls
		*
		*  @param	n/a
		*  @return	n/a
		*/
		
		acf.add_action('ready_field/type=crosswords', initialize_field);
		acf.add_action('append_field/type=crosswords', initialize_field);
		
		
	} else {
		
		/*
		*  acf/setup_fields (ACF4)
		*
		*  These single event is called when a field element is ready for initizliation.
		*
		*  @param	event		an event object. This can be ignored
		*  @param	element		An element which contains the new HTML
		*  @return	n/a
		*/
		
		$(document).on('acf/setup_fields', function(e, postbox){
			
			// find all relevant fields
			$(postbox).find('.field[data-field_type="crosswords"]').each(function(){
				
				// initialize
				initialize_field( $(this) );
				
			});
		
		});
	
	}

})(jQuery);
