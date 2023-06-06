import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Title from '../uteis/Title';

export default function UpdateEndereco() {
    const { id } = useParams();
    const [endereco, setEndereco] = useState({
        cep: '',
        endereco: '',
        numero: '',
        complemento: '',
        referencia: '',
        bairro: '',
        cidade: '',
        uf: ''
    });

    useEffect(() => {
        const editEndereco = async () =>{
            try {
                let postValues = {'configuracao':{
                    'page': 'Enderecos',
                    'method': 'read'
                    },
                    'id': id
                };
                const response  = await fetch('http://localhost:8080/backend/class/index.php',{
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postValues)
                })
                const getEnderecos = await response.json();
                setEndereco(getEnderecos);
            }
            catch(error){
                console.error(error)
            }
        }
        editEndereco();
    },[id, setEndereco]);

    const handleChange = event =>{
        const name = event.target.name;
        const value = event.target.value;
        setEndereco(values =>({...values,[name]:value}));
    }

    const handleSubmit = async(event) =>{
        event.preventDefault();
        let postValues = {'configuracao':{
            'page': 'Enderecos',
            'method': 'editar'
            },
            'id': id
        };
        postValues =Object.assign(postValues,endereco);
        try{
            const response = await fetch('http://localhost:8080/backend/class/index.php',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'content-type': 'application/json'
                },
                body: JSON.stringify(postValues)
            });
            const data = await response.json();
            if (response.ok && data == 1) {
                alert('Endereço alterado com sucesso!');
            } else {
                alert('Erro ao editar endereço do cliente, verifique se os dados estão corretos');
            }
        }catch(error){
            alert('Erro ao cadastrar endereço do cliente');
        }
    }

  return (
    <React.Fragment>
        <Grid item xs={12} md={4} lg={3}>
            <Title>Editar Emdereço</Title>
        </Grid>
        <Grid item xs={12}>
            <form onSubmit={handleSubmit}> 
            <div className ="row">
                    <div className='col-md-4'>
                        <label>Cep:</label>
                    </div>
                    <div className='col-md-8'>
                    <input type="text" name="cep" value={endereco.cep} onChange={handleChange}/>
                    </div>
                </div>
                <div className ="row">
                    <div className='col-md-4'>
                        <label>Endereço:</label>
                    </div>
                    <div className='col-md-8'>
                    <input type="text" name="endereco" value={endereco.endereco} onChange={handleChange}/>
                    </div>
                </div>

                <div className ="row">
                    <div className='col-md-4'>
                        <label>Número:</label>
                    </div>
                    <div className='col-md-8'>
                    <input type="text" name="numero_endereco" value={endereco.numero_endereco} onChange={handleChange}/>
                    </div>
                </div>

                <div className ="row">
                    <div className='col-md-4'>
                        <label>complemento:</label>
                    </div>
                    <div className='col-md-8'>
                    <input type="text" name="complemento" value={endereco.complemento} onChange={handleChange}/>
                    </div>
                </div>
                <div className ="row">
                    <div className='col-md-4'>
                        <label>Ponto de Referencia:</label>
                    </div>
                    <div className='col-md-8'>
                    <input type="text" name="referencia" value={endereco.referencia} onChange={handleChange}/>
                    </div>
                </div>
                <div className ="row">
                    <div className='col-md-4'>
                        <label>Bairro:</label>
                    </div>
                    <div className='col-md-8'>
                    <input type="text" name="bairro" value={endereco.bairro} onChange={handleChange}/>
                    </div>
                </div>
                <div className ="row">
                    <div className='col-md-4'>
                        <label>Cidade:</label>
                    </div>
                    <div className='col-md-8'>
                    <input type="text" name="cidade" value={endereco.cidade} onChange={handleChange}/>
                    </div>
                </div>
                <div className ="row">
                    <div className='col-md-12'>
                    <label htmlFor="estado">Selecione um estado:</label>
                    <select id="uf" name='uf'value={endereco.uf} onChange={handleChange}>
                        <option value="">Selecione...</option>
                        <option value="AC">Acre</option>
                        <option value="AL">Alagoas</option>
                        <option value="AP">Amapá</option>
                        <option value="AM">Amazonas</option>
                        <option value="BA">Bahia</option>
                        <option value="CE">Ceará</option>
                        <option value="DF">Distrito Federal</option>
                        <option value="ES">Espírito Santo</option>
                        <option value="GO">Goiás</option>
                        <option value="MA">Maranhão</option>
                        <option value="MT">Mato Grosso</option>
                        <option value="MS">Mato Grosso do Sul</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="PA">Pará</option>
                        <option value="PB">Paraíba</option>
                        <option value="PR">Paraná</option>
                        <option value="PE">Pernambuco</option>
                        <option value="PI">Piauí</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="RN">Rio Grande do Norte</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="RO">Rondônia</option>
                        <option value="RR">Roraima</option>
                        <option value="SC">Santa Catarina</option>
                        <option value="SP">São Paulo</option>
                        <option value="SE">Sergipe</option>
                        <option value="TO">Tocantins</option>
                    </select>
                    </div>
                </div>
                <button>Save</button>
            </form>
        </Grid>
    </React.Fragment>
  );
}
