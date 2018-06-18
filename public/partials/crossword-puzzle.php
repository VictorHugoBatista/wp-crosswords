<table class="crossword-puzzle">
	<?php foreach ($crossword as $row) : ?>
	<tr>
		<?php foreach ($row as $cell) : ?>
		<?php if ('' !== $cell) : ?>
		<td class="bordered">
			<?php echo $cell ?>
		</td>
		<?php else : ?>
		<td></td>
		<?php endif ?>
		<?php endforeach ?>
	</tr>
	<?php endforeach ?>
</table>
