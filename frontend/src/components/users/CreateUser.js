import React, {useState } from "react";
import Grid from '@mui/material/Grid';
import Title from '../uteis/Title';

export default function CreateUser(){
    
    const[inputs, setInputs] = useState({})
    const handleChange = event =>{
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values =>({...values,[name]:value}));
    }
    const handleSubmit = async(event) =>{
        event.preventDefault();
        let postValues = {'configuracao':{
            'page': 'Usuarios',
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
                alert('Usuário cadastrado com sucesso!');
            } else {
                alert('Erro ao cadastrar usuário, verifique se os dados estão corretos');
            }
            }catch(error){
                alert('Erro ao cadastrar usuário');
            }
    }
    return(
        <React.Fragment>
            <Grid item xs={12} md={4} lg={3}>
                <Title>Cadastrar Usuarios</Title>
            </Grid>
            <Grid item xs={12}>            
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-lg-12">
                            <h3>Criar Usuarios</h3>
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
                            <label>Email:</label>
                        </div>
                        <div className='col-md-5'>
                        <input type="text" name="email" onChange={handleChange}/>
                        </div>
                    </div>

                    <div className ="row">
                        <div className='col-md-5'>
                            <label>Username:</label>
                        </div>
                        <div className='col-md-5'>
                        <input type="text" name="username" onChange={handleChange}/>
                        </div>
                    </div>

                    <div className ="row">
                        <div className='col-md-5'>
                            <label>Senha:</label>
                        </div>
                        <div className='col-md-5'>
                        <input type="password" name="senha" onChange={handleChange}/>
                        </div>
                    </div>
                    <button>Save</button>
                </form>
            </Grid>
        </React.Fragment>
    );
}