import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

function CadastroCategoria() {
  const [categorias, setCategorias] = useState([]);

  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '',
  };

  const [values, setValues] = useState(valoresIniciais);

  function setValue(chave, valor) {
    setValues({
      ...values,
      [chave]: valor,
    });
  }

  function handleChange(e) {
    const { getAttribute, value } = e.target;
    setValue(e.target.getAttribute('name'), value);
  }

  useEffect(() => {
    const URL = 'http://localhost:8080/categorias';

    fetch(URL).then(async (res) => {
      const data = await res.json();
      setCategorias([...data]);
    });
  }, []);

  return (
    <PageDefault>
      <h1>Cadastro de Categoria</h1>

      <form
        onSubmit={function handleSubmit(e) {
          e.preventDefault();
          setCategorias([...categorias, values]);

          setValues(valoresIniciais);
        }}
      >
        <FormField
          label="Nome"
          type="text"
          name="nome"
          value={values.nome}
          onChange={handleChange}
        />

        <FormField
          label="Descrição"
          type="textarea"
          name="descricao"
          value={values.descricao}
          onChange={handleChange}
        />

        <FormField
          label="Cor"
          type="color"
          name="cor"
          value={values.cor}
          onChange={handleChange}
        />

        <Button>Cadastrar</Button>
      </form>

      {categorias.length === 0 && <div>Carregando...</div>}

      <ul>
        {categorias.map((categoria, index) => (
          <li key={`${categoria.nome}${index}`}>{categoria.titulo}</li>
        ))}
      </ul>

      <Link to="/">Ir para home</Link>
    </PageDefault>
  );
}

export default CadastroCategoria;
