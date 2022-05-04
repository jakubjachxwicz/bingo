function indexInit()
{
    let list = document.getElementById("bingoList");
    let biscuits = decodeURIComponent(document.cookie).split(";");

    for (let i = 0; i < biscuits.length; i++)
    {
        let cookieString = getCookie(i + 1);

        if (cookieString != "")
        {
            let bingo = JSON.parse(cookieString);
            
            let li = document.createElement("li");
            li.innerHTML = bingo.name;
            li.addEventListener("click", function()
            {
                window.location.replace(`edit.html?id=${bingo.id}`);
            });
            
            list.appendChild(li);
        }
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