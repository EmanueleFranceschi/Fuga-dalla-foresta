<!doctype HTML>
<html> 
    <head>
        <title> login </title>
        <link rel="stylesheet" href="styles.css">
        <script src="script.js"></script>

    </head>
    <body>
    <div id="div" class="menu">
    <table class="centerImg TableWithHome">
                
                <tr>
                    <th>
                        <a href="index.html"><img class="loginMenu buttonMenu" src="imgMenu/home.png"></a>
                        
                    </th>

                    <th>
                        <p>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</p>
                    </th>

                    <th>
                        <a href="login.php"><img class="loginMenu buttonMenu" src="imgMenu/account.png"></a>
                        
                    </th>

                    <th>
                        <p>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</p>
                    </th>

                    <th>
                        <a href="opzioni.html"><img class="loginMenu  buttonMenu" src="imgMenu/sound.png"></a>
                    </th>

                    <th>
                        <p>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</p>
                    </th>

                    <th>
                        <a href="opzioni.html"><img class="loginMenu  buttonMenu" src="imgMenu/music.png"></a>
                    </th>
                </tr>
            </table>
        <h1 class="centerText text h1"> Account  </h1>
        <form action="verificaLogin.php" method="post">
        <div class="centerText">
            <label for="nomeUtente" class="text optionsText"> Name: </label>
            <br>
            <input type="text" id="nomeUtente" name="nomeutente">
            <br>
            <label for="pass" class="text optionsText"> Password: </label>
            <br>
            <input type="password" id="pass" name="password"> 
            <br>
            <br>
            <input type="submit" value="login" class="text centerImg  buttonMenu">
            <br>
        </div>
        </form>
        <form action="registrazione.php">
        <div class="centerText">
            <label for="registrazione" class="optionsText centerText"> Se non hai ancora un account registrati qui: </label>
            <input type="submit" value="registrati" class="text centerImg  buttonMenu">
        </div>
        </form> 
    </div> 
    </body>
</html>
