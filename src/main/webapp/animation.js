/*这个文件用来存放动画队列*/
/*kruscal和prim的通用方法*/
/**
 * 添加code动画
 * @param func
 * @param byword
 */
function addIntoCodeAni (func, byword) {
    let codeAni = new codeAnimation(func, byword);
    codeAnimations.push(codeAni);
}

/**
 * 添加边动画
 * @param func
 * @param i
 * @param rest
 */
function addIntoEdgeAni(func, i, ...rest) {
    let edgeAni = new edgeAnimation(func, i, ...rest);
    edgeAnimations.push(edgeAni);
}

/**
 * 添加点动画
 * @param func
 * @param i
 * @param rest
 */
function addIntoPointAni(func, i, ...rest) {
    let pointAni = new pointAnimation(func, i, ...rest);
    pointAnimations.push(pointAni);
}

/**
 * 单步执行，其实是单步展示动画，这些动画是在已经完成kruscal或prim之后生成的
 */
function stepByStep () {
    switch (getChoice()) {
        case "Kruscal":{
            if(!statusInited) initStatus();
            if(!kruscalDone) kruscal();     //kruscal动画缓冲区已经在此生成
            if (codeAnimations[0] === undefined || edgeAnimations[0] === undefined){
                alert("已经展示完毕！");
                return;
            }
            showNextCodeAnimation();
            showNextEdgeAnimation();
            break;
        }
        case "Prim" :{
            // prim();
            if(!statusInited) initStatus();
            if(!primDone) prim(matrix);       //prim动画缓冲区已经在此生成
            if (codeAnimations[0] === undefined || edgeAnimations[0] === undefined){
                alert("已经展示完毕！");
                return;
            }
            showNextCodeAnimation();
            showNextEdgeAnimation();
            showNextPointAnimation();
        }
    }

}

/**
 * 展示下一个code动画
 */
function showNextCodeAnimation () {
    if(codeAnimations[0] === undefined) {
        return;
    }
    codeAnimations[0].showCodeAnimation();
    codeAnimations.shift();
}

/**
 * 展示下一个边动画
 */
function showNextEdgeAnimation () {
    if(edgeAnimations[0] === undefined) return;
    edgeAnimations[0].showEdgeAnimation();
    edgeAnimations.shift();
}

/**
 * 展示下一个点动画
 */
function showNextPointAnimation () {
    if(pointAnimations[0] === undefined) return;
    pointAnimations[0].showPointAnimation();
    pointAnimations.shift();
}

/**
 * 自动展示
 */
function autoShowAnimation () {
    let choice = getChoice();
    let radios = document.getElementsByName("animationSpeed");
    let animationSpeed;
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            animationSpeed = parseInt(radios[i].value);
        }
    }
    switch(choice){
        case "Kruscal":{
            kruscal();
            let auto = setInterval(function() { whenKruscalStop(); showNextCodeAnimation(); showNextEdgeAnimation(); }, animationSpeed);
            function whenKruscalStop() {
                if(edgeAnimations[0] === undefined || codeAnimations[0] === undefined) {
                    clearInterval(auto);
                }
            }
            break;
        }
        case "Prim":{
            // prim(matrix);
            console.table(prim(matrix));
            let codeAuto = setInterval(function() { whenPrimStop(); showNextCodeAnimation(); }, animationSpeed);
            let edgeAuto = setInterval(function() { whenPrimStop(); showNextEdgeAnimation(); }, animationSpeed);
            let pointAuto = setInterval(function() { whenPrimStop(); showNextPointAnimation(); }, animationSpeed);
            function whenPrimStop() {
                if(pointAnimations[0] === undefined) {
                    clearInterval(pointAuto);
                }
                if(codeAnimations[0] === undefined) {
                    clearInterval(codeAuto);
                }
                if(edgeAnimations[0] === undefined) {
                    clearInterval(edgeAuto);
                }
            }
            break;
        }
    }


}

/**
 * 等待其他动画以保持代码动画、顶点动画和边动画保持一致,code动画、vertex动画和edge动画需要同时入队列
 * @param i 只是进栈时使用，无任何作用
 */
function waitOtherAnimation(i){
    //等待code动画，在队列中占用时间，以保持代码动画和边动画保持一致
    //在判断接受的变数是否是点的数目-1时使用
    console.log("waiting other animation..." );
}
/*显示code的队列*/