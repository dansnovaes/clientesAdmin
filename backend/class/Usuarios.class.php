<?php
class Usuarios 
{
    private $conn;
    private $table_name='';

    public function __construct($db) {
        $this->conn = $db;
        $this->table_name = 'usuarios';
    }

    public function create($postVariables=array())
    {

        $senha = password_hash($postVariables['senha'], PASSWORD_BCRYPT);
        $query = "INSERT INTO " . $this->table_name . "
                  SET 
                    nome = :nome,
                    email = :email,
                    username = :username,
                    senha = :senha,
                    dt_cadastro = :dt_cadastro,
                    dt_update = :dt_update,
                    ativo = :ativo";

        $stmt = $this->conn->prepare($query);

        $stmt->bindValue(':nome',$postVariables['nome']);
        $stmt->bindValue(':email', $postVariables['email']);
        $stmt->bindValue(':username', $postVariables['username']);
        $stmt->bindValue(':senha', $senha);
        $stmt->bindValue(':dt_cadastro', date('Y-m-d H:i:s'));
        $stmt->bindValue(':dt_update', date('Y-m-d H:i:s'));
        $stmt->bindValue(':ativo', 1);

        if ($stmt->execute()) {
            return true;
        }
    }

    public function read($postVariables=array())
    {
        $sql = "SELECT * FROM usuarios WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$postVariables['id']]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getNomeUsuario($postVariables=array())
    {
        $sql = "SELECT nome FROM".$this->table_name." WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$postVariables['id']]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function editar($postVariables=array())
    {
        $sql = "UPDATE usuarios SET
            nome = ?,
            username = ?,
            email = ?
            WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([
            $postVariables['nome'],
            $postVariables['username'],
            $postVariables['email'],
            $postVariables['id']
        ]);
        return $stmt->rowCount();
    }

    public function delete($postVariables=array())
    {
        $sql = "DELETE FROM usuarios WHERE id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$postVariables['$id']]);
        return $stmt->rowCount();
    }

    public function getAll($postVariables =null)
    {
        $sql = "SELECT * FROM usuarios";
        $stmt = $this->conn->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function verificarSenha($postVariables=array())
    {
        $sql = "SELECT senha FROM usuarios WHERE username = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$postVariables['username']]);
        $resultado = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($resultado && isset($resultado['senha'])) {
            return password_verify($postVariables['senha'], $resultado['senha']);
        }
        return true;
    }
}
