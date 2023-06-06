<?php

class Clientes
{
    private $conn;
    private $table_name='';

    public function __construct($db) {
        $this->conn = $db;
        $this->table_name = 'clientes';
    }

    public function create($postVariables=array())
    {
        $query = "INSERT INTO " . $this->table_name . "
                  SET 
                    nome = :nome,
                    rg = :rg,
                    cpf = :cpf,
                    dt_nascimento = :dt_nascimento,
                    telefone = :telefone,
                    dt_cadastro = :dt_cadastro,
                    dt_update = :dt_update,
                    ativo = :ativo";

        $stmt = $this->conn->prepare($query);

        $stmt->bindValue(':nome',$postVariables['nome']);
        $stmt->bindValue(':rg', $postVariables['rg']);
        $stmt->bindValue(':cpf', $postVariables['cpf']);
        $stmt->bindValue(':dt_nascimento', $postVariables['dt_nascimento']);
        $stmt->bindValue(':telefone', $postVariables['telefone']);
        $stmt->bindValue(':dt_cadastro', date('Y-m-d H:i:s'));
        $stmt->bindValue(':dt_update', date('Y-m-d H:i:s'));
        $stmt->bindValue(':ativo', 1);
        $this->conn->lastInsertId();
        if ($stmt->execute()) {
            return true;
        }
    }

    public function read($postVariables=array())
    {
        $sql = "SELECT * FROM clientes WHERE id = ? and ativo = 1";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$postVariables['id']]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function editar($postVariables=array())
    {
        $sql = "UPDATE clientes 
                SET nome = ?,
                    rg = ?,
                    cpf = ?,
                    dt_nascimento = ?,
                    telefone = ?,
                    dt_update = ?
                WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([
            $postVariables['nome'], 
            $postVariables['rg'],
            $postVariables['cpf'],
            $postVariables['dt_nascimento'],
            $postVariables['telefone'],
            date('Y-m-d H:i:s'),
            $postVariables['id'],
        ]);
        return $stmt->rowCount();
    }

    public function delete($postVariables=array())
    {
        $sql = "UPDATE clientes 
                SET ativo = 0
                WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$postVariables['$id']]);
        return $stmt->rowCount();
    }

    public function getAll($postVariables=null)
    {
        $sql = "SELECT * FROM clientes";
        $stmt = $this->conn->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
