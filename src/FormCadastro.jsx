import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './FormCadastro.css';

function FormCadastro() {
    const [nome, setNome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState({ estado: '', cidade: '', bairro: '', rua: '' });
    const [corPreferida, setCorPreferida] = useState('');
    const [erro, setErro] = useState('');

    const navigate = useNavigate();

    const validarNome = (nome) => nome.trim().split(' ').length >= 2;

    const calcularIdade = (data) => {
        const hoje = new Date();
        const nascimento = new Date(data);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();
        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) idade--;
        return idade;
    };

    const buscarEndereco = async (cep) => {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            const { uf, localidade, bairro, logradouro } = response.data;
            
            setEndereco({ estado: uf, cidade: localidade, bairro, rua: logradouro });
        } catch {
            setErro('CEP inválido.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validarNome(nome)) {
            setErro('O nome deve conter pelo menos duas palavras.');
            return;
        }
        if (calcularIdade(dataNascimento) < 16) {
            setErro('Você deve ter pelo menos 16 anos.');
            return;
        }
        setErro('');
        const idade = calcularIdade(dataNascimento);

        console.log(corPreferida);

        // Redirecionar para a próxima página com os dados
        navigate('/resultado', { state: { nome, idade, endereco, corPreferida } });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nome Completo:</label>
                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Data de Nascimento:</label>
                <input
                    type="date"
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>CEP:</label>
                <input
                    type="text"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    onBlur={() => buscarEndereco(cep)}
                    required
                />
            </div>
            {endereco.rua && (
                <div>
                    <p>Estado: {endereco.estado}</p>
                    <p>Cidade: {endereco.cidade}</p>
                    <p>Bairro: {endereco.bairro}</p>
                    <p>Rua: {endereco.rua}</p>
                </div>
            )}
            <div className="seletor-de-cores">
                <label>Escolha sua cor preferida:</label>
                <input
                    type="color"
                    value={corPreferida}
                    onChange={(e) => setCorPreferida(e.target.value)}
                    required
                />
            </div>
            {erro && <p style={{ color: 'red' }}>{erro}</p>}
            <button type="submit">Salvar</button>
        </form>
    );
}

export default FormCadastro;