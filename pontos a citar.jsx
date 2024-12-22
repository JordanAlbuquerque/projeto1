
//antigo seletor

<div>
                <label>Cor Preferida:</label>
                <select value={corPreferida} onChange={(e) => setCorPreferida(e.target.value)}>
                    <option value="">Selecione...</option>
                    <option value="#ff3333">Vermelho</option>
                    <option value="green">Verde</option>
                    <option value="yellow">Amarelo</option>
                    <option value="#0000FF">Azul</option>
                </select>
            </div>


//tentativa de converter o nome das cores em hex para nome :

const hexToColorName = (hex) => {
    const colors = {
        "#ff3333": "Vermelho",
        "#008000": "Verde",
        "#ffff00": "Amarelo",
        "#0000ff": "Azul",
    };
    return colors[hex.toLowerCase()] || hex;



    <p><strong>Cor Preferida:</strong> {hexToColorName(corPreferida)}</p>