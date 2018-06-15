(function($){
	var crossword_editor = {
		data: {},
		elements: {},
		initialize: function() {
			if (this.initializeElements()) {
				this.setupEditor();
				this.initializeEvents();
			}
		},
		initializeElements: function() {			
			var $crossword_editor = $('.crossword-editor');
			if (! $crossword_editor.length) {
				return false;
			}
			this.elements = {
				$crossword_editor: $crossword_editor,
				$crossword_editor_button: $('.crossword-editor-button'),
				$crossword_editor_hidden: $('.crossword-editor-hidden'),
			};
			return true;
		},
		setupEditor: function() {
			var value = this.elements.$crossword_editor_hidden.val(); 
			if ('' === value) {
				this.data.crossword_size = {
					x: 8,
					y: 8,
				};
				var self = this;
				this.data.crosword_letters =
					Array(this.data.crossword_size.y).fill('').map(function(){
						return Array(self.data.crossword_size.x).fill('')
					});
			} else {
				value = JSON.parse(value);
				this.data.crosword_letters = value;
				this.data.crossword_size = {
					x: 0 < value.length ? value[0].length : 0,
					y: value.length,
				};
			}
			this.initializeFields();
		},
		initializeFields: function() {
			this.elements.$crossword_editor
				.html(crossword_table.regenerate(this.data.crosword_letters, this.data.crossword_size));
		},
		initializeEvents: function() {
			var self = this;
			this.elements.$crossword_editor.on('keyup', '.crossword-editor-cell', function(event){
				var $this = $(event.currentTarget),
					pos_x = $this.data('x'),
					pos_y = $this.data('y'),
					letter = $this.val();
				self.updateLetters(letter, pos_x, pos_y);
			});
			this.elements.$crossword_editor_button.on('click', function(event) {
				event.preventDefault();
				var $this = $(event.currentTarget),
					operator = $this.data('operator'),
					type = $this.data('type'),
					pos = $this.data('pos');
				console.log(operator, type, pos);
			})
		},
		updateLetters: function(letter, pos_x, pos_y) {
			this.data.crosword_letters[pos_y][pos_x] = letter;
			this.elements.$crossword_editor_hidden
				.val(JSON.stringify(this.data.crosword_letters));
		},
	};

	var crossword_table = {
		regenerate: function(letters, size) {
			var table_html = '';
			for (tr_index = 0; tr_index < size.y; tr_index++) {
				table_html += '<tr>';
				for (td_index = 0; td_index < size.x; td_index++) {
					table_html += '<td>';
					table_html += '    <input type="text" class="crossword-editor-cell" data-x="' + td_index + '" data-y="' + tr_index + '" value="' + letters[tr_index][td_index] + '" maxlength="1">';
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
