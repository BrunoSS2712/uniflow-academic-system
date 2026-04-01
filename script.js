// ==================== FUNÇÕES DE NAVEGAÇÃO ====================

function mostrarAba(abaId) {
    // Esconder todas as abas
    const abas = document.querySelectorAll('.tab-content');
    abas.forEach(aba => aba.classList.remove('active'));

    // Remover classe active de todos os botões
    const botoes = document.querySelectorAll('.tab-btn');
    botoes.forEach(btn => btn.classList.remove('active'));

    // Mostrar aba selecionada
    document.getElementById(abaId).classList.add('active');

    // Adicionar classe active ao botão clicado
    event.target.classList.add('active');

    // Carregar dados da seção
    carregarDados(abaId);
}

// ==================== FUNÇÕES DE CARREGAMENTO ====================

async function carregarDados(secao) {
    try {
        switch(secao) {
            case 'alunos':
                carregarAlunos();
                break;
            case 'professores':
                carregarProfessores();
                break;
            case 'disciplinas':
                carregarDisciplinas();
                break;
            case 'calendario':
                carregarEventos();
                break;
            case 'documentos':
                carregarDocumentos();
                break;
        }
    } catch (erro) {
        console.error('Erro ao carregar dados:', erro);
    }
}

// ==================== ALUNOS ====================

async function carregarAlunos() {
    try {
        const response = await fetch('/api/alunos');
        const alunos = await response.json();
        
        const listaDiv = document.getElementById('lista-alunos');
        
        if (alunos.length === 0) {
            listaDiv.innerHTML = '<p class="empty-message">Nenhum aluno cadastrado.</p>';
            return;
        }

        listaDiv.innerHTML = alunos.map(aluno => `
            <div class="list-item">
                <div class="list-item-content">
                    <h4>${aluno.nome}</h4>
                    <p><strong>Matrícula:</strong> ${aluno.matricula}</p>
                </div>
                <div class="list-item-actions">
                    <button class="btn btn-danger" onclick="deletarAluno(${aluno.id})">Deletar</button>
                </div>
            </div>
        `).join('');
    } catch (erro) {
        console.error('Erro ao carregar alunos:', erro);
        document.getElementById('lista-alunos').innerHTML = '<p class="empty-message">Erro ao carregar alunos.</p>';
    }
}

async function adicionarAluno(event) {
    event.preventDefault();
    
    const nome = document.getElementById('aluno-nome').value;
    const matricula = document.getElementById('aluno-matricula').value;

    try {
        const response = await fetch('/api/alunos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, matricula })
        });

        if (response.ok) {
            document.getElementById('form-aluno').reset();
            carregarAlunos();
            alert('Aluno cadastrado com sucesso!');
        }
    } catch (erro) {
        console.error('Erro ao adicionar aluno:', erro);
        alert('Erro ao adicionar aluno.');
    }
}

