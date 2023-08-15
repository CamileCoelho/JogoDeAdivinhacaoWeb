class JogoDeAdivinhacao 
{
    btnTentar = document.getElementById("btn-tentar");
	txtTentativa = document.getElementById("input-numero");
	txtFeedback = document.getElementById("txtFeedback");

	numeroImputado = 0;
	numeroCorreto = 0;
    tentativas = 20;

    constructor() 
    {
		this.RegistrarEventos();
		this.Limpar();
		this.numeroCorreto = Math.floor(Math.random() * 20) + 1;
		this.tentativas = 20;
	}
    
	RegistrarEventos() 
    {
		this.txtTentativa.addEventListener("keyup", (e) => this.NumeroImputado(e.target.value));

		this.btnTentar.addEventListener("click", () => this.VerificarSeAcertou());
	}

    NumeroImputado(numero) 
    {
		this.txtFeedback.visibility = "hidden";

		const caracteresValidos = "123456789";

		const arrayDeCaracteres = ["10","11","12","13","14","15","16","17","18","19","20",];

		const ehNumeroValido = caracteresValidos.includes(numero) || arrayDeCaracteres.includes(numero)	? true : false;

		const numNaoEstaNoIntervalo = numero > 20 || numero < 1 ? true : false;

		this.txtFeedback.style.visibility = "hidden";

		if (numNaoEstaNoIntervalo) 
        {
			this.btnTentar.disabled = true;

			this.txtFeedback.innerText = "O número deve estar entre 1 e 20.";

			this.txtFeedback.style.visibility = "visible";

			return;
		}

		if (!ehNumeroValido) 
        {
			this.btnTentar.disabled = true;

			this.txtFeedback.innerText = "Não são permitidos letras ou caracteres especiais. \nTente novamente.";

			this.txtFeedback.style.visibility = "visible";

			return;
		}

		if (ehNumeroValido) this.btnTentar.removeAttribute("disabled");

		this.numeroImputado = Number(numero);
	}
    
	VerificarSeAcertou() 
    {
		if (this.tentativas == 1 && this.numeroImputado != this.numeroCorreto) {
			this.Perdeu();
			return;
		}
		if (this.numeroImputado == this.numeroCorreto) {
			this.Ganhou();
			return;
		}
		if (this.tentativas > 0 && this.numeroImputado != this.numeroCorreto) {
			this.tentativas = this.tentativas - 1;
			this.TentarNovamente();
		}
	}

    TentarNovamente() 
    {
		if (this.numeroImputado < this.numeroCorreto) {
			this.MensagemTenteNovamente("menor");
		}
		if (this.numeroImputado > this.numeroCorreto) {
			this.MensagemTenteNovamente("maior");
		}
	}

	async MensagemTenteNovamente(feedbackString) 
    {
        this.txtFeedback.style.visibility = "visible";
		this.txtFeedback.textContent = `Seu número é ${feedbackString} do que o Número Secreto.`;
	}

	async Perdeu() 
    {
        this.txtFeedback.style.visibility = "visible";
		this.txtFeedback.style.background = "#b91c1c";
		this.txtFeedback.textContent = "Você perdeu, jogue novamente!";
		this.txtTentativa.disabled = true;
		this.btnTentar.disabled = true;
	}

	async Ganhou() 
    {
        this.txtFeedback.style.visibility = "visible";
		this.txtFeedback.style.background = "#047857";
		this.txtFeedback.textContent = "Parabéns, você ganhou!";
		this.txtTentativa.disabled = true;
		this.btnTentar.disabled = true;
	}

    Limpar() 
    {
		this.txtTentativa.disabled = false;
		this.txtFeedback.style.visibility = "hidden";
		this.txtTentativa.value = "";
	}
}

window.addEventListener("load", new JogoDeAdivinhacao());