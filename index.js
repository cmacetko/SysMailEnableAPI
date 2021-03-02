var express = require("express");
var bodyParser = require("body-parser");
var basicAuth = require('express-basic-auth')
var MailEnableCtrl = require('ctrlMailEnable');

const SimpleNodeLogger = require('simple-node-logger'),
opts = {
    logDirectory: __dirname + '/logs/',
    fileNamePattern: 'logs-<DATE>.txt',
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
},  
log = SimpleNodeLogger.createRollingFileLogger(opts);

var cfg_porta = 9092;
var cfg_usuarios = { 'AAA': 'BBB', 'CCC': 'DDD' };

const sendRes = function(callback, IsSucesso, data){

	if( IsSucesso == true )
	{
		
		var response = {
        httpcode: 200,
		body: data
		};
		
	}else{
		
		var response = {
        httpcode: 500,
		body: data
		};
		
	}
    
	callback.json(response);

};

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(function(req, res, next){

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Credentials", true);

    next();

});

app.use(basicAuth({
    users: cfg_usuarios
}))

app.get("/", function(req, res){

    sendRes(res, false, {"Msg": "Utilize um dos metodos disponiveis"});
    
});

app.post("/contas_listar", function(req, res){

    log.info("-------------------------------------");
    log.info("Funcao: contas_listar");
    log.info("Usuario: " + req.auth.user);
    log.info(req.body);

    console.log("-------------------------------------");
    console.log("Funcao: contas_listar");
    console.log("Usuario: " + req.auth.user);

    MailEnableCtrl.init().then(function(){

        MailEnableCtrl.contas_listar().then(function(DadRet){
    
            console.log(JSON.stringify(DadRet));

            log.info(">>> SUCESSO <<<")
            log.info(JSON.stringify(DadRet))

            sendRes(res, true, DadRet);
        
        }).catch(function(err){
    
            log.warn(err.message);
    
		    sendRes(res, false, {"Msg": err.message});
    
        });
    
    }).catch(function(err){
    
        log.warn(err.message);
    
		sendRes(res, false, {"Msg": err.message});
    
    });

});

app.post("/contas_is", function(req, res){

    log.info("-------------------------------------");
    log.info("Funcao: contas_is");
    log.info("Usuario: " + req.auth.user);
    log.info(req.body);

    console.log("-------------------------------------");
    console.log("Funcao: contas_is");
    console.log("Usuario: " + req.auth.user);

    if( req.body.Conta != "" ) 
	{

        MailEnableCtrl.init().then(function(){

            MailEnableCtrl.contas_is(req.body.Conta).then(function(DadRet){
			
				console.log(JSON.stringify(DadRet));

				log.info(">>> SUCESSO <<<")
				log.info(JSON.stringify(DadRet))

				sendRes(res, true, DadRet);
            
            }).catch(function(err){
        
                log.warn(err.message);
        
                sendRes(res, false, {"Msg": err.message});
        
            });
        
        }).catch(function(err){
        
            log.warn(err.message);
        
            sendRes(res, false, {"Msg": err.message});
        
        });

    }else{

        log.warn("Existem campos nao preenchidos");

        sendRes(res, false, {"Msg": "Existem campos nao preenchidos"});
        
    }

});

app.post("/contas_status", function(req, res){

    log.info("-------------------------------------");
    log.info("Funcao: contas_status");
    log.info("Usuario: " + req.auth.user);
    log.info(req.body);

    console.log("-------------------------------------");
    console.log("Funcao: contas_status");
    console.log("Usuario: " + req.auth.user);

    if( req.body.Conta != "" ) 
	{

        MailEnableCtrl.init().then(function(){

            MailEnableCtrl.contas_status(req.body.Conta, req.body.Status).then(function(){
			
				log.info(">>> SUCESSO <<<")

				sendRes(res, true);
            
            }).catch(function(err){
        
                log.warn(err.message);
        
                sendRes(res, false, {"Msg": err.message});
        
            });
        
        }).catch(function(err){
        
            log.warn(err.message);
        
            sendRes(res, false, {"Msg": err.message});
        
        });

    }else{

        log.warn("Existem campos nao preenchidos");

        sendRes(res, false, {"Msg": "Existem campos nao preenchidos"});
        
    }

});

app.post("/contas_criar", function(req, res){

    log.info("-------------------------------------");
    log.info("Funcao: contas_criar");
    log.info("Usuario: " + req.auth.user);
    log.info(req.body);

    console.log("-------------------------------------");
    console.log("Funcao: contas_criar");
    console.log("Usuario: " + req.auth.user);

    if( req.body.Conta != "" ) 
	{

        MailEnableCtrl.init().then(function(){

            MailEnableCtrl.contas_criar(req.body.Conta).then(function(){
			
				log.info(">>> SUCESSO <<<")

				sendRes(res, true);
            
            }).catch(function(err){
        
                log.warn(err.message);
        
                sendRes(res, false, {"Msg": err.message});
        
            });
        
        }).catch(function(err){
        
            log.warn(err.message);
        
            sendRes(res, false, {"Msg": err.message});
        
        });

    }else{

        log.warn("Existem campos nao preenchidos");

        sendRes(res, false, {"Msg": "Existem campos nao preenchidos"});
        
    }

});

