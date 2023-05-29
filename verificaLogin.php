<!doctype HTML>
<html>
    <head>
        <title> verifica login</title>
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
         if ($conn -> connect_error)
        die("<p>Errore connessione al database.</p>");
         $query ="SELECT * FROM giocatore  WHERE nome_utente=? AND password=MD5(?)";
         $stmt = $conn->prepare( $query );
         $stmt->bind_param("ss",$_POST["nomeutente"], $_POST["password"]);

         $stmt->execute();
         $risultato = $stmt->get_result();
         if($risultato->num_rows !=0) {
            echo "Login eseguita con successo";
            header('Location: index.html');
         }else{
            echo "Login non valida <a href=\"login.php\">Torna alla pagina di login</a>";
         }
    ?>
    </body>
</html>
