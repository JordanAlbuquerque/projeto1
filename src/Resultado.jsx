import React from 'react';
import { useLocation } from 'react-router-dom';

function Resultado() {
    const { state } = useLocation();
    console.log(state);
    const { nome, idade, endereco, corPreferida } = state || {};
    return (
        <div style={{ padding: '20px', backgroundColor: corPreferida || 'white', color: 'black' }}>
            <h1>Dados do Usuário</h1>
            <p><strong>Nome:</strong> {nome}</p>
            <p><strong>Idade:</strong> {idade} anos</p>
            <p><strong>Endereço:</strong></p>
            <ul>
                <li><strong>Estado:</strong> {endereco.estado}</li>
                <li><strong>Cidade:</strong> {endereco.cidade}</li>
                <li><strong>Bairro:</strong> {endereco.bairro}</li>
                <li><strong>Rua:</strong> {endereco.rua}</li>
            </ul>
            <p><strong>Cor Preferida:</strong> {corPreferida}</p>
        </div>
    );
}

export default Resultado;
