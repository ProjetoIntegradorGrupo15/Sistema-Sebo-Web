document.addEventListener("DOMContentLoaded", () => {
    const listaLivros = document.getElementById("lista-livros");
    const searchInput = document.getElementById("search");
    const formBusca = document.getElementById("form");
    const msgNenhumResultado = document.getElementById("nenhum-resultado");
    const API_URL = "http://localhost:3000/livros";    
   
    let livrosOriginais = [];
   
    const carregarLivros = async () => {
        try {
            const resposta = await fetch(API_URL);
            livrosOriginais = await resposta.json();

            if (!resposta.ok) {
                throw new Error("Erro ao obter a lista de livros do banco.");
            }
            renderizarLivros(livrosOriginais);

        } catch (erro) {
            console.error("Erro na comunicação:", erro);
            listaLivros.innerHTML = "<p style='color: red; grid-column: 1/-1; text-align: center;'>Erro ao conectar com o servidor.</p>";
        }
    }; 

    const renderizarLivros = (dados) => {
        listaLivros.innerHTML = "";

        if (dados.length === 0) {
            msgNenhumResultado.style.display = "block";
            return;
        }
        msgNenhumResultado.style.display = "none";

        dados.forEach(livro => {
            const article = document.createElement("article");
            article.className = "livro-card";
       
            const img = document.createElement("img");
            img.alt = livro.titulo;

            img.src = `imagens/${livro.id}.jpg`; 

            img.onerror = () => {
                img.src = "imagens/logo.png";
            };

            article.innerHTML = `
                <h3 class="titulo">${livro.titulo}</h3>
                <p class="autor"><strong>Autor:</strong> ${livro.autor}</p>
                <p class="desc"><strong>Editora:</strong> ${livro.editora} (${livro.ano}) | <strong>Preço:</strong> ${livro.preco}</p>
                <div style="margin-top: 15px; display: flex; gap: 10px; justify-content: center;">
                    <button type="button" class="btn-detalhes" data-info="Categoria: ${livro.categoria} | Edição: ${livro.edicao} | Disponível: ${livro.disponivel}">Ver Detalhes</button>
                </div>
            `;           

            article.prepend(img);
            listaLivros.appendChild(article);
        });

        vincularEventosCards();
    };   
    const vincularEventosCards = () => {
        const botoesDetalhes = document.querySelectorAll(".btn-detalhes");
        botoesDetalhes.forEach(botao => {
            botao.addEventListener("click", (e) => {
                const info = e.target.getAttribute("data-info");
                alert(info);
            });
        });
    };
    const executarFiltro = () => {
        const valorBusca = searchInput.value.toLowerCase().trim();

        const livrosFiltrados = livrosOriginais.filter(livro => 
            livro.titulo.toLowerCase().includes(valorBusca) || 
            livro.autor.toLowerCase().includes(valorBusca)
        );

        renderizarLivros(livrosFiltrados);
    };
  
    formBusca.addEventListener("submit", (e) => {
        e.preventDefault();
        executarFiltro();
    });
   
    carregarLivros();
});

function logout() {
    localStorage.removeItem("logado");
}