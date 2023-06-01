<!doctype HTML>
<html> 
    <head>
        <title> Registrazione </title>
        <link rel="stylesheet" href="styles.css">
        <script src="script.js"></script>

    </head>
    <body>
    <div id="div" class="menu">
        <h1 class="centerText text h1"> Registrazione </h1>
        <form action="verificaregistrazione.php" method="post">
        <div class="centerText">
            <label for="nomeUtente" class="text optionsText"> Nome utente: </label>
            <br>
            <input type="text" id="nomeUtente" name="nomeutenter"> 
            <br>
            <label for="mail" class="text optionsText"> email: </label>
            <br>
            <input type="email" id="mail" name="emailr"> 
            <br>
            <label for="pass" class="text optionsText"> Password: </label>
            <br>
            <input type="password" id="pass" name="passwordr"> 
            <br>
            <br>
            <input type="submit" value="invia" class="text centerImg  buttonMenu">
        </div>
        </form>
    </div>
    </body>
</html>
