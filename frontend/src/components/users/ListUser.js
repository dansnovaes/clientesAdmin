import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Title from '../uteis/Title';
export default function ListUser(){
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            let postValues = {'configuracao':{
                'page': 'Usuarios',
                'method': 'getAll'
            }};
            const response = await fetch('http://localhost:8080/backend/class/index.php',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postValues)
            });
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Erro ao obter os dados:', error);
        }
        };

        fetchData();
    }, []);

    return(
        <React.Fragment>
            <Grid item xs={12} md={4} lg={3}>
                <Title>Listar Usuários</Title>
            </Grid>
            <Grid item xs={12}>
                <div className='col-lg-12'>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                            <th>Nome</th>
                            <th>Nome do Usuario</th>
                            <th>email</th>
                            <th>Data de cadastro</th>
                            <th>acao</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.id}>
                                <td>{item.nome}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.dt_cadastro}</td>
                                <td>
                                    <Link to={`../../user/${item.id}/edit`}>Editar</Link>
                                    <button>Delete</button>
                                </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Grid>
        </React.Fragment>
    );
}