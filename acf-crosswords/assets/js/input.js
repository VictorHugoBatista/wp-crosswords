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
				$crossword_editor_add_col: $('.crossword-editor-add-col'),
				$crossword_editor_rem_col: $('.crossword-editor-rem-col'),
				$crossword_editor_add_row: $('.crossword-editor-add-row'),
				$crossword_editor_rem_row: $('.crossword-editor-rem-row'),
			};
			return true;
		},
		setupEditor: function() {
			this.data.crossword_size = {
				x: 8,
				y: 8,
			};
			var self = this;
			this.data.crosword_letters =
				Array(this.data.crossword_size.y).fill().map(function(){
					return Array(self.data.crossword_size.x).fill()
				});
			this.initializeFields();
		},
		initializeFields: function() {
			var table_html = '';
			this.elements.$crossword_editor
				.html(crossword_table.initializeTableEmpty(this.data.crossword_size));
		},
	};

	var crossword_table = {
		initializeTableEmpty: function(size) {
			var table_html = '';
			for (tr_index = 0; tr_index < size.y; tr_index++) {
				table_html += '<tr>';
				for (td_index = 0; td_index < size.x; td_index++) {
					table_html += '<td>';
					table_html += '    <input type="text" class="crossword-editor-cell" maxlength="1">';
					table_html += '</td>';
				}
				table_html += '</tr>';
			}
			return table_html;
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
