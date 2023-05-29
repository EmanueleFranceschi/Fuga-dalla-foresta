<!doctype HTML>
<html> 
    <head>
        <title> login </title>
        <link rel="stylesheet" href="login.css">

    </head>
    <body>
        <h1> Login </h1>
        <form action="verificaLogin.php" method="post">
            <label for="nomeUtente"> Nome utente: </label>
            <input type="text" id="nomeUtente" name="nomeutente"> <br>
            <label for="pass"> Password: </label>
            <input type="password" id="pass" name="password"> <br>
            <input type="submit" value="invia">
        </form>
        <form action="registrazione.php">
            <label for="registrazione"> Se non hai ancora un account registrati qui: </label>
            <input type="submit" value="premi per registrarti">
        </form> 
       
    </body>
</html>
