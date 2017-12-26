export default  function createMessTipWin(param) {

    var initparam = {
            title:'友情提示',
            tips:"没有任何提示信息！",
            btnOk:'确定',
            btnNo:'取消',
            area:['250','100'],
            dir:'RT',
            hasShade:true,
            funcOk:function () {
            },
            funcNo:function () {
            }
        }

    //获取被点击按钮的尺寸以及距离左边上边的距离

   var  param = Object.assign({},initparam,param);

    var offset = {
        left:param.target.offsetLeft,
        top:param.target.offsetTop,
        width:param.target.offsetWidth,
        height:param.target.offsetHeight
     };
   //main
    var tipWinObj = document.createElement("DIV");
    tipWinObj.className="tip-window-layer";
    
    tipWinObj.style.width = param.area[0];
    tipWinObj.style.height = param.area[1];

//控制弹框显示的位置
var directionPop = {
    'RT':{
        'left': offset.left + offset.width +'px',
        'top':  offset.top +'px'
    },
    'RB':{
        'left': offset.left + offset.width + 'px',
        'top':  offset.top + offset.height + 'px'
    },
    'LT':{
        'left': offset.left - param.area[0] + 'px',
        'top':  offset.top + 'px'
    },
    'LB':{
        'left': offset.left - param.area[0] + 'px',
        'top':  offset.top + offset.height+ 'px'
    }
}

tipWinObj.style.cssText = ';width:'+param.area[0]+'px;height:'+param.area[1]+'px;top:'+directionPop[param.dir].top+';left:'+directionPop[param.dir].left+';'
    //top区域
    var topDiv = document.createElement("DIV");
    topDiv.className = 'tip-header-section';

    var titDiv = document.createElement("DIV");
    titDiv.className = 'tip-title';
    titDiv.innerHTML = param.title;

    var cross = document.createElement("DIV");
    cross.className= 'tip-icon-close';
    cross.innerHTML = 'X';


    var contentDiv = document.createElement("DIV");
    contentDiv.className = 'tip-main-content';
    contentDiv.innerHTML = param.tips;

    var okBtn = document.createElement("BUTTON");
    okBtn.className = 'btnOk';
    okBtn.innerHTML = param.btnOk;

    var noBtn = document.createElement("BUTTON");
     noBtn.className = 'btnNo';
    noBtn.innerHTML = param.btnNo;

    topDiv.appendChild(titDiv);
    topDiv.appendChild(cross);
    tipWinObj.appendChild(topDiv);
    tipWinObj.appendChild(contentDiv);

    tipWinObj.appendChild(noBtn);
    tipWinObj.appendChild(okBtn);

    //获取当前页面的第一个body节点对象,
    var body = document.getElementsByTagName("BODY")[0];
    body.appendChild(tipWinObj);

    //鎖屏DIV
    if(param.hasShade) {
    var bgObj = document.createElement("DIV");
        bgObj.style.cssText = "position:fixed;z-index: 990;top: 0px;left: 0px;background: #000000;filter: alpha(Opacity=30); -moz-opacity:0.30;opacity:0.30;";
        bgObj.style.width = '100%';
        bgObj.style.height = '120%';
        body.appendChild(bgObj);
    }

    cross.onclick = function () {
        body.removeChild(tipWinObj);
        param.hasShade && body.removeChild(bgObj);
    };
    okBtn.onclick = function () {
        param.funcOk();
        body.removeChild(tipWinObj);
        param.hasShade && body.removeChild(bgObj);
    };
    noBtn.onclick = function () {
        param.funcNo();
        body.removeChild(tipWinObj);
        param.hasShade && body.removeChild(bgObj);
    };
}