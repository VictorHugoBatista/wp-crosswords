<div class="crossword-solved text-center">
	<h3 class="crossword-solved-title">Caça palavras preenchido!</h3>
	<div class="text-center">
		<form method="POST" action="/wp-crosswords/restart">
			<input type="hidden" name="id" value="<?php echo $data['id'] ?>" />
			<button class="crossword-puzzle-button">
				Preencher novamente
			</button>
		</form>
	</div>
</div>
