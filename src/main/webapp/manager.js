/**
 * 获取用户选择的是kruscal还是prim
 * @returns {*}
 */
function getChoice () {
    const radios = document.getElementsByName("algorithmChoose");
    let choice;
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            choice = radios[i].value;
        }
    }
    return choice;
}

/**
 * 高亮应该选中的code，这个是code动画中要用到的
 * @param greenCode
 */
function highLightCode(greenCode) {
    const choice = getChoice();
    switch (choice) {
        case "Kruscal":{
            const code1 = document.getElementById("code1");
            const code2 = document.getElementById("code2");
            const code3 = document.getElementById("code3");
            const code4 = document.getElementById("code4");
            const code5 = document.getElementById("code5");
            const code6 = document.getElementById("code6");
            const code7 = document.getElementById("code7");
            const code8 = document.getElementById("code8");
            const code9 = document.getElementById("code9");
            code1.style.backgroundColor = "purple";
            code2.style.backgroundColor = "purple";
            code3.style.backgroundColor = "purple";
            code4.style.backgroundColor = "purple";
            code5.style.backgroundColor = "purple";
            code6.style.backgroundColor = "purple";
            code7.style.backgroundColor = "purple";
            code8.style.backgroundColor = "purple";
            code9.style.backgroundColor = "purple";
            const code = document.getElementById(greenCode);
            code.style.backgroundColor = "green";
            break;
        }
        case "Prim":{
            const code1 = document.getElementById("code1");
            const code2 = document.getElementById("code2");
            const code3 = document.getElementById("code3");
            const code4 = document.getElementById("code4");
            const code5 = document.getElementById("code5");
            const code6 = document.getElementById("code6");
            const code7 = document.getElementById("code7");
            const code8 = document.getElementById("code8");
            const code9 = document.getElementById("code9");
            code1.style.backgroundColor = "purple";
            code2.style.backgroundColor = "purple";
            code3.style.backgroundColor = "purple";
            code4.style.backgroundColor = "purple";
            code5.style.backgroundColor = "purple";
            code6.style.backgroundColor = "purple";
            code7.style.backgroundColor = "purple";
            code8.style.backgroundColor = "purple";
            code9.style.backgroundColor = "purple";
            const code = document.getElementById(greenCode);
            code.style.backgroundColor = "green";
            break;
        }
    }
}
