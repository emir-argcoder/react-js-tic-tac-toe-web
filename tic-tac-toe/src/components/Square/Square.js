import './Square.css' 
import classNames from 'classnames';

const Square = ({ value, onClick, turn , winner }) => {

    const handleClick = () => {
        if (value === null) {
            onClick();
        }
    //    (turn !== null && value === null) && onClick(); ► Alternative
    }

    let squareClass = classNames({
        square: true,
        [`square--${value}`]: value !== null,
        winner: winner,
    });
    
	return (
		<div className={squareClass} onClick={() => handleClick()}> 
        
		</div>
	)
}

export default Square;
