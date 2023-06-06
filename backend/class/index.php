<?php
require_once 'DbConeccao.class.php';
require_once 'Clientes.class.php';
require_once 'Enderecos.class.php';
require_once 'Usuarios.class.php';;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('content-type: application/json');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postData = file_get_contents('php://input');
    $dadosRequest = json_decode($postData,true);
    $configRequisicao = $dadosRequest['configuracao'];
    $requestedClass = $configRequisicao['page'];
    $method = $configRequisicao['method'];
    unset($dadosRequest['configuracao']);
    
    if ($requestedClass !='') {
        handleRequest($requestedClass,$method, $dadosRequest);
    } else {
        $response = array('Erro'=>'Opção não valida');
        echo json_encode($response);
    }
}

function handleRequest($action, $method, $data)
{
    try{
        $database = new DbConeccao();
        $db = $database->getConnection();
        $objetoBanco ='';
        switch($action){
            case 'Usuarios':
                $objetoBanco = new Usuarios($db);
                break;
            case 'Clientes':
                $objetoBanco = new Clientes($db);
                break;
            case 'Enderecos':
                $objetoBanco = new Enderecos($db);
                break;
        }
        $result = call_user_func([$objetoBanco, $method], $data);
        echo json_encode($result);   
    }catch(Exception $erro){
        echo json_encode('Erro na requisição:'. $erro->getMessage());
    }
}

?>