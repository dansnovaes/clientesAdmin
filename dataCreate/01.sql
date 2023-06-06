
DROP TABLE IF EXISTS `clientes`;
CREATE TABLE `clientes` (
  `id` int NOT NULL,
  `nome` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `rg` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `cpf` varchar(14) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `dt_nascimento` date NOT NULL,
  `telefone` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `dt_cadastro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dt_update` datetime DEFAULT CURRENT_TIMESTAMP,
  `ativo` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `enderecos`;
CREATE TABLE `enderecos` (
  `id` int NOT NULL,
  `id_cliente` int NOT NULL,
  `cep` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci  NOT NULL,
  `endereco` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `numero_endereco` varchar(10) NOT NULL,
  `complemento` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `referencia` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `bairro` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `cidade` varchar(40) NOT NULL,
  `uf` varchar(2) NOT NULL,
  `dt_cadastro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dt_update` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ativo` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id` int NOT NULL,
  `nome` varchar(40) NOT NULL,
  `username` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `dt_cadastro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dt_update` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ativo` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `enderecos`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

ALTER TABLE `clientes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;
COMMIT;

ALTER TABLE `usuarios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;
COMMIT;

ALTER TABLE `enderecos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;
COMMIT;
