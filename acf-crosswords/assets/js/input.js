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
				this.data.crossword_size = {x: 15, y: 15};
				var self = this;
				this.data.crosword_letters =
					Array(this.data.crossword_size.y).fill('').map(function() {
						return Array(self.data.crossword_size.x).fill('');
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
			this.repaintCrossword();
		},
		initializeEvents: function() {
			var self = this;
			this.elements.$crossword_editor.on('keyup', '.crossword-editor-cell', function(event) {
				var $this = $(event.currentTarget),
					pos_x = $this.data('x'),
					pos_y = $this.data('y'),
					letter = $this.val();
				self.updateLetters(letter, pos_x, pos_y);
				if ('' !== letter) {
					$this.addClass('filled');
				} else {
					$this.removeClass('filled');
				}
			});
			this.elements.$crossword_editor_button.on('click', function(event) {
				event.preventDefault();
				var $this = $(event.currentTarget),
					operator = $this.data('operator'),
					type = $this.data('type'),
					pos = $this.data('pos');
				if ('row' === type) {
					self.updateRow(operator, pos);
					return;
				}
				self.updateCol(operator, pos);
			});
		},
		repaintCrossword: function() {
			var crossword = crossword_table.regenerate(
				this.data.crosword_letters,
				this.data.crossword_size
			);
			this.elements.$crossword_editor.html(crossword);
			this.updateInputHidden();
		},
		updateLetters: function(letter, pos_x, pos_y) {
			this.data.crosword_letters[pos_y][pos_x] = letter;
			this.updateInputHidden();
		},
		updateInputHidden() {
			this.elements.$crossword_editor_hidden
				.val(JSON.stringify(this.data.crosword_letters));
		},
		updateRow: function(operator, pos) {
			if ('add' === operator) {
				var new_row = Array(this.data.crossword_size.x).fill('');
				if ('bottom' === pos) {
					this.data.crosword_letters.push(new_row);
				} else { // top
					this.data.crosword_letters.unshift(new_row);
				}
				this.data.crossword_size.y++;
			} else { // rem
				var position_to_remove = 'bottom' === pos ?
					this.data.crosword_letters.length - 1 : 0;
				this.data.crosword_letters.splice(
					position_to_remove, 1
				);
				if ('top' === pos) {
					this.data.crosword_letters =
						this.data.crosword_letters.filter(function(val){return val});
				}
				this.data.crossword_size.y--;
			}
			this.repaintCrossword();
		},
		updateCol: function(operator, pos) {
			console.log('[update-col]', operator, pos);
			this.repaintCrossword();
		},
	};

	var crossword_table = {
		regenerate: function(letters, size) {
			var table_html = '';
			for (tr_index = 0; tr_index < size.y; tr_index++) {
				table_html += '<tr>';
				for (td_index = 0; td_index < size.x; td_index++) {
					var value = letters[tr_index][td_index],
						filled_class = '' !== value ? 'filled' : '';
					table_html += '<td>';
					table_html += '    <input type="text"';
					table_html += '        class="crossword-editor-cell ' + filled_class + '"';
					table_html += '        data-x="' + td_index + '" data-y="' + tr_index + '"';
					table_html += '        value="' + value + '" maxlength="1">';
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
