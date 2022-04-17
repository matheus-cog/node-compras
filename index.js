var express = require('express');
var path = require('path');
var app = express(); 
var port = 8030; 
var hostname = '127.0.0.1';

app.use('/assets', express.static(path.join(__dirname, '/assets')));

app.get('/', function(req, res) { 
    console.log('IP: ' + req.socket.remoteAddress + ' conectou ao servidor.');
    res.statusCode = 200; 
    res.setHeader('Content-Type', 'text/html; charset=utf-8'); 
    res.sendFile("index.html", { root: __dirname + "/pages/home" });
});
app.get('/produto/preco/:id', function(req, res) { 
    console.log('IP: ' + req.socket.remoteAddress + ' conectou ao servidor.');

    let id = parseFloat(req.params.id);
    let nome;
    let preco;
    let img;

    switch(id){
        case 1:
            nome = 'Nome: Sapato';
            preco = 'R$99,99';
            img = 'http://localhost:8030/assets/img/sapato.png';
            break;
        case 2:
            nome = 'Nome: Bolsa';
            preco = 'R$103,89';
            img = 'http://localhost:8030/assets/img/bolsa.png';
            break;
        case 3:
            nome = 'Nome: Camisa';
            preco = 'R$49,98';
            img = 'http://localhost:8030/assets/img/camisa.png';
            break;
        case 4:
            nome = 'Nome: Calça';
            preco = 'R$89,72';
            img = 'http://localhost:8030/assets/img/calca.png';
            break;
        case 5:
            nome = 'Nome: Blusa';
            preco = 'R$97,35';
            img = 'http://localhost:8030/assets/img/blusa.png';
            break;
        default:
            nome = 'Produto não encontrado.';
            preco = 'Indisponível';
            img = 'http://localhost:8030/assets/img/carrinho_warning.svg';
            break;
    }
    res.statusCode = 200; 
    res.setHeader('Content-Type', 'text/html; charset=utf-8'); 
    res.send(`
        <!doctype html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Projeto 2 - Produto ${req.params.id}</title>
                <link rel="icon" href="http://localhost:8030/assets/img/una.svg">
                <link href="http://localhost:8030/assets/css/bootstrap.min.css" rel="stylesheet">
            </head>
                
            <body>
                <main>
                    <div class="container py-4">
                        <header class="pb-3 mb-3 border-bottom">
                            <a class="d-flex align-items-center text-dark text-decoration-none">
                                <img src="http://localhost:8030/assets/img/una.svg" width="70" height="62">
                                <div style="width: 2%"></div>
                                <span class="fs-4">Informações do produto</span> 
                            </a>
                        </header>
                
                        <div class="p-5 mb-3 bg-light rounded-3">
                            <div class="container-fluid py-3">
                                <h1 class="display-5 fw-bold">Código: ${req.params.id}</h1>
                                <p class="col-md-8 fs-2">${nome}</p>
                            </div>
                        </div>
                
                        <div class="row align-items-md-stretch">
                            <div class="col-md-6">
                                <div class="h-100 p-5 text-white bg-dark rounded-3" style="display: flex; align-items: center; justify-content: center">
                                    <h1 class="display-1 fw-bold text-white">${preco}</h2>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="h-100 p-5 bg-light border rounded-1">
                                    <img src="${img}" class="h-100 rounded mx-auto d-block" width="55%">
                                </div>
                            </div>
                        </div>
                
                        <footer class="pt-3 mt-4 text-muted border-top">
                        &copy; 2022
                        </footer>
                    </div>
                </main>    
            </body>
        </html>
    `);
});
app.get('*', function(req, res){
    console.log('IP: ' + req.socket.remoteAddress + ' conectou ao servidor.');
    res.status(404).sendFile("index.html", { root: __dirname + "/pages/404" });
});
app.listen(port, hostname, function() { 
    console.log(`\nO servidor foi iniciado no host ${hostname} e porta ${port}\n`); 
});