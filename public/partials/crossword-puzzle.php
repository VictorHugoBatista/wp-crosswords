<table class="crossword-puzzle">
	<?php foreach ($crossword as $row) : ?>
	<tr>
		<?php foreach ($row as $cell) : ?>
		<?php if ('' !== $cell) : ?>
		<td class="bordered">
			<input type="text" class="crossword-puzzle-cell" value="<?php echo $cell ?>" />
		</td>
		<?php else : ?>
		<td></td>
		<?php endif ?>
		<?php endforeach ?>
	</tr>
	<?php endforeach ?>
</table>
