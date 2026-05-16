document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cadastroForm");
  const btnCadastrar = document.getElementById("btnCadastrar");
  btnCancelar.addEventListener("click", () => {
    form.reset();    
    campoId.value = "";    
    const botaoCadastrar = document.getElementById("btnCadastrar");
    botaoCadastrar.disabled = true;
  });
  // Campos
  const campoId = document.getElementById("id");
  const titulo = document.getElementById("titulo");
  const autor = document.getElementById("autor");
  const editora = document.getElementById("editora");
  const ano = document.getElementById("ano");
  const isbn = document.getElementById("isbn");
  const edicao = document.getElementById("edicao");
  const preco = document.getElementById("preco");
  const categoria = document.getElementById("categoria");


  campoId.disabled = true;


  const forcarMaiusculas = (evento) => {
    evento.target.value = evento.target.value.toUpperCase();
  };

  [titulo, autor, editora].forEach(campo => {
    campo.addEventListener("input", forcarMaiusculas);
  });


  const validarFormulario = () => {
    const radioSelecionado = document.querySelector('input[name="disponivel"]:checked');
   
  form.addEventListener("reset", () => {  
    campoId.value = "";  

    setTimeout(validarFormulario, 0);
  });

    

    const obrigatoriosPreenchidos = 
      titulo.value.trim() !== "" &&
      autor.value.trim() !== "" &&
      edicao.value.trim() !== "" &&
      editora.value.trim() !== "" &&
      ano.value.trim() !== "" &&
      isbn.value.trim() !== "" &&
      preco.value.trim() !== "" &&
      categoria.value.trim() !== "" &&
      radioSelecionado !== null;


    btnCadastrar.disabled = !obrigatoriosPreenchidos;
  };


  form.addEventListener("input", validarFormulario);

  validarFormulario();

  // Envio do formulário
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const radioSelecionado = document.querySelector('input[name="disponivel"]:checked');

    const dadosLivro = {
      titulo: titulo.value.trim(),
      autor: autor.value.trim(),
      edicao: edicao.value.trim(),
      editora: editora.value.trim(),
      ano: parseInt(ano.value, 10),
      isbn: isbn.value.trim() || null,
      preco: preco.value.trim(),
      categoria: categoria.value,
      disponivel: radioSelecionado ? radioSelecionado.value : "NÃO"
    };

    try {
      const resposta = await fetch("http://localhost:3000/livros", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosLivro)
      });

      const resultado = await resposta.json();

      if (resposta.ok) {
        alert("Livro cadastrado com sucesso!");
        
        campoId.value = resultado.id;
        
        // Reseta o restante do formulário após 3 segundos e bloqueia o botão novamente
        setTimeout(() => {
          form.reset();
          validarFormulario();
        }, 3000);

      } else {
        alert("Erro no cadastro: " + resultado.error);
      }
    } catch (erro) {
      console.error("Erro na comunicação:", erro);
    }
  });
});
