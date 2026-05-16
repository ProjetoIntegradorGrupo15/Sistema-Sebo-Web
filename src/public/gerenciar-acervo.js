document.addEventListener("DOMContentLoaded", () => {
    const tabelaLivros = document.getElementById("tabela-livros");
    const API_URL = "http://localhost:3000/livros";    
   
  
    const carregarLivrosGerenciamento = async () => {
        try {
            const resposta = await fetch(API_URL);
            const livros = await resposta.json();

            if (!resposta.ok) {
                throw new Error("Erro ao obter a lista de livros do banco.");
            }
            renderizarTabela(livros);

        } catch (erro) {
            console.error("Erro na comunicação:", erro);
            tabelaLivros.innerHTML = "<tr><td colspan='3' style='color: red; text-align: center;'>Erro ao conectar com o servidor.</td></tr>";
        }
    }; 
    // TABELA DE GERENCIAMENTO
    const renderizarTabela = (dados) => {
        tabelaLivros.innerHTML = "";

        if (dados.length === 0) {
            tabelaLivros.innerHTML = "<tr><td colspan='3' style='text-align: center;'>Nenhum livro cadastrado.</td></tr>";
            return;
        }

        dados.forEach(livro => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td><strong>${livro.titulo}</strong><br><small>Editora: ${livro.editora} (${livro.ano})</small></td>
                <td>${livro.autor}</td>
                <td>
                    <button type="button" class="btn-acao btn-excluir" style="background-color: #dc3545; color: white;" data-id="${livro.id}">Excluir</button>
                </td>
            `;

            tabelaLivros.appendChild(tr);
        });

        vincularEventosGerenciamento();
    };
   
    // VINCULA A AÇÃO DE CLIQUE APENAS AO BOTÃO EXCLUIR
    const vincularEventosGerenciamento = () => {
        const botoesExcluir = document.querySelectorAll(".btn-excluir");
        botoesExcluir.forEach(botao => {
            botao.addEventListener("click", async (e) => {
                const id = e.target.getAttribute("data-id");

                if (confirm("Tem certeza que deseja remover este livro do acervo definitivamente?")) {
                    try {
                        const resposta = await fetch(`${API_URL}/${id}`, {
                            method: "DELETE"
                        });

                        if (resposta.ok) {
                            alert("Livro excluído com sucesso!");
                            carregarLivrosGerenciamento(); // Recarrega a tabela atualizada
                        } else {
                            const resultado = await resposta.json();
                            alert("Erro ao excluir livro: " + resultado.error);
                        }
                    } catch (erro) {
                        console.error("Erro na requisição DELETE:", erro);
                        alert("Não foi possível estabelecer contato com o servidor.");
                    }
                }
            });
        });
    };

    carregarLivrosGerenciamento();
});

function logout() {
    localStorage.removeItem("logado");
}
