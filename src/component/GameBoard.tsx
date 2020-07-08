import React from 'react';
import './GameBoard.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShip, faTimes, faCertificate, faCrosshairs, faWater } from "@fortawesome/free-solid-svg-icons";
import TargetInfo, { GenerateTargets } from '../modules/TargetInfo';

interface Props {
    lines? : number,
}

interface State {
    selectedCell : { col : number, row : number }[],
    targets : TargetInfo[],
    max : number,
}

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
        this?.reset();
    }

    /**
     * ゲームリセット
     */
    reset = () => {
        this.setState({
            targets : [...GenerateTargets(8)],
            selectedCell : [],
        })
    }

    /**
     * セル押下時処理
     * @param row 
     * @param col 
     */
    onClickCell = (row : number, col : number) => {
        let targets = Array.from(this.state.targets);
        const max = this.state.max;
        const selectedCell = Array.from(this.state.selectedCell);
        const aliveShips : number = targets.filter(t => !t.isBroken).length
        const isFinished : boolean = selectedCell.length === max || aliveShips === 0;

        if(isFinished) {
            alert('もう一度遊ぶには「リセット」を押してね!!');
            return
        };

        // 既に選択済のマスかチェック
        const findIndex : number = selectedCell.findIndex((c) => c.row === row && c.col === col);
        if(findIndex < 0){
            selectedCell.push({row, col});
        } else {
            return;
        }

        // 選択済のマスから大破したターゲットがいるか探索
        targets.forEach((t) => {
            if(t.isBroken) return;
            const allHit : boolean = selectedCell.filter((c) => {
                return !!(t.cells.find((tc) => tc.row === c.row && tc.col === c.col));
            }).length === t.cells.length;
            // 大破の場合はフラグを立てておく
            t.isBroken = allHit;
        })

        this.setState({
            selectedCell,
            targets
        })
    }

    render = () => {

        const { selectedCell, targets, max } = this.state;
        const aliveShips : number = targets.filter(t => !t.isBroken).length
        const isFinished : boolean = selectedCell.length === max || aliveShips === 0;

        let { lines } = this.props;
        lines = lines || 8;

        let rows : JSX.Element[] = [];

        for(let i = 0; i < lines; i++){

            let cells : JSX.Element[] = [];

            for(let j= 0; j < lines; j++){
                const selected : boolean = selectedCell.some((c) => c.row === i && c.col === j);
                const isTarget : boolean = targets.some((t) => {
                    return !!(t.cells.find((c) => c.row === i && c.col === j));
                });

                // デフォルトでは透明アイコンを表示
                let icon : JSX.Element = (
                    <FontAwesomeIcon className='water' icon={faWater} />
                );

                // もし選択されたマスなら
                if(selected){
                    // ターゲットの有無で表示するアイコンを変更
                    icon = isTarget? (
                        <FontAwesomeIcon className='icon certificate' icon={faCertificate} />
                    ) : (
                        <FontAwesomeIcon className='icon times' icon={faTimes} />
                    )
                }

                cells.push(
                    <button className={`cell ${selected? 'selected' : 'unselected'} ${isFinished && isTarget? 'target' : ''}`} 
                            key={`${i.toString()}_${j.toString()}`} 
                            onClick={()=>{this.onClickCell(i, j)}}>
                        {icon}
                    </button>
                )
            }

            rows.push(
                <div className="row" key={`${i.toString()}`}>
                    {cells}
                </div>
            )
        }

        const result : JSX.Element = isFinished? (
            <div className="status inset">
                    {targets.filter(t => !t.isBroken).length === 0? (
                        <p className='result'>完全勝利！</p>
                    ) : (
                        <p className='result'>残念！また遊んでね</p>
                    )}
            </div>
        ) : null;

        return (
            <div>
                <div className="description inset">
                    <p>下記のマスの中に隠れている海賊船を大砲で撃沈しよう！<br/>
                    海賊船は3隻で、船体の長さはそれぞれ3マス、4マス、5マス。<br/>
                    大砲の弾は最大24発まで発射できます。</p>
                </div>
                {result}
                <div className="status inset"> 
                    <div>
                        <FontAwesomeIcon className='icon certificate' icon={faCertificate} />
                        <p>当たり</p>
                    </div>
                    <div>
                        <FontAwesomeIcon className='icon times' icon={faTimes} />
                        <p>外れ</p>
                    </div>
                    <div>
                        <FontAwesomeIcon className='icon ship' icon={faShip} />
                        <p>{`${targets.filter(t => !t.isBroken).length}/${targets.length}`}</p>
                    </div>
                    <div>
                        <FontAwesomeIcon className='icon crosshairs' icon={faCrosshairs} />
                        <p>{`${max - selectedCell.length}/${max}`}</p>
                    </div>
                </div>
                <div>
                    {rows}
                </div>
                <div className="menu">
                    <button className="neumorphic-btn" onClick={this?.reset} >リセット</button>
                </div>
            </div>
        );
    }
}

export default GameBoard;
