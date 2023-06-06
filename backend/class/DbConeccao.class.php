<?php
class DbConeccao
{
    private $host = 'mysql_cont';
    private $db_name = 'cliente_admin';
    private $username = 'sys_admin';
    private $password = 'cl1ntee';
    private $conn;

    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO(
                'mysql:host=' . $this->host . ';dbname=' . $this->db_name,
                $this->username,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            echo 'Erro na conexão com o banco de dados: ' . $e->getMessage();
        }

        return $this->conn;
    }
}
