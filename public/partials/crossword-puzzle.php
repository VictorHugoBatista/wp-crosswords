<form class="crossword-puzzle-form" action="">
	<table class="crossword-puzzle">
		<?php foreach ($crossword as $key_row => $row) : ?>
		<tr>
			<?php foreach ($row as $key_cell => $cell) : ?>
			<?php if ('' !== $cell) : ?>
			<td class="bordered">
				<input type="text" class="crossword-puzzle-cell" required
					name="crossword-puzzle-cell[<?php echo $key_row ?>][<?php echo $key_cell ?>]" />
			</td>
			<?php else : ?>
			<td></td>
			<?php endif ?>
			<?php endforeach ?>
		</tr>
		<?php endforeach ?>
	</table>
	<div class="text-center">
		<button>Resolver</button>
	</div>
</form>
