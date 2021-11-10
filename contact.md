---
layout: page
title: Contato
description: Vamos conversar.
permalink: /contato/
---

<style type="text/css" media="screen">
	.container {
		margin: 0px auto;
		max-width: 600px;
	}

	.contact-form input[type="text"], .contact-form input[type="email"], .contact-form textarea {
		box-sizing: border-box;
		outline: none;
		display: block;
		color: #333333;
		width: 100%;
		padding: 7px;
		border: none;
		border-bottom: 1px solid #ddd;
		margin-bottom: 10px;
		font-family: inherit;
		font-size: 1.125rem;
		height: 2.8125rem;
	}

	.contact-form textarea {
		height: 12.5rem;
	}

	.contact-form buttom[type="submit"] {
		display: block;
		padding: .875rem 2.4375rem .875rem 2.4375rem;
		color: #ffffff;
		background: #ff0a16;
		font-size: 1.125rem;
		width: 100%;
		border: 1px solid #700005;
		border-width: 1px 1px 3px;
		margin-top: 3.125rem;
		margin-bottom: .625rem;
		cursor: pointer;
		transition: all 0.3s;
		outline: none;
	}

	.contact-form buttom[type="submit"]:hover {
		background-color: rgb(130, 0, 6);
		background-image: none;
	}

</style>

<div class="container">
	<h2>Fale Comigo</h2>
	<div id="form" class="contact-form">
		<form id="my-form" method="POST" action="https://formspree.io/f/felipe.toscano@gmail.com" onload="ClearForm()">
			<fieldset>
				<input type="hidden" name="_subject" value="Blog Felipe Toscano - Novo contato!" />
				<input type="hidden" name="_next" value="{{ site.url }}/contato/mensagem-enviada/" />
				<input type="hidden" name="_language" value="pt-BR" />
				<!-- <label for="full-name">Nome Completo:</label> -->
				<input type="text" name="name" placeholder="Seu nome" id="full-name" required />
				<!-- <label>Email:</label> -->
				<input type="email" name="_replyto" placeholder="Seu e-mail" required />
				<!-- <label>Mensagem:</label> -->
				<textarea placeholder="Sua mensagem" name="message" required></textarea>
				<button type="submit">Enviar</button>
				<p id="my-form-status"></p>
			</fieldset>
		</form>
	</div>
<div>

<script type="text/javascript">
	function ClearForm() {
		console.log("Limpando Form Contato no Carregamento.")
		document.getElementById("my-form").reset();
	}
</script>