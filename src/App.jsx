import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormCadastro from './FormCadastro';
import Resultado from './Resultado';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<FormCadastro />} />
                <Route path="/resultado" element={<Resultado />} />
            </Routes>
        </Router>
    );
}

export default App;
