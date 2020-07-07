export default class TargetInfo {
    cells : { row : number, col : number }[] = [];
}

export const GenerateTargets = (count : number, lines : number) : TargetInfo[] => {
    if(count < 0 || lines < 0) return [];
    let result : TargetInfo[] = [];

    return result;
}

export const GenerateTarget = (length : number, lines : number) : TargetInfo => {
    let result : TargetInfo = new TargetInfo();
    let created : boolean = false;
    
    while(!created){
        const row : number = Math.floor(Math.random()*(lines));
        const col : number = Math.floor(Math.random()*(lines));
        // 0:up, 1:ri, 2:do, 3:le
        const direction : number = Math.floor(Math.random()*(4));
        switch(direction){
            // up
            case 0:
                if(length <= row+1){
                    created = true;
                    for(let i = row; i > 0; i--){
                        result.cells.push({ row : i, col })
                    }
                } 
                else {
                    continue;
                }
                break;
            // right
            case 1:
                if(col + length <= lines){
                    created = true;
                    for(let i = col; i < lines; i++){
                        result.cells.push({ col : i, row })
                    }
                } 
                else {
                    continue;
                }
                break;
            // down
            case 2:
                if(row + length <= lines){
                    created = true;
                    for(let i = row; i < lines; i++){
                        result.cells.push({ row : i, col })
                    }
                } 
                else {
                    continue;
                }
                break;
            // left
            case 3:
                if(length <= col+1){
                    created = true;
                    for(let i = col; i > 0; i--){
                        result.cells.push({ col : i, row })
                    }
                } 
                else {
                    continue;
                }
                break;
        }
    }

    return result;
}