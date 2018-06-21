<div data-redirect-crossword="<?php echo $redirect_id ?>">
	<?php if (! empty($message)) : ?>
	<?php include 'eval_messages.php' ?>
	<?php endif ?>
	<?php if (! array_key_exists("wp-crosswords-solved-{$data['id']}", $_COOKIE)) : ?>
	<?php include 'crossword-puzzle.php' ?>
	<?php else : ?>
	<?php include 'crossword-solved.php' ?>
	<?php endif ?>
</div>
