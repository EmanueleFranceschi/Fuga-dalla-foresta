<!doctype HTML>
<html> 
    <head>
        <title> Registrazione </title>
        <link rel="stylesheet" href="login.css">

    </head>
    <body>
        <h1> Registrazione </h1>
        <form action="verificaregistrazione.php" method="post">
            <label for="nomeUtente"> Nome utente: </label>
            <input type="text" id="nomeUtente" name="nomeutenter"> <br>
            <label for="mail"> email: </label>
            <input type="email" id="mail" name="emailr"> <br>
            <label for="pass"> Password: </label>
            <input type="password" id="pass" name="passwordr"> <br>
            <input type="submit" value="invia">
        </form>
    </body>
</html>
