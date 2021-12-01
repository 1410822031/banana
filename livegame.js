
const LIVE=1, DEAD=0; 

class Life {
    constructor(_row,_col){
        this.row = _row;
        this.col = _col;
        this.grid = new Array();
        //create 2d array
        for (let r = 0; r < this.row; r++) {
           this.grid.push(new Array());
           for (let c = 0; c < this.col; c++) {
               this.grid[r].push(DEAD);
           }
        }
        
    }
};

Life.prototype.Initialize = function(){
    this.grid[3][4] = LIVE;
    this.grid[3][5] = LIVE;
    this.grid[3][6] = LIVE;
    this.grid[3][7] = LIVE;
}

Life.prototype.getStatusAt = function(row, col){
    if(row<0 || col <0)
       return DEAD;
    if(row >= this.row || col >= this.col)  
       return DEAD;
    return this.grid[row][col];
}

/*Life.prototype.neighborCount = function(row, col){//改寫成外加
    this.grid[row-1][col-1]+=1;
    this.grid[row-1][col+=1];
    this.grid[row-1][col+1]+=1;
    this.grid[row][col-1]+=1;
    this.grid[row][col+1]+=1;
    this.grid[row+1][col-1]+=1;
    this.grid[row+1][col]+=1;
    this.grid[row+1][col+1]+=1;
    return 0;
}*/
Life.prototype.update = function(){
    var nextGrid = JSON.parse(JSON.stringify(this.grid));
    for (let r = 0; r < this.row; r++) {
        for (let c = 0; c < this.col; c++) {
            var nCount = this.getStatusAt(r,c);
            if (nCount==LIVE)//若有細胞才做外加
                {
                    nextGrid[r][c]-=1;//基本數減1
                    nextGrid[r-1][c-1]+=1;
                    nextGrid[r-1][c]+=1;
                    nextGrid[r-1][c+1]+=1;
                    nextGrid[r][c-1]+=1;
                    nextGrid[r][c+1]+=1;
                    nextGrid[r+1][c-1]+=1;
                    nextGrid[r+1][c]+=1;
                    nextGrid[r+1][c+1]+=1;
                }
        }
    }
    for (let r = 0; r < this.row; r++) {
        for (let c = 0; c < this.col; c++) {
            var nCount = nextGrid[r][c];//改寫成直接取得 不須全做8次判斷 效率提升 基礎值+N^2 + 有數子者做*2^3 
            //不須做最大值n^2*2^3
            if(nCount == 3 || (nCount==2&&this.getStatusAt(r,c)==LIVE)) //DEAD => LIVE c=3||判斷是否之前有細胞
               nextGrid[r][c] = LIVE;
            else //LIFE=>DEAD 
               nextGrid[r][c] = DEAD;
        }
    }
    this.grid = nextGrid;

}

var game = new Life(100,100);
console.log(JSON.stringify(game))
game.Initialize();
game.update();
game.update();
game.update();//測試用
game.update();
game.update();