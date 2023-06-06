import React, { useState, useEffect } from 'react';
import { useParams,useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Title from '../uteis/Title';

export default function UpdateCliente() {
    const { id } = useParams();
    let { state } = useLocation();

    const [cliente, setCliente] = useState({
        nome: '',
        rg: '',
        cpf: '',
        dt_nascimento: '',
        telefone: ''
    });

    useEffect(() => {
        const editCliente = async () =>{
            try {
                let postValues = {'configuracao':{
                    'page': 'Clientes',
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
                const getClientes = await response.json();
                setCliente(getClientes);
            }
            catch(error){
                console.error(error)
            }
        }
        editCliente();
    },[id, setCliente]);

    const handleChange = event =>{
        const name = event.target.name;
        const value = event.target.value;
        setCliente(values =>({...values,[name]:value}));
    }

    const handleSubmit = async(event) =>{
        event.preventDefault();
        let postValues = {'configuracao':{
            'page': 'Clientes',
            'method': 'editar'
            },
            'id': id
        };
        postValues =Object.assign(postValues,cliente);
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
                alert('Cliente alterado com sucesso!');
            } else {
                alert('Erro ao editar Cliente, verifique se os dados estão corretos');
            }
        }catch(error){
            alert('Erro ao cadastrar Cliente');
        }
    }

  return (
    <React.Fragment>
        <Grid item xs={12} md={4} lg={3}>
            <Title>Alterar Cadastro do Clientes {state.name}</Title>
        </Grid>
        <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
                <div className ="row">
                    <div className='col-md-5'>
                        <label>Nome:</label>
                    </div>
                    <div className='col-md-5'>
                    <input type="text" name="nome" value={cliente.nome} onChange={handleChange}/>
                    </div>
                </div>
                <div className ="row">
                    <div className='col-md-5'>
                        <label>Rg:</label>
                    </div>
                    <div className='col-md-5'>
                    <input type="text" name="rg" value={cliente.rg} onChange={handleChange}/>
                    </div>
                </div>

                <div className ="row">
                    <div className='col-md-5'>
                        <label>CPF:</label>
                    </div>
                    <div className='col-md-5'>
                    <input type="text" name="cpf" value={cliente.cpf} onChange={handleChange}/>
                    </div>
                </div>

                <div className ="row">
                    <div className='col-md-5'>
                        <label>Data de Nascimento:</label>
                    </div>
                    <div className='col-md-5'>
                    <input type="date" name="dt_nascimento" value={cliente.dt_nascimento} onChange={handleChange}/>
                    </div>
                </div>
                <div className ="row">
                    <div className='col-md-5'>
                        <label>Telefone:</label>
                    </div>
                    <div className='col-md-5'>
                    <input type="text" name="telefone" value={cliente.telefone} onChange={handleChange}/>
                    </div>
                </div>
                <button>Save</button>
            </form>
        </Grid>
    </React.Fragment>
  );
}
