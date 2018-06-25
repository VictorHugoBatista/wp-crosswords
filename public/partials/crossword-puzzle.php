<div>
	<h3><?php echo get_the_title($data['id']) ?></h3>
	<p>
		<?php echo get_post_field('post_content', $data['id']) ?>
	</p>
</div>
<div class="text-center">
	<form class="crossword-puzzle-form" method="POST" action="/wp-crosswords/eval">
		<input type="hidden" name="id" value="<?php echo $data['id'] ?>" />
		<table class="crossword-puzzle">
			<?php foreach ($crossword as $key_row => $row) : ?>
			<tr>
				<?php foreach ($row as $key_cell => $cell) : ?>
				<?php if ('' !== $cell) : ?>
				<?php
				$field_value = array_key_exists($key_row, $data_cells) &&
					array_key_exists($key_cell, $data_cells[$key_row]) ?
					$data_cells[$key_row][$key_cell] : '';
				?>
				<td class="bordered">
					<input type="text" class="crossword-puzzle-cell" required maxlength="1"
						name="crossword-puzzle-cell[<?php echo $key_row ?>][<?php echo $key_cell ?>]"
						value="<?php echo $field_value ?>"
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
</div>
