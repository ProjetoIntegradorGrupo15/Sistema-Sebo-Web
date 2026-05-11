// cadastro.js
const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let valido = true;

    // Seleciona todos os inputs do formulário
    const inputs = document.querySelectorAll(".form-content input");

    // Verifica campos vazios
    inputs.forEach(input => {
        const erro = input.nextElementSibling; // pega o <a> logo após o input
        if (input.value.trim() === "") {
            erro.style.display = "inline";  // mostra a mensagem
            valido = false;
        } else {
            erro.style.display = "none";   // esconde se preenchido
        }
    });

    // Verifica se as senhas coincidem
    const senha = document.getElementById("password").value.trim();
    const senhaConfirmacao = document.getElementById("password-confirmation").value.trim();
    const senhaErro = document.getElementById("password-confirmation").nextElementSibling;

    if (senha !== senhaConfirmacao) {
        senhaErro.innerText = "As senhas não coincidem!";
        senhaErro.style.display = "inline";
        valido = false;
    }

    if (!valido) return; // não envia para o backend se houver erro

    // Todos os campos preenchidos e senhas corretas → envia para backend
    const nome = document.getElementById("username").value.trim();
    const login = document.getElementById("email").value.trim(); // email será usado como login

   try {
    console.log("Enviando cadastro...");

    const response = await fetch("/usuarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome, login, senha })
    });

    console.log("STATUS:", response.status);

    const texto = await response.text();

    console.log("RESPOSTA:", texto);

    if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        window.location.href = "index.html";
    } else {
        alert("Erro no cadastro");
    }

} catch (error) {
    console.error("ERRO COMPLETO:", error);
    alert("Erro ao conectar com servidor");
}
});