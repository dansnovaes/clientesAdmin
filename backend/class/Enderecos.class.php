<?php
class Enderecos
{
    private $conn;
    private $table_name='';

    public function __construct($db) {
        $this->conn = $db;
        $this->table_name = 'enderecos';
    }

    public function create($postVariables=array())
    {
        $sql = "INSERT INTO " . $this->table_name . "
            SET 
                id_cliente =:id_cliente,
                cep =:cep,
                endereco = :endereco,
                numero_endereco = :numero_endereco,
                complemento = :complemento,
                referencia = :referencia,
                bairro = :bairro,
                cidade = :cidade,
                uf = :uf,
                dt_cadastro = :dt_cadastro,
                dt_update = :dt_update,
                ativo = :ativo";

        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(':id_cliente' ,$postVariables['id_cliente']);
        $stmt->bindValue(':cep' ,$postVariables['cep']);
        $stmt->bindValue(':endereco' ,$postVariables['endereco']);
        $stmt->bindValue(':numero_endereco' ,$postVariables['numero_endereco']);
        $stmt->bindValue(':complemento' ,$postVariables['complemento']);
        $stmt->bindValue(':referencia' ,$postVariables['referencia']);
        $stmt->bindValue(':bairro' ,$postVariables['bairro']);
        $stmt->bindValue(':cidade' ,$postVariables['cidade']);
        $stmt->bindValue(':uf' ,$postVariables['uf']);
        $stmt->bindValue(':dt_cadastro',date('Y-m-d H:i:s'));
        $stmt->bindValue(':dt_update',date('Y-m-d H:i:s'));
        $stmt->bindValue(':ativo','1');
        $this->conn->lastInsertId();
        if ($stmt->execute()) {
            return true;
        }
    }

    public function read($postVariables)
    {
        try{
            $sql = "SELECT * FROM enderecos WHERE (id = ?)and ativo = 1";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute([$postVariables['id']]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        }catch(Exception $erro){
            return json_encode($erro->getMessage());
        }
    }

    public function enderecoByCliente($postVariables)
    {
        try{
            $sql = "SELECT * FROM enderecos WHERE (id_cliente = ?)and ativo = 1";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute([$postVariables['id_cliente']]);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }catch(Exception $erro){
            return json_encode($erro->getMessage());
        }
    }

    public function editar($postVariables=array())
    {
        $sql = "UPDATE enderecos
                SET cep = ?,
                    endereco = ?,
                    numero_endereco = ?,
                    complemento = ?,
                    referencia = ?,
                    bairro = ?,
                    cidade = ?,
                    uf = ?,
                    dt_update = ?
                WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([
                $postVariables['cep'],
                $postVariables['endereco'],
                $postVariables['numero_endereco'],
                $postVariables['complemento'],
                $postVariables['referencia'],
                $postVariables['bairro'],
                $postVariables['cidade'],
                $postVariables['uf'],
                date('Y-m-d H:i:s'),
                $postVariables['id']]);
        return $stmt->rowCount();
    }

    public function delete($postVariables=array())
    {
        $sql = "UPDATE endereco 
                SET ativo = 0
                WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$postVariables['$id']]);
        return $stmt->rowCount();
    }
}
