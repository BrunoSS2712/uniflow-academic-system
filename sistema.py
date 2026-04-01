# Sistema Acadêmico UNIFLOW - Backend Flask
import os
import json
from flask import Flask, render_template, request, jsonify
from datetime import datetime

app = Flask(__name__)

# Configuração do arquivo de dados
DATA_FILE = os.path.join(os.path.dirname(__file__), "sistemaacad_data.json")

# Dados em memória
dados = {
    "alunos": [],
    "professores": [],
    "disciplinas": [],
    "calendario": [],
    "documentos": []
}


def carregar_dados():
    """Carrega dados do arquivo JSON"""
    global dados
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, "r", encoding="utf-8") as f:
                dados = json.load(f)
        except:
            pass


def salvar_dados():
    """Salva dados no arquivo JSON"""
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(dados, f, ensure_ascii=False, indent=4)


# Carregar dados ao iniciar
carregar_dados()

# ==================== ROTAS DE PÁGINA ====================


@app.route('/')
def index():
    """Página principal"""
    return render_template('index.html')

# ==================== ROTAS DE ALUNOS ====================


@app.route('/api/alunos', methods=['GET'])
def listar_alunos():
    """Retorna lista de alunos"""
    return jsonify(dados["alunos"])


@app.route('/api/alunos', methods=['POST'])
def criar_aluno():
    """Cria novo aluno"""
    req = request.json
    novo_aluno = {
        "id": len(dados["alunos"]) + 1,
        "nome": req.get('nome'),
        "matricula": req.get('matricula')
    }
    dados["alunos"].append(novo_aluno)
    salvar_dados()
    return jsonify(novo_aluno), 201


@app.route('/api/alunos/<int:aluno_id>', methods=['DELETE'])
def deletar_aluno(aluno_id):
    """Deleta um aluno"""
    dados["alunos"] = [a for a in dados["alunos"] if a.get("id") != aluno_id]
    salvar_dados()
    return '', 204

# ==================== ROTAS DE PROFESSORES ====================


@app.route('/api/professores', methods=['GET'])
def listar_professores():
    """Retorna lista de professores"""
    return jsonify(dados["professores"])


@app.route('/api/professores', methods=['POST'])
def criar_professor():
    """Cria novo professor"""
    req = request.json
    novo_prof = {
        "id": len(dados["professores"]) + 1,
        "nome": req.get('nome'),
        "siape": req.get('siape')
    }
    dados["professores"].append(novo_prof)
    salvar_dados()
    return jsonify(novo_prof), 201


@app.route('/api/professores/<int:prof_id>', methods=['DELETE'])
def deletar_professor(prof_id):
    """Deleta um professor"""
    dados["professores"] = [
        p for p in dados["professores"] if p.get("id") != prof_id]
    salvar_dados()
    return '', 204

# ==================== ROTAS DE DISCIPLINAS ====================


@app.route('/api/disciplinas', methods=['GET'])
def listar_disciplinas():
    """Retorna lista de disciplinas"""
    return jsonify(dados["disciplinas"])


@app.route('/api/disciplinas', methods=['POST'])
def criar_disciplina():
    """Cria nova disciplina"""
    req = request.json
    nova_disc = {
        "id": len(dados["disciplinas"]) + 1,
        "nome": req.get('nome'),
        "codigo": req.get('codigo')
    }
    dados["disciplinas"].append(nova_disc)
    salvar_dados()
    return jsonify(nova_disc), 201


@app.route('/api/disciplinas/<int:disc_id>', methods=['DELETE'])
def deletar_disciplina(disc_id):
    """Deleta uma disciplina"""
    dados["disciplinas"] = [
        d for d in dados["disciplinas"] if d.get("id") != disc_id]
    salvar_dados()
    return '', 204

# ==================== ROTAS DE CALENDÁRIO ====================


@app.route('/api/calendario', methods=['GET'])
def listar_eventos():
    """Retorna lista de eventos"""
    return jsonify(dados["calendario"])


@app.route('/api/calendario', methods=['POST'])
def criar_evento():
    """Cria novo evento"""
    req = request.json
    novo_evento = {
        "id": len(dados["calendario"]) + 1,
        "titulo": req.get('titulo'),
        "data": req.get('data'),
        "descricao": req.get('descricao')
    }
    dados["calendario"].append(novo_evento)
    salvar_dados()
    return jsonify(novo_evento), 201


@app.route('/api/calendario/<int:evento_id>', methods=['DELETE'])
def deletar_evento(evento_id):
    """Deleta um evento"""
    dados["calendario"] = [
        e for e in dados["calendario"] if e.get("id") != evento_id]
    salvar_dados()
    return '', 204

# ==================== ROTAS DE DOCUMENTOS ====================


@app.route('/api/documentos', methods=['GET'])
def listar_documentos():
    """Retorna lista de documentos"""
    return jsonify(dados["documentos"])


@app.route('/api/documentos', methods=['POST'])
def criar_documento():
    """Cria novo documento"""
    req = request.json
    novo_doc = {
        "id": len(dados["documentos"]) + 1,
        "tipo": req.get('tipo'),
        "titulo": req.get('titulo'),
        "descricao": req.get('descricao', ''),
        "caminho": req.get('caminho', '')
    }
    dados["documentos"].append(novo_doc)
    salvar_dados()
    return jsonify(novo_doc), 201


@app.route('/api/documentos/<int:doc_id>', methods=['DELETE'])
def deletar_documento(doc_id):
    """Deleta um documento"""
    dados["documentos"] = [
        d for d in dados["documentos"] if d.get("id") != doc_id]
    salvar_dados()
    return '', 204

# ==================== INICIALIZAÇÃO ====================


if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
