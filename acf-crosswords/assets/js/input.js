(function($){

	/**
	 * Responsável pelas interações e eventos do editor de palavras cruzadas.
	 */
	var crossword_editor = {
		/**
		 * Detém todos os dados relacionados ao componente.
		 */
		data: {},

		/**
		 * Detém todos os objetos jQuery relacionados ao componente.
		 */
		elements: {},

		initialize: function() {
			if (this.initializeElements()) {
				this.setupEditor();
				this.initializeEvents();
			}
		},

		/**
		 * Instancia e cacheia todos os objetos jQuery
		 * relevantes relacionados ao componente.
		 * @returns {boolean} Verdadeiro se o componente existe na página.
		 */
		initializeElements: function() {			
			var $crossword_editor = $('.crossword-editor');
			if (! $crossword_editor.length) {
				return false;
			}
			this.elements = {
				$crossword_editor: $crossword_editor,
				$crossword_editor_button: $('.crossword-editor-button'),
				$crossword_editor_hidden: $('.crossword-editor-hidden'),
				$crossword_editor_layout_row_control: $('.crossword-editor-layout-row-control'),
			};
			return true;
		},

		/**
		 * Inicializa o html da tabela do editor e a propriedade data.
		 */
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
			this.repaintCrossword();
		},

		/**
		 * Inicializa os eventos relacionados ao componente.
		 */
		initializeEvents: function() {
			var self = this;

			// Digitar nos campos da tabela do editor.
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

			// Click nos botões de adição/remoção de linhas/colunas.
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

		/**
		 * Atualiza a tabela do editor de palavras cruzadas
		 * à partir dos dados carregados na propriedade data.
		 */
		repaintCrossword: function() {
			var crossword = crossword_table.regenerate(
				this.data.crosword_letters,
				this.data.crossword_size
			);
			this.elements.$crossword_editor.html(crossword);
			this.updateInputHidden();
			this.centerLateralControls();
		},

		/**
		 * Atualiza uma item na propriedade crosword_letters.
		 * crosword_letters[pos_y][pos_x]
		 * @param {string} letter Novo dado à atualizar o objeto.
		 * @param {string} pos_x Posição à atualizar no x
		 * @param {string} pos_y Posição à atualizar no y
		 */
		updateLetters: function(letter, pos_x, pos_y) {
			this.data.crosword_letters[pos_y][pos_x] = letter;
			this.updateInputHidden();
		},

		/**
		 * Atualiza o input hidden com o a propriedade crosword_letters.
		 */
		updateInputHidden() {
			this.elements.$crossword_editor_hidden
				.val(JSON.stringify(this.data.crosword_letters));
		},

		/**
		 * Adiciona ou remove uma linha da tabela do editor.
		 * @param {string} operator Determina se a linha será adicionada ou removida. add | rem.
		 * @param {string} pos Posição onde a linha será adicionada ou removida. bottom | top.
		 */
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
				if (1 >= this.data.crossword_size.y) {
					return;
				}
				var position_to_remove = 'top' === pos ?
					'begin' : 'end';
				array_functions.remove_item(
					this.data.crosword_letters,
					position_to_remove
				);
				this.data.crossword_size.y--;
			}
			this.repaintCrossword();
		},

		/**
		 * Adiciona ou remove uma coluna da tabela do editor.
		 * @param {string} operator Determina se a coluna será adicionada ou removida. add | rem.
		 * @param {string} pos Posição onde a coluna será adicionada ou removida. left | right.
		 */
		updateCol: function(operator, pos) {
			var position_to_remove = 'left' === pos ? 'begin' : 'end';
			for (var row_index in this.data.crosword_letters) {
				var current_row = this.data.crosword_letters[row_index];
				if ('add' === operator) {
					if ('right' === pos) {
						current_row.push('');
					} else { // left
						current_row.unshift('');
					}
				} else { // rem
					if (1 >= this.data.crossword_size.x) {
						return;
					}
					array_functions.remove_item(
						current_row,
						position_to_remove
					);
				}
			}
			if ('add' === operator) {
				this.data.crossword_size.x++;
			} else { // rem
				this.data.crossword_size.x--;
			}
			this.repaintCrossword();
		},

		/**
		 * Centraliza os controles laterais
		 * com base na tabela do editor.
		 */
		centerLateralControls: function() {
			var new_height = this.elements.$crossword_editor.css('height');
			this.elements.$crossword_editor_layout_row_control
				.css('height', new_height);
		},
	};

	/**
	 * Responsável por gerar os htmls da tabela
	 * do editor de palavras cruzadas.
	 */
	var crossword_table = {
		/**
		 * Gera o html da tabela do gerador de palavras cruzadas.
		 * @param {array} letters Array bidimensional com os dados à serem exibidos.
		 * @param {object} size Objeto com o tamanho do editor em x e y.
		 * @returns {string} Texto com a tabela gerada.
		 */
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
	 * Responsável por funções complexas envolvendo arrays.
	 */
	var array_functions = {
		/**
		 * Remove o primeiro ou o último item de um array.
		 * @param {array} array Array com o item à ser removido.
		 * @param {string} position Posição do item. begin | end
		 * @returns {array} Array com o item removido.
		 */
		remove_item: function(array, position) {
			var index_to_remove = 'begin' === position ?
				0 : array.length - 1;
			array.splice(index_to_remove, 1);
			if ('begin' === position) {
				array = array.filter(function(val){return val});
			}
			return array;
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