app.post("/contas_deletar", function(req, res){

    log.info("-------------------------------------");
    log.info("Funcao: contas_deletar");
    log.info("Usuario: " + req.auth.user);
    log.info(req.body);

    console.log("-------------------------------------");
    console.log("Funcao: contas_deletar");
    console.log("Usuario: " + req.auth.user);

    if( req.body.Conta != "" ) 
	{

        MailEnableCtrl.init().then(function(){

            MailEnableCtrl.contas_deletar(req.body.Conta).then(function(){
			
				log.info(">>> SUCESSO <<<")

				sendRes(res, true);
            
            }).catch(function(err){
        
                log.warn(err.message);
        
                sendRes(res, false, {"Msg": err.message});
        
            });
        
        }).catch(function(err){
        
            log.warn(err.message);
        
            sendRes(res, false, {"Msg": err.message});
        
        });

    }else{

        log.warn("Existem campos nao preenchidos");

        sendRes(res, false, {"Msg": "Existem campos nao preenchidos"});
        
    }

});

app.post("/emails_listar", function(req, res){

    log.info("-------------------------------------");
    log.info("Funcao: emails_listar");
    log.info("Usuario: " + req.auth.user);
    log.info(req.body);

    console.log("-------------------------------------");
    console.log("Funcao: emails_listar");
    console.log("Usuario: " + req.auth.user);

    if( req.body.Conta != "" ) 
	{

        MailEnableCtrl.init().then(function(){

            MailEnableCtrl.emails_listar(req.body.Conta).then(function(DadRet){
			
				console.log(JSON.stringify(DadRet));

				log.info(">>> SUCESSO <<<")
				log.info(JSON.stringify(DadRet))

				sendRes(res, true, DadRet);
            
            }).catch(function(err){
        
                log.warn(err.message);
        
                sendRes(res, false, {"Msg": err.message});
        
            });
        
        }).catch(function(err){
        
            log.warn(err.message);
        
            sendRes(res, false, {"Msg": err.message});
        
        });

    }else{

        log.warn("Existem campos nao preenchidos");

        sendRes(res, false, {"Msg": "Existem campos nao preenchidos"});
        
    }

});

app.post("/emails_is", function(req, res){

    log.info("-------------------------------------");
    log.info("Funcao: emails_is");
    log.info("Usuario: " + req.auth.user);
    log.info(req.body);

    console.log("-------------------------------------");
    console.log("Funcao: emails_is");
    console.log("Usuario: " + req.auth.user);

    if( req.body.Conta != "" && req.body.Email != "" ) 
	{

        MailEnableCtrl.init().then(function(){

            MailEnableCtrl.emails_is(req.body.Conta, req.body.Email).then(function(DadRet){
			
				console.log(JSON.stringify(DadRet));

				log.info(">>> SUCESSO <<<")
				log.info(JSON.stringify(DadRet))

				sendRes(res, true, DadRet);
            
            }).catch(function(err){
        
                log.warn(err.message);
        
                sendRes(res, false, {"Msg": err.message});
        
            });
        
        }).catch(function(err){
        
            log.warn(err.message);
        
            sendRes(res, false, {"Msg": err.message});
        
        });

    }else{

        log.warn("Existem campos nao preenchidos");

        sendRes(res, false, {"Msg": "Existem campos nao preenchidos"});
        
    }

});

app.post("/emails_criar", function(req, res){

    log.info("-------------------------------------");
    log.info("Funcao: emails_criar");
    log.info("Usuario: " + req.auth.user);
    log.info(req.body);

    console.log("-------------------------------------");
    console.log("Funcao: emails_criar");
    console.log("Usuario: " + req.auth.user);

    if( req.body.Conta != "" && req.body.Email != "" && req.body.Senha != "" && req.body.Limite != "" ) 
	{

        MailEnableCtrl.init().then(function(){

            MailEnableCtrl.emails_criar(req.body.Conta, req.body.Email, req.body.Senha, req.body.Limite).then(function(){
			
				log.info(">>> SUCESSO <<<")

				sendRes(res, true);
            
            }).catch(function(err){
        
                log.warn(err.message);
        
                sendRes(res, false, {"Msg": err.message});
        
            });
        
        }).catch(function(err){
        
            log.warn(err.message);
        
            sendRes(res, false, {"Msg": err.message});
        
        });

    }else{

        log.warn("Existem campos nao preenchidos");

        sendRes(res, false, {"Msg": "Existem campos nao preenchidos"});
        
    }

});

