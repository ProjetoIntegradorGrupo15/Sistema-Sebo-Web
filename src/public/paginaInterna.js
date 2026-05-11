document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // USUÁRIO LOGADO
    // =========================

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario) {
        window.location.href = "index.html";
        return;
    }

    const bemVindo = document.getElementById("bem-vindo");

    if (bemVindo) {
        bemVindo.innerText = usuario.nome;
    }

    const sairBtn = document.querySelector('a[href="#"]');

    if (sairBtn) {
        sairBtn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("usuario");
            window.location.href = "index.html";
        });
    }


    // =========================
    // CADASTRO DE ACERVO
    // =========================

    const form = document.querySelector(".form");

    if (form) {
        const campos = document.querySelectorAll(".form-content input");

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            let formularioValido = true;

            campos.forEach((campo) => {
                if (campo.type === "radio") return;

                if (campo.value.trim() === "") {
                    setError(campo, "Este campo é obrigatório");
                    formularioValido = false;
                } else {
                    removeError(campo);
                }
            });

            const disponivel = document.querySelector(
                'input[name="disponivel"]:checked'
            );

            if (!disponivel) {
                formularioValido = false;
                alert("Selecione se o livro está disponível.");
            }

            if (formularioValido) {
                alert("Cadastro realizado com sucesso!");
                form.submit();
            }
        });
    }

    function setError(input, message) {
        const formContent = input.parentElement;
        const messageError = formContent.querySelector("a");

        formContent.classList.add("error");

        if (messageError) {
            messageError.innerText = message;
        }
    }

    function removeError(input) {
        const formContent = input.parentElement;
        formContent.classList.remove("error");
    }

});