import classNames from 'classnames/bind';

import Game from '../Game';
import base from '~/components/BaseStyle/BaseStyle.module.scss';
import styles from './ListGame.module.scss';

const cx = classNames.bind(styles);
const cbase = classNames.bind(base);

function ListGame({ listGame }) {
    return (
        <div className={cx('list-game')}>
            {listGame.map((e, i) => (
                <Game key={i} game={e} />
            ))}
        </div>
    );
}

export default ListGame;
