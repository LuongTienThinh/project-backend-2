import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import base from '~/components/BaseStyle/BaseStyle.module.scss';
import styles from './Notify.module.scss';
import images from './image';

const cx = classNames.bind(styles);
const cbase = classNames.bind(base);

function Notify({ id, title, image, description }) {
    return (
        <li className={cx('notify-item')}>
            <Link to={`/detail/${id}`}>
                <img src={images[image]} />
                <div className={cx('content')}>
                    <div className={cx('title')}>{title}</div>
                    <div className={cx('description')}>{description}</div>
                </div>
            </Link>
        </li>
    );
}

export default Notify;
