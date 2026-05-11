document.getElementById("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    // pega os dados do HTML
    const login = document.getElementById("login").value;
    const senha = document.getElementById("senha").value;

     try {
        const response = await fetch("http://localhost:3000/usuarios/login", {
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
           window.location.href = "paginaInerna.html";
           console.log("Redirecionando")
        } else {
            alert(data.erro || "Login inválido");
        }

    } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao conectar com o servidor");
    }
});