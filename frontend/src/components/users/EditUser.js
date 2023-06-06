import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Title from '../uteis/Title';

export default function UpdateUser() {
    const { id } = useParams();
    const [user, setUser] = useState({
        nome: '',
        username: '',
        email: '',
        senha: ''
    });

    useEffect(() => {
        const editUser = async () =>{
            try {
                let postValues = {'configuracao':{
                    'page': 'Usuarios',
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
                const getUsers = await response.json();
                setUser(getUsers);
            }
            catch(error){
                console.error(error)
            }
        }
        editUser();
    },[id, setUser]);

    const handleChange = event =>{
        const name = event.target.name;
        const value = event.target.value;
        setUser(values =>({...values,[name]:value}));
    }

    const handleSubmit = async(event) =>{
        event.preventDefault();
        let postValues = {'configuracao':{
            'page': 'Usuarios',
            'method': 'editar'
            },
            'id': id
        };
        postValues =Object.assign(postValues,user);
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
            alert('Usuário alterado com sucesso!');
        } else {
            alert('Erro ao editar usuario, verifique se os dados estão corretos');
        }
        }catch(error){
            alert('Erro ao cadastrar usuario');
        }
    }

  return (
    <React.Fragment>
        <Grid item xs={12} md={4} lg={3}>
            <Title>Editar Usuarios</Title>
        </Grid>
        <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
                <div className ="row">
                    <div className='col-md-5'>
                        <label>Nome:</label>
                    </div>
                    <div className='col-md-5'>
                    <input type="text" name="nome" value={user.nome} onChange={handleChange}/>
                    </div>
                </div>
                <div className ="row">
                    <div className='col-md-5'>
                        <label>Email:</label>
                    </div>
                    <div className='col-md-5'>
                    <input type="text" name="email" value={user.email} onChange={handleChange}/>
                    </div>
                </div>

                <div className ="row">
                    <div className='col-md-5'>
                        <label>Username:</label>
                    </div>
                    <div className='col-md-5'>
                    <input type="text" name="username" value={user.username} onChange={handleChange}/>
                    </div>
                </div>

                <div className ="row">
                    <div className='col-md-5'>
                        <label>Senha:</label>
                    </div>
                    <div className='col-md-5'>
                    <input type="password" name="senha" value={user.senha} onChange={handleChange}/>
                    </div>
                </div>
                <button>Save</button>
            </form>
        </Grid>
    </React.Fragment>
  );
}
