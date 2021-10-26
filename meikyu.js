const readline = require('readline-sync');//引入sync readline作為終端輸入
function debugint(str){//判斷輸入是否是數字且在(2-20) 並附帶console功能
    let a;
    do {
        console.log(str);
        a=readline.question('');
    } while (isNaN(a)||a<2||a>20);
    return a;
}
var x = debugint("請輸入x(橫向_)的大小(2-20):")//使用輸入韓式
var y = debugint("請輸入Y(縱向|)的大小(2-20):")
let kinone={ gox:0,goy:0,aruku:0}//宣告帶有 目標x y 軸+步數 的物件 
function setmap(j,arr,obj)//製作多維物件陣列函式 可無限多維 
                        //這次只使用到二維 obj為寫要寫入維度-1物件
{
    for (let i=0;i<j;i++)
    {
        let newobj =JSON.parse(JSON.stringify(obj));
        arr.push(newobj);
    }
}
var box=[],map=[];setmap(x,box,kinone);//製作物件陣列 一為box kinone物件陣列
setmap(y,map,box);//製作2為物件陣列 用box[] kinone物件陣列
function randommap(x,y){//隨機地圖目標x y軸 且不指向自己 (如1.1目標是1.1則從來)
    let a=0,b=0;
    for(j=0;j<y;j++)
    {
        for(i=0;i<x;i++)
        {
            do {
                a=rnd(x);b=rnd(y);
            } while ( a==i && b==j );//禁止只到自己
            map[j][i].gox=a;
            map[j][i].goy=b;
        }
    }
}//map[b][a]//map[y][x]//map[j][i]
function rnd(x){return Math.floor(Math.random()*x);}//隨機整數函式
randommap(x,y);//隨機化地圖
function consolemap(x,y,c){//輸出文字地圖 函式(c可用0.1)0.輸出目前地圖 1.輸出每個點的步數
    //假如前面選擇 5*5地圖
    //0.x.y: 3.2 , 1.2 , 3.0 , 1.1 , 0.2    |1.x.y: 4 , 7 , 3 , 2 , 7
    //  x.y: 1.1 , 3.0 , 4.3 , 1.0 , 1.4    |  x.y: 3 , 2 , 6 , 8 , 6
    //  x.y: 1.4 , 2.2 , 2.3 , 1.1 , 0.2    |  x.y: 6 , 6 , 5 , 3 , 7
    //  x.y: 4.2 , 0.0 , 3.2 , 0.0 , 0.0    |  x.y: 8 , 5 , 4 , 5 , 5
    //  x.y: 2.1 , 2.3 , 0.2 , 2.4 , 3.2    |  x.y: 7 , 5 , 7 , 8 , 4
    for(j=0;j<y;j++)
    {
        let str="";
        for(i=0;i<x;i++)
        {
            if(c==0){
                str+=" , "+map[j][i].gox+"."+map[j][i].goy;
            }
            else if(c==1){
                str+=" , "+map[j][i].aruku;
            }
        }
        console.log("x.y: "+str.slice(3,str.length))
    }
}
consolemap(x,y,0);//使用0號地圖
var kurukey=false;//判斷是否還在圓
var kurutree=kinone;//宣告全域變數kurutree 
    //這是作為判斷圈圈使用的全域變數 下面是我的思路
    //如 0-1-2-3-1 此時將 1 放入 guru裡面 回推將 1 - 3 - 2- 1 步數宣告 
    //即可確認 1-2-3-1 是固定不可更改步數 1-2-3 會是一個步數為3步的園圈 便可不在跑是圓圈過的點
    //而0則是圓圈外的支點 如果尚未確認 1-2-3-1圓圈的存在 則會先將 1-2-3便圓 +
    //1-2-3變圓 則可直接加3 0點的部署是4(1+3)
    //思路總結 : 若已經有步數則跳過 不重複判斷
function treearuku(betunotree){//計算步數函式
    let x=betunotree.gox,y=betunotree.goy;
    betunotree.aruku=1;//用1當走過點標記 後面會變成最終步數
    if (map[y][x].aruku==0){//往下延伸點 
        console.log(map[y][x].gox+"."+map[y][x].goy+":"+betunotree.aruku)
        treearuku(map[y][x]);
    }
    else if(map[y][x].aruku==1){//確認碰到圓圈頭尾相碰
        kurukey=true;//開啟圓
        kurutree=map[y][x];
        kurutree.aruku=0;
    }
    if (kurukey){
        betunotree.aruku=map[y][x].aruku+1;//圈數回推
        console.log(map[y][x].gox+"."+map[y][x].goy+":"+betunotree.aruku)
        if(betunotree==kurutree){
        kurukuru(map[y][x],betunotree.aruku);
        }
    }
    else{
        betunotree.aruku=map[y][x].aruku+1;//節點碰到圓或其他節點直接加 退出寒士
        console.log(map[y][x].gox+"."+map[y][x].goy+":"+betunotree.aruku)
        return 0;
    }
}
function kurukuru(betunotree,sum){//圓圈製作含是
    let x=betunotree.gox,y=betunotree.goy;
    if (map[y][x].aruku!==sum){
        kurukuru(map[y][x],sum);
    } 
    betunotree.aruku=sum;
    kurukey=false;//結束圓
}//map[b][a]//map[y][x]//map[j][i]
for (let j=0;j<y;j++){//使用 treearuku 開始計算步數
    for (let i=0;i<x;i++){
        if (map[j][i].aruku==0){//若已經有步數跳過 不重複判斷
            treearuku(map[j][i],1);
        }
    }
}
consolemap(x,y,1);//使用1號地圖 輸出全部步數結果