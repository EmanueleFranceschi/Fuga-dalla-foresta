<!doctype HTML>
<html>
    <head>
        <title> verifica registrazione </title>
    </head>
    <body>
<?php
            require_once 'config.php';
            $conn = new mysqli(
                $config['mysql_host'],
                $config['mysql_user'],
                $config['mysql_password'],
                $config['mysql_db']
            );
            $emailr = $_POST['emailr'];
            $nomeutenter = $_POST['nomeutenter'];
            $passwordr =$_POST['passwordr'];
            
            $query_insert = "INSERT INTO giocatore (id, nome_utente, password, email) VALUES
                            ('','$nomeutenter',MD5('$passwordr'),'$emailr');";
            $ok = $conn->query($query_insert);
            if(!$ok){
                echo "<h1>Errore durante l'inserimento <a href=\"registrazione.php\"> torna alla registrazione </a></h1>";
            }else{
                echo "<h1>Inserimento effetuato<a href=\"login.php\"> torna alla login </a></h1>";
            }
            
?>
            
    </body>
</html>