async function deletarAluno(alunoId) {
    if (!confirm('Tem certeza que deseja deletar este aluno?')) return;

    try {
        const response = await fetch(`/api/alunos/${alunoId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            carregarAlunos();
            alert('Aluno deletado com sucesso!');
        }
    } catch (erro) {
        console.error('Erro ao deletar aluno:', erro);
        alert('Erro ao deletar aluno.');
    }
}

// ==================== PROFESSORES ====================

async function carregarProfessores() {
    try {
        const response = await fetch('/api/professores');
        const professores = await response.json();
        
        const listaDiv = document.getElementById('lista-professores');
        
        if (professores.length === 0) {
            listaDiv.innerHTML = '<p class="empty-message">Nenhum professor cadastrado.</p>';
            return;
        }

        listaDiv.innerHTML = professores.map(prof => `
            <div class="list-item">
                <div class="list-item-content">
                    <h4>${prof.nome}</h4>
                    <p><strong>SIAPE:</strong> ${prof.siape}</p>
                </div>
                <div class="list-item-actions">
                    <button class="btn btn-danger" onclick="deletarProfessor(${prof.id})">Deletar</button>
                </div>
            </div>
        `).join('');
    } catch (erro) {
        console.error('Erro ao carregar professores:', erro);
        document.getElementById('lista-professores').innerHTML = '<p class="empty-message">Erro ao carregar professores.</p>';
    }
}

async function adicionarProfessor(event) {
    event.preventDefault();
    
    const nome = document.getElementById('prof-nome').value;
    const siape = document.getElementById('prof-siape').value;

    try {
        const response = await fetch('/api/professores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, siape })
        });

        if (response.ok) {
            document.getElementById('form-professor').reset();
            carregarProfessores();
            alert('Professor cadastrado com sucesso!');
        }
    } catch (erro) {
        console.error('Erro ao adicionar professor:', erro);
        alert('Erro ao adicionar professor.');
    }
}

async function deletarProfessor(profId) {
    if (!confirm('Tem certeza que deseja deletar este professor?')) return;

    try {
        const response = await fetch(`/api/professores/${profId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            carregarProfessores();
            alert('Professor deletado com sucesso!');
        }
    } catch (erro) {
        console.error('Erro ao deletar professor:', erro);
        alert('Erro ao deletar professor.');
    }
}

// ==================== DISCIPLINAS ====================

async function carregarDisciplinas() {
    try {
        const response = await fetch('/api/disciplinas');
        const disciplinas = await response.json();
        
        const listaDiv = document.getElementById('lista-disciplinas');
        
        if (disciplinas.length === 0) {
            listaDiv.innerHTML = '<p class="empty-message">Nenhuma disciplina cadastrada.</p>';
            return;
        }

        listaDiv.innerHTML = disciplinas.map(disc => `
            <div class="list-item">
                <div class="list-item-content">
                    <h4>${disc.nome}</h4>
                    <p><strong>Código:</strong> ${disc.codigo}</p>
                </div>
                <div class="list-item-actions">
                    <button class="btn btn-danger" onclick="deletarDisciplina(${disc.id})">Deletar</button>
                </div>
            </div>
        `).join('');
    } catch (erro) {
        console.error('Erro ao carregar disciplinas:', erro);
        document.getElementById('lista-disciplinas').innerHTML = '<p class="empty-message">Erro ao carregar disciplinas.</p>';
    }
}

async function adicionarDisciplina(event) {
    event.preventDefault();
    
    const nome = document.getElementById('disc-nome').value;
    const codigo = document.getElementById('disc-codigo').value;

    try {
        const response = await fetch('/api/disciplinas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, codigo })
        });

        if (response.ok) {
            document.getElementById('form-disciplina').reset();
            carregarDisciplinas();
            alert('Disciplina cadastrada com sucesso!');
        }
    } catch (erro) {
        console.error('Erro ao adicionar disciplina:', erro);
        alert('Erro ao adicionar disciplina.');
    }
}

