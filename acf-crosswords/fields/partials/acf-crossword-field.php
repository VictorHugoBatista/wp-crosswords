<input type="hidden" class="crossword-editor-hidden"
	name="<?php echo esc_attr($field['name']) ?>"
	value="<?php echo esc_attr($field['value']) ?>" />
<div class="crossword-editor-layout-line-control">
	<button class="crossword-editor-button button button-primary"
		data-operator="add" data-type="row" data-pos="top" title="Adicionar linha">
		<span class="dashicons dashicons-plus"></span>
	</button>
	<button class="crossword-editor-button button button-primary"
		data-operator="rem" data-type="row" data-pos="top" title="Remover linha">
		<span class="dashicons dashicons-minus"></span>
	</button>
</div>
<div class="crossword-editor-wrapper">
	<div class="crossword-editor-layout-row crossword-editor-layout-row-control">
		<div class="crossword-editor-layout-row-control-inner">
			<div>
				<button class="crossword-editor-button button button-primary"
					data-operator="add" data-type="col" data-pos="left" title="Adicionar coluna">
					<span class="dashicons dashicons-plus"></span>
				</button>
			</div>
			<div>
				<button class="crossword-editor-button button button-primary"
					data-operator="rem" data-type="col" data-pos="left" title="Remover coluna">
					<span class="dashicons dashicons-minus"></span>
				</button>
			</div>
		</div>
	</div>
	<div class="crossword-editor-layout-row-center">
		<table class="crossword-editor">
		</table>
	</div>
	<div class="crossword-editor-layout-row crossword-editor-layout-row-control">
		<div class="crossword-editor-layout-row-control-inner">
			<div>
				<button class="crossword-editor-button button button-primary"
					data-operator="add" data-type="col" data-pos="right" title="Adicionar coluna">
					<span class="dashicons dashicons-plus"></span>
				</button>
			</div>
			<div>
				<button class="crossword-editor-button button button-primary"
					data-operator="rem" data-type="col" data-pos="right" title="Remover coluna">
					<span class="dashicons dashicons-minus"></span>
				</button>
			</div>
		</div>
	</div>
</div>
<div class="crossword-editor-layout-line-control">
	<button class="crossword-editor-button button button-primary"
		data-operator="add" data-type="row" data-pos="bottom" title="Adicionar linha">
		<span class="dashicons dashicons-plus"></span>
	</button>
	<button class="crossword-editor-button button button-primary"
		data-operator="rem" data-type="row" data-pos="bottom" title="Remover linha">
		<span class="dashicons dashicons-minus"></span>
	</button>
</div>
