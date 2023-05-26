import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

import Notify from '../Notify';
import base from '~/components/BaseStyle/BaseStyle.module.scss';
import styles from './ListNotify.module.scss';

const cx = classNames.bind(styles);
const cbase = classNames.bind(base);

function ListNotify({ listNotify }) {
    return (
        <div className={cx('notify')}>
            <div className={cx('notify-open')}>
                <FontAwesomeIcon className={cx('notify-icon', 'icon')} icon={faBell} />
                <span>Notification</span>
            </div>
            <ul className={cx('notify-list')}>
                {listNotify.map((e, i) => (
                    <Notify key={i} id={e.id} title={e.title} image={e.image} description={e.description} />
                ))}
            </ul>
        </div>
    );
}

export default ListNotify;
