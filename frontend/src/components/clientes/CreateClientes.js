import React, {useState } from "react";
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Title from '../uteis/Title';

export default function CreateClientes(){
    const navigate = useNavigate();
    const[inputs, setInputs] = useState({})
    const handleChange = event =>{
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values =>({...values,[name]:value}));
    }
    const handleSubmit = async(event) =>{
        event.preventDefault();
        let postValues = {'configuracao':{
            'page': 'Clientes',
            'method': 'create'
        }};
        postValues =Object.assign(postValues,inputs);
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
                alert('Cliente cadastrado com sucesso!');
                navigate("/clientes/list");
            } else {
                alert('Erro ao cadastrar cliente, verifique se os dados estão corretos');
            }
        }catch(error){
            alert('Erro ao cadastrar cadastrar');
        }
    }
    return(
        <React.Fragment>
            <Grid item xs={12} md={4} lg={3}>
                <Title>Cadastrar Cliente</Title>
            </Grid>
            <Grid item xs={12}>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-lg-12">
                            <h3>Criar Clientes</h3>
                        </div>
                    </div>     
                    <div className ="row">
                        <div className='col-md-5'>
                            <label>Nome:</label>
                        </div>
                        <div className='col-md-5'>
                        <input type="text" name="nome" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className ="row">
                        <div className='col-md-5'>
                            <label>Rg:</label>
                        </div>
                        <div className='col-md-5'>
                        <input type="text" name="rg" onChange={handleChange}/>
                        </div>
                    </div>

                    <div className ="row">
                        <div className='col-md-5'>
                            <label>cpf:</label>
                        </div>
                        <div className='col-md-5'>
                        <input type="text" name="cpf" onChange={handleChange}/>
                        </div>
                    </div>

                    <div className ="row">
                        <div className='col-md-5'>
                            <label>Data de Nascimento:</label>
                        </div>
                        <div className='col-md-5'>
                        <input type="date" name="dt_nascimento" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className ="row">
                        <div className='col-md-5'>
                            <label>Telefone:</label>
                        </div>
                        <div className='col-md-5'>
                        <input type="text" name="telefone" onChange={handleChange}/>
                        </div>
                    </div>
                    <button>Save</button>
                </form>
            </Grid>
        </React.Fragment>
    );
}