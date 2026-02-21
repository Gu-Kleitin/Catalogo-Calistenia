create database if not exists CatalogoCalistenia;

use CatalogoCalistenia;

create table Exercicio(
id_exercicio int not null,
nome varchar(250),
nivel int,
tipo varchar(50),
habilidade boolean,
grupo_muscular varchar(250),
descricao text,
musculos_alvo text,
url_midia varchar(500),
id_progressao int,
id_regressao int,
PRIMARY KEY (id_exercicio),
CONSTRAINT fk_progressao
    FOREIGN KEY (id_progressao) REFERENCES Exercicio(id_exercicio)
	ON DELETE SET NULL ON UPDATE CASCADE,
CONSTRAINT fk_regressao 
	FOREIGN KEY (id_regressao) REFERENCES Exercicio(id_exercicio)
	ON DELETE SET NULL ON UPDATE CASCADE
);