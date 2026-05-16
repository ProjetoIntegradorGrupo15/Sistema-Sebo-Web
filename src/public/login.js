document.getElementById("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    // pega os dados do HTML
    const login = document.getElementById("login").value;
    const senha = document.getElementById("senha").value;

    // DEFINIÇÃO INTELIGENTE DA URL DE LOGIN (Local vs Nuvem)
    const urlLogin = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:3000/usuarios/login'
        : '/usuarios/login';

     try {
        // Substituído o endereço fixo pela variável urlLogin
        const response = await fetch(urlLogin, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ login, senha })
        });

        const data = await response.json();

        // SE LOGIN OK → REDIRECIONA
        if (response.ok) {
            alert("Login realizado com sucesso!");
             // Salva usuário no localStorage (opcional)
            localStorage.setItem("usuario", JSON.stringify(data.usuario));
           window.location.href = "principal.html";
           console.log("Redirecionando")
        } else {
            alert(data.erro || "Login inválido");
        }

    } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao conectar com o servidor");
    }
});
