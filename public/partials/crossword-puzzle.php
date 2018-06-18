<table>
	<?php foreach ($crossword as $row) : ?>
	<tr>
		<?php foreach ($row as $cell) : ?>
		<td><?php echo $cell ?></td>
		<?php endforeach ?>
	</tr>
	<?php endforeach ?>
</table>
