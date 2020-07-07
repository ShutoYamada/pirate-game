import React from 'react';
import './GameBoard.css';
import TargetInfo, { GenerateTargets } from '../modules/TargetInfo';

interface Props {
    lines? : number,
}

interface State {
    selectedCell : { col : number, row : number }[],
    targets : TargetInfo[],
    max : number,
}

// 参考 http://photoshopvip.net/120672

class GameBoard extends React.PureComponent<Props, State> {

    constructor(props : Props) {
        super(props);

        this.state = {
            selectedCell : [],
            targets : [],
            max : 24,
        }
    }

    componentDidMount = () => {
        this.setState({
            targets : [...GenerateTargets(8)],
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
                        <p style={{margin : 'auto'}}>{isTarget? '●' : '○'}</p>
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
                <div className="description">
                    <p>下記の64マスの中に海賊船が隠れています。</p>
                    <p>海賊船は3隻あり、船体の長さがそれぞれ違います。<br/>最も短い海賊船は3マス、長い海賊船は5マスです。</p>
                    <p>マスをクリックして大砲で攻撃しましょう。<br/>大砲の弾は24発まで発射できます。</p>
                </div>
                <div>
                    {rows}
                </div>
            </div>
        );
    }
}

export default GameBoard;