async function deletarDisciplina(discId) {
    if (!confirm('Tem certeza que deseja deletar esta disciplina?')) return;

    try {
        const response = await fetch(`/api/disciplinas/${discId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            carregarDisciplinas();
            alert('Disciplina deletada com sucesso!');
        }
    } catch (erro) {
        console.error('Erro ao deletar disciplina:', erro);
        alert('Erro ao deletar disciplina.');
    }
}

// ==================== CALENDÁRIO ====================

async function carregarEventos() {
    try {
        const response = await fetch('/api/calendario');
        const eventos = await response.json();
        
        const listaDiv = document.getElementById('lista-eventos');
        
        if (eventos.length === 0) {
            listaDiv.innerHTML = '<p class="empty-message">Nenhum evento cadastrado.</p>';
            return;
        }

        // Ordenar eventos por data
        eventos.sort((a, b) => new Date(a.data) - new Date(b.data));

        listaDiv.innerHTML = eventos.map(evento => {
            const data = new Date(evento.data).toLocaleDateString('pt-BR');
            return `
                <div class="list-item">
                    <div class="list-item-content">
                        <h4>${evento.titulo}</h4>
                        <p><strong>Data:</strong> ${data}</p>
                        <p><strong>Descrição:</strong> ${evento.descricao}</p>
                    </div>
                    <div class="list-item-actions">
                        <button class="btn btn-danger" onclick="deletarEvento(${evento.id})">Deletar</button>
                    </div>
                </div>
            `;
        }).join('');
    } catch (erro) {
        console.error('Erro ao carregar eventos:', erro);
        document.getElementById('lista-eventos').innerHTML = '<p class="empty-message">Erro ao carregar eventos.</p>';
    }
}

async function adicionarEvento(event) {
    event.preventDefault();
    
    const titulo = document.getElementById('evento-titulo').value;
    const data = document.getElementById('evento-data').value;
    const descricao = document.getElementById('evento-descricao').value;

    try {
        const response = await fetch('/api/calendario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ titulo, data, descricao })
        });

        if (response.ok) {
            document.getElementById('form-evento').reset();
            carregarEventos();
            alert('Evento cadastrado com sucesso!');
        }
    } catch (erro) {
        console.error('Erro ao adicionar evento:', erro);
        alert('Erro ao adicionar evento.');
    }
}

async function deletarEvento(eventoId) {
    if (!confirm('Tem certeza que deseja deletar este evento?')) return;

    try {
        const response = await fetch(`/api/calendario/${eventoId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            carregarEventos();
            alert('Evento deletado com sucesso!');
        }
    } catch (erro) {
        console.error('Erro ao deletar evento:', erro);
        alert('Erro ao deletar evento.');
    }
}

// ==================== DOCUMENTOS ====================

async function carregarDocumentos() {
    try {
        const response = await fetch('/api/documentos');
        const documentos = await response.json();
        
        const listaDiv = document.getElementById('lista-documentos');
        
        if (documentos.length === 0) {
            listaDiv.innerHTML = '<p class="empty-message">Nenhum documento cadastrado.</p>';
            return;
        }

        listaDiv.innerHTML = documentos.map(doc => `
            <div class="list-item">
                <div class="list-item-content">
                    <h4>[${doc.tipo}] ${doc.titulo}</h4>
                    ${doc.descricao ? `<p><strong>Descrição:</strong> ${doc.descricao}</p>` : ''}
                    ${doc.caminho ? `<p><strong>Caminho:</strong> ${doc.caminho}</p>` : ''}
                </div>
                <div class="list-item-actions">
                    <button class="btn btn-danger" onclick="deletarDocumento(${doc.id})">Deletar</button>
                </div>
            </div>
        `).join('');
    } catch (erro) {
        console.error('Erro ao carregar documentos:', erro);
        document.getElementById('lista-documentos').innerHTML = '<p class="empty-message">Erro ao carregar documentos.</p>';
    }
}

async function adicionarDocumento(event) {
    event.preventDefault();
    
    const tipo = document.getElementById('doc-tipo').value;
    const titulo = document.getElementById('doc-titulo').value;
    const descricao = document.getElementById('doc-descricao').value;
    const caminho = document.getElementById('doc-caminho').value;

    try {
        const response = await fetch('/api/documentos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tipo, titulo, descricao, caminho })
        });

        if (response.ok) {
            document.getElementById('form-documento').reset();
            carregarDocumentos();
            alert('Documento cadastrado com sucesso!');
        }
    } catch (erro) {
        console.error('Erro ao adicionar documento:', erro);
        alert('Erro ao adicionar documento.');
    }
}

async function deletarDocumento(docId) {
    if (!confirm('Tem certeza que deseja deletar este documento?')) return;

    try {
        const response = await fetch(`/api/documentos/${docId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            carregarDocumentos();
            alert('Documento deletado com sucesso!');
        }
    } catch (erro) {
        console.error('Erro ao deletar documento:', erro);
        alert('Erro ao deletar documento.');
    }
}

// ==================== INICIALIZAÇÃO ====================

// Carregar alunos ao iniciar a página
window.addEventListener('DOMContentLoaded', function() {
    carregarAlunos();
});
