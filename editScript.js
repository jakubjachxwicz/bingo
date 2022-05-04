function editInit()
{
    // document.cookie = `1={"name":"bingo numero uno","id":"1","rows":[[{"value":"siała","selected":true},{"value":"baba","selected":false},{"value":"mak","selected":false},{"value":"nie","selected":false},{"value":"wiedziała","selected":false}],[{"value":"dziadek","selected":true},{"value":"wiedział","selected":true},{"value":"nie","selected":false},{"value":"powiedział","selected":true},{"value":"a","selected":false}],[{"value":"to","selected":false},{"value":"było","selected":false},{"value":"tak","selected":true},{"value":"to znaczy","selected":false},{"value":"jak","selected":true}],[{"value":"malaga","selected":true},{"value":"tiki","selected":true},{"value":"taki","selected":false},{"value":"i","selected":true},{"value":"kasztanki","selected":false}],[{"value":"dla","selected":false},{"value":"ciebie","selected":false},{"value":"cebularz","selected":true},{"value":"ty","selected":false},{"value":"przyjmniesz?","selected":true}]]}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    // document.cookie = `2={"name":"bingo numero dos","id":"2","rows":[[{"value":"1","selected":true},{"value":"2","selected":false},{"value":"3","selected":false},{"value":"4","selected":false},{"value":"5","selected":false}],[{"value":"6","selected":true},{"value":"7","selected":true},{"value":"8","selected":false},{"value":"9","selected":true},{"value":"10","selected":false}],[{"value":"11","selected":false},{"value":"12","selected":false},{"value":"13","selected":true},{"value":"14","selected":false},{"value":"15","selected":true}],[{"value":"16","selected":true},{"value":"17","selected":true},{"value":"18","selected":false},{"value":"19","selected":true},{"value":"20","selected":false}],[{"value":"21","selected":false},{"value":"22","selected":false},{"value":"23","selected":true},{"value":"24","selected":false},{"value":"25","selected":true}]]}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    
    const URLParams = new URLSearchParams(window.location.search);
    if (!URLParams.has("id")) newBingo();

    else
    {
        const id = URLParams.get("id");
        let bingo = getCookie(id);
        if (bingo == "") newBingo();

        else
        {
            bingo = JSON.parse(bingo);
            sessionStorage.setItem("id", id);
            sessionStorage.setItem("size", bingo.size);
            
            printBingo(bingo);
        }
    }
}


function newBingo()
{
    let i = 1;
    while (getCookie(i) != "")
    {
        i++;
    }

    sessionStorage.setItem("id", i);
    
    //console.log(i);
    let bingoString = `{"name":"","id":"${i}","rows":[[{"value":"","selected":false},{"value":"","selected":false},{"value":"","selected":false},{"value":"","selected":false},{"value":"","selected":false}],[{"value":"","selected":false},{"value":"","selected":false},{"value":"","selected":false},{"value":"","selected":false},{"value":"","selected":false}],[{"value":"","selected":false},{"value":"","selected":false},{"value":"","selected":false},{"value":"","selected":false},{"value":"","selected":false}],[{"value":"","selected":false},{"value":"","selected":false},{"value":"","selected":false},{"value":"","selected":false},{"value":"","selected":false}],[{"value":"","selected":false},{"value":"","selected":false},{"value":"","selected":false},{"value":"","selected":false},{"value":"","selected":false}]]}`;
    let bingo = JSON.parse(bingoString);
    printBingo(bingo);
}


function printBingo(bingo)
{
    const bingoCont = document.getElementById("bingoCont");
    
    let bingoNameCont = document.createElement("div");
    bingoNameCont.id = "bingoNameContID";

    let bingoNameInput = document.createElement("input");
    bingoNameInput.type = "text";
    bingoNameInput.value = bingo.name;
    bingoNameInput.attributes.required = "required";
    bingoNameInput.id = "bingoNameInputID";

    let bingoNameLabel = document.createElement("label");
    bingoNameLabel.innerHTML = "Nazwa: ";
    bingoNameLabel.setAttribute("for", "bingoNameInputID");

    bingoNameCont.appendChild(bingoNameLabel);
    bingoNameCont.appendChild(bingoNameInput);
    
    let bingoFields = document.createElement("div");
    bingoFields.id = "bingoFieldsID";

    for (let i = 0; i < 5; i++)
    {
        let row = document.createElement("div");
        row.className = "bingoRow";

        for (let j = 0; j < 5; j++)
        {
            let bingoField = document.createElement("div");
            bingoField.className = bingo.rows[i][j].selected ? "bingoFieldSelected" : "bingoField";

            let p = document.createElement("p");
            p.textContent = bingo.rows[i][j].value;
            p.className = "bingoPara";
            // p.id = `${i + 1}-${j + 1}`;
            // bingoField.innerHTML = `<p>${bingo.rows[i][j].value}</p>`;

            bingoField.appendChild(p);
            bingoField.id = `${i + 1}-${j + 1}`;
            bingoField.addEventListener("click", function()
            {
                this.className = (this.className == "bingoField" ? "bingoFieldSelected" : "bingoField");
            });

            row.appendChild(bingoField);
        }

        bingoFields.appendChild(row);
    }
    
    bingoCont.appendChild(bingoNameCont);
    bingoCont.appendChild(bingoFields);


    const list = document.getElementById("bingoInputsID");
    for (let i = 1; i <= 5; i++)
    {
        for (let j = 1; j <=5; j++)
        {
            let li = document.createElement("li");
            li.innerHTML = `<label>${i}-${j}:</label>`;

            let input = document.createElement("input");
            input.type = "text";
            input.name = `${i}-${j}`;
            input.value = bingo.rows[i - 1][j - 1].value;

            input.addEventListener("keyup", function()
            {
                // document.getElementById(this.name).innerHTML = `<p>${this.value}</p>`;
                document.getElementById(this.name).getElementsByClassName("bingoPara")[0].innerHTML = this.value;
            });

            li.appendChild(input);
            list.appendChild(li);
        }
    }
}


function saveBingo(goBack = false)
{
    let nameInput = document.getElementById("bingoNameInputID");
    if (nameInput.value == "")
    {
        alert("Nazwa nie może być pusta");
        nameInput.focus();
    }

    else
    {
        let id = sessionStorage.getItem("id");
        let bingoString = `${id}={"name":"${nameInput.value}","id":"${id}","rows":[`;
        for (let i = 1; i <= 5; i++)
        {
            bingoString += "[";
            for (let j = 1; j <= 5; j++)
            {
                let temp = document.getElementById(`${i}-${j}`);
                bingoString += `{"value":"${temp.getElementsByClassName("bingoPara")[0].innerHTML}","selected":${temp.className == "bingoField" ? false : true}}${j < 5 ? "," : ""}`;
            }
            bingoString += `]${i < 5 ? "," : ""}`;
        }
        bingoString += "]}; expires=Fri, 31 Dec 9999 23:59:59 GMT";


        document.cookie = bingoString;

        if (goBack) window.location.replace("index.html");
    }
}


function deleteBingo()
{
    if (confirm("Na pewno chcesz usunąć to bingo?"))
    {
        document.cookie = `${sessionStorage.getItem("id")}=;`;
        window.location.replace("index.html");
    }
}


function getCookie(cname) 
{
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) 
    {
        let c = ca[i];
        while (c.charAt(0) == ' ') 
        {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) 
        {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}