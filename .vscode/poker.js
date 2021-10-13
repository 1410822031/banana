var putpoker=[];//建立一個發牌用鋪克牌組
var shot=["C" ,"D","H","S" ];//"club" ,"diamond","heart","spade" 建立鋪克順序 梅花最小 黑桃最大
for (var i=0;i<52;i++){
    putpoker.push(i);
}//發牌用鋪克牌組填數
putpoker.sort(function(a,b){return Math.random()-0.5;});//發牌用鋪克牌組洗牌
var player1=[] ,player2=[],player3=[],player4=[];//建立4個玩家 
function setplayer(player)//全為0的空牌和設置函數 有5*14的空間 因為我習慣多放一個空間
 {
     let box=[];
     for(j=0;j<14;j++){
        box.push(0);//製作14大小1維陣列
    }
    for (i=0;i<5;i++){
        let newbox =box.concat();//製作拷貝
        player.push(newbox);//利用一維拷貝 製作5*14的 2維陣列
    }
} 
setplayer(player1);setplayer(player2);setplayer(player3);setplayer(player4);//空牌盒設定
function forplayer(player)//製作player吃牌函數 每吃一個player鋪克牌組-13張 若小於13張輸出錯誤訊息
{   
    if(putpoker.length<13){
        console.log("出錯");//小於13張輸出錯誤訊息
            }
     else{
         for (var i=0;i<13;i++){
        let num=putpoker[0];//num站存數字 沒特別必要但我覺得比較順
         player[parseInt(num/13)][num%13]=1;//存數至玩家牌盒 0變成1
        putpoker.splice(0,1);}//刪除放過的數字
    }
}
forplayer(player1);forplayer(player2);forplayer(player3);forplayer(player4);//使用Player吃牌函數
function printplayer(player,str2,bl)//輸出排序函式  str2則為腳色名稱字串 輸出大小順序由bl決定 0=由小大到 1=由大到小 
{
    let str="",a=0,b=0;
    if (bl==1){a=4;b=13;}//用a,b變數做絕對值相反 實現反向排序
    for (i=0;i<5;i++){
        for(j=0;j<14;j++){
            if(player[Math.abs(i-a)][Math.abs(j-b)]==1){
               str = str + ","+shot[Math.abs(i-a)]+(Math.abs(j-b)+1)//用Math.abs做絕對值
            }
        }
    }
    console.log(str2+str.slice(1,str.length));
}
printplayer(player1,"player1:",0);
printplayer(player2,"player2:",0);
printplayer(player3,"player3:",0);
printplayer(player4,"player4:",0);
