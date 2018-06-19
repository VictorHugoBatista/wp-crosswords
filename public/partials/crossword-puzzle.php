<form class="crossword-puzzle-form" method="POST" action="/wp-crosswords/eval">
	<input type="hidden" name="id" value="<?php echo $data['id'] ?>" />
	<table class="crossword-puzzle">
		<?php foreach ($crossword as $key_row => $row) : ?>
		<tr>
			<?php foreach ($row as $key_cell => $cell) : ?>
			<?php if ('' !== $cell) : ?>
			<td class="bordered">
				<input type="text" class="crossword-puzzle-cell" required
					name="crossword-puzzle-cell[<?php echo $key_row ?>][<?php echo $key_cell ?>]"
					value="<?php echo array_key_exists($key_row, $data_cells) && array_key_exists($key_cell, $data_cells[$key_row]) ? $data_cells[$key_row][$key_cell] : '' ?>"
					/>
			</td>
			<?php else : ?>
			<td></td>
			<?php endif ?>
			<?php endforeach ?>
		</tr>
		<?php endforeach ?>
	</table>
	<div class="text-center">
		<button class="crossword-puzzle-button">
			Verificar solução
		</button>
	</div>
</form>
