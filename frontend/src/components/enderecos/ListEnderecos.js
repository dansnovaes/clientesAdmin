import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Title from '../uteis/Title';
export default function ListEnderecos(){
    const { id_cliente } = useParams();
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
        try {
            let postValues = {'configuracao':{
                'page': 'Enderecos',
                'method': 'enderecoByCliente'
            },
            'id_cliente': id_cliente};
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
    }, [id_cliente]);
    console.log(data)
    return(
        <React.Fragment>
            <Grid item xs={12} md={4} lg={3}>
                <Title>Listar Endereço</Title>
            </Grid>
            <Grid item xs={12}>
            
                <div className="row">
                   
                        <div className='col-lg-6'>
                            <Link to={`../../enderecos/${id_cliente}/create`}>Cadastrar Enedereço</Link>
                        </div>
                 
                </div>
                <div className='col-lg-12'>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                            <th>Endereco</th>
                            <th>Data de cadastro</th>
                            <th>Acao</th>
                            </tr>
                        </thead>
                        <tbody>
                            { data.map((item) => (
                                <tr key={item.id}>
                                <td>
                                    {item.endereco} - 
                                    {item.numero_endereco},
                                    Cep: {item.cep}<br/>
                                    {item.complemento}, 
                                    {item.referencia}, 
                                     Bairro: {item.bairro}, 
                                    Cidade: {item.cidade}
                                    {item.uf}
                                </td>
                                <td>
                                    {item.dt_cadastro}
                                </td>
                                <td>
                                    <Link to={`../../enderecos/${item.id}/edit`}>Editar</Link>
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
