document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-acervo");
  const btnCadastrar = document.getElementById("btnCadastrar");

  // Campos
  const campoId = document.getElementById("id");
  const titulo = document.getElementById("titulo");
  const autor = document.getElementById("autor");
  const editora = document.getElementById("editora");
  const ano = document.getElementById("ano");
  const isbn = document.getElementById("isbn"); // opcional

  const radiosDisponivel = document.querySelectorAll(
    'input[name="disponivel"]'
  );

  /* =========================
     ID DESABILITADO
  ========================= */
  campoId.value = "";
  campoId.disabled = true;
  campoId.style.backgroundColor = "#f1f1f1";
  campoId.style.cursor = "not-allowed";
  campoId.style.opacity = "0.8";

  /* =========================
     CAMPOS OBRIGATÓRIOS (*)
  ========================= */
  const obrigatorios = [
    titulo,
    autor,
    editora,
    ano
  ];

  obrigatorios.forEach((campo) => {
    const label = document.querySelector(`label[for="${campo.id}"]`);

    if (label && !label.innerHTML.includes("*")) {
      label.innerHTML += ' <span style="color:red;">*</span>';
    }
  });

  /* =========================
     SOMENTE LETRAS MAIÚSCULAS
  ========================= */

  const camposMaiusculos = [
    titulo,
    autor,
    editora
  ];

  camposMaiusculos.forEach((campo) => {
    campo.addEventListener("input", () => {
      campo.value = campo.value.toUpperCase();
      validarFormulario();
    });
  });

  /* =========================
     BOTÃO COMEÇA DESABILITADO
  ========================= */
  btnCadastrar.disabled = true;
  btnCadastrar.style.opacity = "0.6";
  btnCadastrar.style.cursor = "not-allowed";

  /* =========================
     VALIDAR FORMULÁRIO
  ========================= */
  function validarFormulario() {
    const camposPreenchidos = obrigatorios.every((campo) => {
      return campo.value.trim() !== "";
    });

    const radioSelecionado = document.querySelector(
      'input[name="disponivel"]:checked'
    );

    const tickPreenchido = radioSelecionado !== null;

    if (camposPreenchidos && tickPreenchido) {
      btnCadastrar.disabled = false;
      btnCadastrar.style.opacity = "1";
      btnCadastrar.style.cursor = "pointer";
    } else {
      btnCadastrar.disabled = true;
      btnCadastrar.style.opacity = "0.6";
      btnCadastrar.style.cursor = "not-allowed";
    }
  }

  /* =========================
     EVENTOS
  ========================= */
  obrigatorios.forEach((campo) => {
    campo.addEventListener("input", validarFormulario);
    campo.addEventListener("blur", validarFormulario);
  });

  radiosDisponivel.forEach((radio) => {
    radio.addEventListener("change", validarFormulario);
  });

  /* =========================
     SUBMIT
  ========================= */
 form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const radioSelecionado = document.querySelector(
    'input[name="disponivel"]:checked'
  );

  if (!radioSelecionado) {
    alert("Selecione Sim ou Não.");
    return;
  }

  const dadosFormulario = {
    titulo: titulo.value.trim(),
    autor: autor.value.trim(),
    editora: editora.value.trim(),
    ano: ano.value.trim(),
    isbn: isbn.value.trim(),
    disponivel: radioSelecionado.value,
    categoria: document.getElementById("categoria").value, // IMPORTANTE
    edicao: document.getElementById("edicao").value,
    preco: document.getElementById("preco").value
  };

  try {
    const resposta = await fetch("http://localhost:3000/livros", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dadosFormulario)
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
      alert(resultado.mensagem || "Erro ao cadastrar");
      return;
    }

    alert("Livro cadastrado com sucesso!");

    form.reset();
    validarFormulario();

  } catch (erro) {
    console.error(erro);
    alert("Erro de conexão com o servidor");
  }
});