app.post("/emails_alterar_senha", function(req, res){

    log.info("-------------------------------------");
    log.info("Funcao: emails_alterar_senha");
    log.info("Usuario: " + req.auth.user);
    log.info(req.body);

    console.log("-------------------------------------");
    console.log("Funcao: emails_alterar_senha");
    console.log("Usuario: " + req.auth.user);

    if( req.body.Conta != "" && req.body.Email != "" && req.body.Senha != "" ) 
	{

        MailEnableCtrl.init().then(function(){

            MailEnableCtrl.emails_alterar_senha(req.body.Conta, req.body.Email, req.body.Senha).then(function(){
			
				log.info(">>> SUCESSO <<<")

				sendRes(res, true);
            
            }).catch(function(err){
        
                log.warn(err.message);
        
                sendRes(res, false, {"Msg": err.message});
        
            });
        
        }).catch(function(err){
        
            log.warn(err.message);
        
            sendRes(res, false, {"Msg": err.message});
        
        });

    }else{

        log.warn("Existem campos nao preenchidos");

        sendRes(res, false, {"Msg": "Existem campos nao preenchidos"});
        
    }

});

app.post("/emails_alterar_limite", function(req, res){

    log.info("-------------------------------------");
    log.info("Funcao: emails_alterar_limite");
    log.info("Usuario: " + req.auth.user);
    log.info(req.body);

    console.log("-------------------------------------");
    console.log("Funcao: emails_alterar_limite");
    console.log("Usuario: " + req.auth.user);

    if( req.body.Conta != "" && req.body.Email != "" && req.body.Limite != "" ) 
	{

        MailEnableCtrl.init().then(function(){

            MailEnableCtrl.emails_alterar_limite(req.body.Conta, req.body.Email, req.body.Limite).then(function(){
			
				log.info(">>> SUCESSO <<<")

				sendRes(res, true);
            
            }).catch(function(err){
        
                log.warn(err.message);
        
                sendRes(res, false, {"Msg": err.message});
        
            });
        
        }).catch(function(err){
        
            log.warn(err.message);
        
            sendRes(res, false, {"Msg": err.message});
        
        });

    }else{

        log.warn("Existem campos nao preenchidos");

        sendRes(res, false, {"Msg": "Existem campos nao preenchidos"});
        
    }

});

app.post("/emails_alterar_status", function(req, res){

    log.info("-------------------------------------");
    log.info("Funcao: emails_alterar_status");
    log.info("Usuario: " + req.auth.user);
    log.info(req.body);

    console.log("-------------------------------------");
    console.log("Funcao: emails_alterar_status");
    console.log("Usuario: " + req.auth.user);

    if( req.body.Conta != "" && req.body.Email != "" ) 
	{

        MailEnableCtrl.init().then(function(){

            MailEnableCtrl.emails_alterar_status(req.body.Conta, req.body.Email, req.body.Status).then(function(){
			
				log.info(">>> SUCESSO <<<")

				sendRes(res, true);
            
            }).catch(function(err){
        
                log.warn(err.message);
        
                sendRes(res, false, {"Msg": err.message});
        
            });
        
        }).catch(function(err){
        
            log.warn(err.message);
        
            sendRes(res, false, {"Msg": err.message});
        
        });

    }else{

        log.warn("Existem campos nao preenchidos");

        sendRes(res, false, {"Msg": "Existem campos nao preenchidos"});
        
    }

});

app.post("/emails_deletar", function(req, res){

    log.info("-------------------------------------");
    log.info("Funcao: emails_deletar");
    log.info("Usuario: " + req.auth.user);
    log.info(req.body);

    console.log("-------------------------------------");
    console.log("Funcao: emails_deletar");
    console.log("Usuario: " + req.auth.user);

    if( req.body.Conta != "" && req.body.Email != "" ) 
	{

        MailEnableCtrl.init().then(function(){

            MailEnableCtrl.emails_deletar(req.body.Conta, req.body.Email).then(function(){
			
				log.info(">>> SUCESSO <<<")

				sendRes(res, true);
            
            }).catch(function(err){
        
                log.warn(err.message);
        
                sendRes(res, false, {"Msg": err.message});
        
            });
        
        }).catch(function(err){
        
            log.warn(err.message);
        
            sendRes(res, false, {"Msg": err.message});
        
        });

    }else{

        log.warn("Existem campos nao preenchidos");

        sendRes(res, false, {"Msg": "Existem campos nao preenchidos"});
        
    }

});

app.listen(cfg_porta, function(){ 
    
    console.log("SysMailEnableAPI - Porta: "  + cfg_porta);
    console.log("Desenvolvido por PALOMA MACETKO <cmacetko@gmail.com>");

    console.log("--------------");

    log.info("API Iniciada");

});