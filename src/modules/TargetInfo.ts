export default class TargetInfo {
    cells : { row : number, col : number }[] = [];
    direction : number = -1;
}

export const GenerateTargets = (lines : number) : TargetInfo[] => {
    if(lines < 0) return [];
    let result : TargetInfo[] = [];

    result.push(GenerateTarget(5,lines, result));
    result.push(GenerateTarget(4,lines, result));
    result.push(GenerateTarget(3,lines, result));

    return result;
}

export const GenerateTarget = (length : number, lines : number, currentTargets? : TargetInfo[]) : TargetInfo => {
    let result : TargetInfo = new TargetInfo();
    let created : boolean = false;
    currentTargets = currentTargets || [];
    
    while(!created){
        const row : number = Math.floor(Math.random()*(lines));
        const col : number = Math.floor(Math.random()*(lines));
        // 0:up, 1:ri, 2:do, 3:le
        const direction : number = Math.floor(Math.random()*(4));
        result.direction = direction;

        // 先に設定されたTargetInfo内の座標と被っているかチェック
        if(currentTargets.length > 0){
            let duplicate : boolean = false;
            switch(direction){
                // up
                case 0:
                    duplicate = currentTargets.some((t) => {
                        return !!t.cells.find((c) => c.col === col && c.row >= row - length)
                    });
                    break;
                // right
                case 1:
                    duplicate = currentTargets.some((t) => {
                        return !!t.cells.find((c) => c.row === row && c.col <= col + length)
                    });
                    break;
                // down
                case 2:
                    duplicate = currentTargets.some((t) => {
                        return !!t.cells.find((c) => c.col === col && c.row <= row + length)
                    });
                    break;
                // left
                case 3:
                    duplicate = currentTargets.some((t) => {
                        return !!t.cells.find((c) => c.row === row && c.col >= col - length)
                    });
                    break;
            }

            if(duplicate) continue;
        }

        switch(direction){
            // up
            case 0:
                if(length <= row+1){
                    created = true;
                    for(let i = 0; i < length; i++){
                        result.cells.push({ row : row-i, col })
                    }
                } 
                break;
            // right
            case 1:
                if(col + length <= lines){
                    created = true;
                    for(let i = 0; i < length; i++){
                        result.cells.push({ col : col+i, row })
                    }
                } 
                break;
            // down
            case 2: 
                if(row + length <= lines){
                    created = true;
                    for(let i = 0; i < length; i++){
                        result.cells.push({ row : row+i, col })
                    }
                } 
                break;
            // left
            case 3:
                if(length <= col+1){
                    created = true;
                    for(let i = 0; i < length; i++){
                        result.cells.push({ col : col-i, row })
                    }
                } 
                break;
        }
    }

    return result;
}