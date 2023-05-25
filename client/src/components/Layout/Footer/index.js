import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FaFacebookF, FaTwitter, FaPinterestP, FaGooglePlusG } from 'react-icons/fa';

import base from '~/components/BaseStyle/BaseStyle.module.scss';
import styles from './Footer.module.scss';
import images from './image';

const cx = classNames.bind(styles);
const cbase = classNames.bind(base);

function Footer() {
    return (
        <footer className={cx('footer')}>
            <div className={cbase('container')}>
                <div className={cx('wrapper')}>
                    <div className={cx('contact')}>
                        <img className={cx('image')} src={images[`./logo.png`]} />
                        <div className={cx('contact-wrapper')}>
                            <div className={cx('phone')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faPhone} />
                                <span>(00) 123 456 789</span>
                            </div>
                            <div className={cx('mail')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faEnvelope} />
                                <span>english@mail.edu.vn</span>
                            </div>
                            <div className={cx('social')}>
                                <div>
                                    <FaFacebookF />
                                </div>
                                <div>
                                    <FaTwitter />
                                </div>
                                <div>
                                    <FaGooglePlusG />
                                </div>
                                <div>
                                    <FaPinterestP />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('info')}>
                        <div className={cx('title')}>Company</div>
                        <ul>
                            <li>About us</li>
                            <li>Blog</li>
                            <li>Contact</li>
                            <li>Become a Teacher</li>
                        </ul>
                    </div>
                    <div className={cx('link')}>
                        <div className={cx('title')}>Links</div>
                        <ul>
                            <li>Courses</li>
                            <li>Events</li>
                            <li>Gallery</li>
                            <li>FAQs</li>
                        </ul>
                    </div>
                    <div className={cx('support')}>
                        <div className={cx('title')}>Support</div>
                        <ul>
                            <li>Documentation</li>
                            <li>Forums</li>
                            <li>Language Packs</li>
                            <li>Release Status</li>
                        </ul>
                    </div>
                    <div className={cx('recommend')}>
                        <div className={cx('title')}>Recommend</div>
                        <ul>
                            <li>WordPress</li>
                            <li>LearnPress</li>
                            <li>WooCommerce</li>
                            <li>bbPress</li>
                        </ul>
                    </div>
                </div>
                <div className={cx('auth')}>
                    <div className={cx('by')}>
                        <span>
                            <a href="#">Education WordPress Theme</a> by <a href="#">English</a>. Powered by English
                        </span>
                    </div>
                    <div className={cx('guide')}>
                        <a href="#">Privacy</a>
                        <a href="#">Terms</a>
                        <a href="#">Sitemap</a>
                        <a href="#">Purchase</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
