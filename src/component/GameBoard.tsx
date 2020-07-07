import React from 'react';
import './GameBoard.css';
import TargetInfo, { GenerateTarget } from '../modules/TargetInfo';

interface Props {
    lines? : number,
}

interface State {
    selectedCell : { col : number, row : number }[],
    targets : TargetInfo[],
}

// 参考 http://photoshopvip.net/120672

class GameBoard extends React.PureComponent<Props, State> {

    constructor(props : Props) {
        super(props);

        this.state = {
            selectedCell : [],
            targets : [],
        }
    }

    componentDidMount = () => {
        const hoge = GenerateTarget(3,8);
        console.log("hoge");
        console.log(hoge);

        this.setState({
            targets : [hoge],
        })
    }

    onClickCell = (row : number, col : number) => {
        const selectedCell = Array.from(this.state.selectedCell);
        const findIndex : number = selectedCell.findIndex((c) => c.row === row && c.col === col);
        if(findIndex >= 0){
            selectedCell.splice(findIndex, 1);
        }
        else {
            selectedCell.push({row, col});
        }

        this.setState({
            selectedCell
        })
    }

    render = () => {

        let { lines } = this.props;
        const { selectedCell, targets } = this.state;
        lines = lines || 8;

        let rows : JSX.Element[] = [];

        for(let i = 0; i < lines; i++){

            let cells : JSX.Element[] = [];

            for(let j= 0; j < lines; j++){
                const selected : boolean = selectedCell.some((c) => c.row === i && c.col === j);
                const isTarget : boolean = targets.some((t) => {
                    return !!(t.cells.find((c) => c.row === i && c.col === j));
                })
                cells.push(
                    <button className={`cell ${selected? 'selected' : 'unselected'}`} key={`${i.toString()}_${j.toString()}`} onClick={()=>{this.onClickCell(i, j)}}>
                        <p>{isTarget? '●' : '○'}</p>
                    </button>
                )
            }

            rows.push(
                <div className="row" key={`${i.toString()}`}>
                    {cells}
                </div>
            )
        }

        return (
            <div>
                {rows}
            </div>
        );
    }
}

export default GameBoard;
