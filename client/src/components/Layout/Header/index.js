import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faNoteSticky, faBook } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import bcrypt from 'bcryptjs';

import ListNotify from '../ListNotify';
import base from '~/components/BaseStyle/BaseStyle.module.scss';
import styles from './Header.module.scss';
import images from './image';
import { UserContext } from '~/contexts/UserContext';

const cx = classNames.bind(styles);
const cbase = classNames.bind(base);

function Header() {
    const userContext = useContext(UserContext);
    const [listUsers, setListUsers] = useState([]);
    const [addUser, setAddUser] = useState({});
    const [loginUser, setLoginUser] = useState('');
    const [loginPass, setLoginPass] = useState('');
    const [regisUser, setRegisUser] = useState('');
    const [regisPass, setRegisPass] = useState('');
    const [regisConfirmPass, setRegisConfirmPass] = useState('');
    const [listGame, setListGame] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/list-users`).then((response) => {
            setListUsers(response.data);
        });
    }, [addUser]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/list-game`).then((response) => {
            setListGame(response.data);
        });
    }, []);

    useEffect(() => {
        const handleClick = (obj) => {
            document.querySelector(`.${cx(`link-${obj}`)}`).onclick = () => {
                handleRemoveLog();
                document.getElementById(`${cx(`${obj}`)}`).style.display = 'block';
            };
            document.getElementById(`${cx(`close-${obj}`)}`).onclick = () => {
                document.getElementById(`${cx(`${obj}`)}`).style.display = 'none';
            };
        };
        handleClick('login');
        handleClick('register');
    }, []);

    const handleRemoveLog = () => {
        document.querySelectorAll(`.${cx('wrong')}`).forEach((e) => e.remove());
        document.querySelectorAll(`.${cx('correct')}`).forEach((e) => e.remove());
    };

    const handleLog = (content, input, type, isCorrect) => {
        const after = document.createElement('span');
        after.innerHTML = content;
        after.classList.add(`${cx(isCorrect ? 'correct' : 'wrong')}`);
        document.querySelector(`.${cx(input)}.${cx(type)}`).appendChild(after);
    };

    return (
        <header>
            <section className={cx('header-area')}>
                {/* Account */}
                <div className={cx('account')}>
                    <div className={cbase('container')}>
                        <span
                            className={cx('link-login')}
                            style={{ display: userContext.user['user_name'] == undefined ? 'unset' : 'none' }}
                        >
                            Login
                        </span>
                        <span
                            className={cx('link-username')}
                            style={{ display: userContext.user['user_name'] == undefined ? 'none' : 'unset' }}
                        >
                            {userContext.user['user_name'] || ''}
                        </span>
                        <div className={cx('overlay')} id={cx('login')}>
                            <div className={cx('login-wrapper')}>
                                <div className={cx('login-area')}>
                                    <div className={cx('login-title')}>Login</div>
                                    <form className={[cx('user-account'), 'was-validated'].join(' ')}>
                                        <div className={cx('username', 'login')}>
                                            <input
                                                id="login-username"
                                                onChange={(e) => setLoginUser(e.target.value)}
                                                required
                                                title="This field is required"
                                            />
                                            <label className={cx('form-label')} htmlFor="login-username">
                                                Username
                                            </label>
                                        </div>
                                        <div className={cx('password', 'login')}>
                                            <input
                                                id="login-password"
                                                type="password"
                                                onChange={(e) => {
                                                    setLoginPass(e.target.value);
                                                }}
                                                required
                                            />
                                            <label className={cx('form-label')} htmlFor="login-password">
                                                Password
                                            </label>
                                        </div>
                                        <div className={cx('btn')}>
                                            <button
                                                className={cx('btn-login')}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    listUsers.forEach((u) => {
                                                        handleRemoveLog();
                                                        if (loginUser == u['user_name']) {
                                                            handleLog('Username is correct', 'username', 'login', true);
                                                            bcrypt.compare(loginPass, u['password']).then((result) => {
                                                                if (result) {
                                                                    userContext.setUser(u);
                                                                    document.getElementById(
                                                                        `${cx(`login`)}`,
                                                                    ).style.display = 'none';
                                                                    handleLog(
                                                                        'Password is correct',
                                                                        'password',
                                                                        'login',
                                                                        true,
                                                                    );
                                                                } else {
                                                                    handleLog(
                                                                        'Wrong password',
                                                                        'password',
                                                                        'login',
                                                                        false,
                                                                    );
                                                                }
                                                            });
                                                        } else {
                                                            handleLog(
                                                                'Username does not exist',
                                                                'username',
                                                                'login',
                                                                false,
                                                            );
                                                        }
                                                    });
                                                }}
                                            >
                                                Login
                                            </button>
                                            <button
                                                className={cx('btn-register')}
                                                type="button"
                                                onClick={() => {
                                                    document.querySelector('#login').style.display = 'none';
                                                    document.querySelector('#register').style.display = 'block';
                                                }}
                                            >
                                                Register
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div className={cx('btn-close')} id={cx('close-login')}>
                                    <FontAwesomeIcon icon={faClose} />
                                </div>
                            </div>
                        </div>
                        <span className={cx('split')}>|</span>
                        <span
                            className={cx('link-register')}
                            style={{ display: userContext.user['user_name'] == undefined ? 'unset' : 'none' }}
                        >
                            Register
                        </span>
                        <span
                            className={cx('link-logout')}
                            style={{ display: userContext.user['user_name'] == undefined ? 'none' : 'unset' }}
                            onClick={() => {
                                userContext.setUser({});
                            }}
                        >
                            Logout
                        </span>

                        <div className={cx('overlay')} id={cx('register')}>
                            <div className={cx('register-wrapper')}>
                                <div className={cx('register-area')}>
                                    <div className={cx('register-title')}>Register</div>
                                    <form className={cx('user-account')}>
                                        <div className={cx('username', 'register')}>
                                            <input
                                                id="regis-username"
                                                onChange={(e) => {
                                                    let flag = true;
                                                    listUsers.forEach((u) => {
                                                        handleRemoveLog();
                                                        if (e.target.value != '' && u['user_name'] == e.target.value) {
                                                            handleLog(
                                                                'Username already exists',
                                                                'username',
                                                                'register',
                                                                false,
                                                            );
                                                            flag = false;
                                                        }
                                                        if (flag && e.target.value != '') {
                                                            handleLog(
                                                                'Username is available',
                                                                'username',
                                                                'register',
                                                                true,
                                                            );
                                                        }
                                                    });
                                                    setRegisUser(e.target.value);
                                                }}
                                                required
                                            />
                                            <label className={cx('form-label')} htmlFor="regis-username">
                                                Username
                                            </label>
                                        </div>
                                        <div className={cx('password', 'register')}>
                                            <input
                                                id="regis-password"
                                                type="password"
                                                onChange={(e) => {
                                                    handleRemoveLog();
                                                    setRegisPass(e.target.value);
                                                    if (regisPass.length < 5) {
                                                        handleLog(
                                                            'Passwords must have at least 5 characters',
                                                            'password',
                                                            'register',
                                                            false,
                                                        );
                                                    } else {
                                                        handleLog('Passwords can use', 'password', 'register', true);
                                                    }
                                                }}
                                                required
                                            />
                                            <label className={cx('form-label')} htmlFor="regis-password">
                                                Password
                                            </label>
                                        </div>
                                        <div className={cx('confirm-password', 'register')}>
                                            <input
                                                id="regis-confirm-password"
                                                type="password"
                                                onChange={(e) => {
                                                    handleRemoveLog();
                                                    if (e.target.value != '' && e.target.value == regisPass) {
                                                        handleLog(
                                                            'Confirm password is correct',
                                                            'confirm-password',
                                                            'register',
                                                            true,
                                                        );
                                                    } else {
                                                        handleLog(
                                                            'Confirm password is wrong',
                                                            'confirm-password',
                                                            'register',
                                                            false,
                                                        );
                                                    }
                                                    setRegisConfirmPass(e.target.value);
                                                }}
                                                required
                                            />
                                            <label className={cx('form-label')} htmlFor="regis-confirm-password">
                                                Confirm password
                                            </label>
                                        </div>
                                        <div className={cx('btn')}>
                                            <button
                                                className={cx('btn-register')}
                                                onClick={(e) => {
                                                    let flag = true;
                                                    e.preventDefault();
                                                    listUsers.forEach((u) => {
                                                        handleRemoveLog();
                                                        if (regisUser == '' || u['user_name'] == regisUser) {
                                                            handleLog(
                                                                'Username already exists',
                                                                'username',
                                                                'register',
                                                                false,
                                                            );
                                                            document.getElementById('regis-username').focus();
                                                            flag = false;
                                                        } else {
                                                            handleLog(
                                                                'Username is correct',
                                                                'username',
                                                                'register',
                                                                true,
                                                            );
                                                        }
                                                    });
                                                    if (regisPass.length < 5) {
                                                        handleLog(
                                                            'Passwords must have at least 5 characters',
                                                            'password',
                                                            'register',
                                                            false,
                                                        );
                                                        flag = false;
                                                    } else {
                                                        handleLog('Passwords is correct', 'password', 'register', true);
                                                    }
                                                    if (regisConfirmPass != regisPass) {
                                                        handleLog(
                                                            'Confirm password wrong',
                                                            'confirm-password',
                                                            'register',
                                                            false,
                                                        );
                                                        flag = false;
                                                    } else {
                                                        handleLog(
                                                            'Confirm password is correct',
                                                            'confirm-password',
                                                            'register',
                                                            true,
                                                        );
                                                    }
                                                    if (flag) {
                                                        axios
                                                            .post(`http://127.0.0.1:8000/api/create-user`, {
                                                                email: `${regisUser}@${regisUser}.com`,
                                                                user_name: regisUser,
                                                                password: regisPass,
                                                            })
                                                            .then((response) => {
                                                                setAddUser({
                                                                    email: `${regisUser}@${regisUser}.com`,
                                                                    user_name: regisUser,
                                                                    password: regisPass,
                                                                });
                                                            });
                                                        document.getElementById(`${cx(`register`)}`).style.display =
                                                            'none';
                                                    }
                                                }}
                                            >
                                                Register
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div className={cx('btn-close')} id={cx('close-register')}>
                                    <FontAwesomeIcon icon={faClose} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Account */}

                <div className={cx('top-header')}>
                    <div className={cbase('container')}>
                        <div className={cx('wrapper')}>
                            <div className={cx('nav')}>
                                {/* Logo */}
                                <Link to="/" className={cx('logo')}>
                                    <img src={images['./logo.png']} />
                                </Link>
                                {/* End Logo */}

                                {/* Search */}
                                <div className={cx('search')}>
                                    <input placeholder="Search word here..." />
                                </div>
                                {/* End Search */}

                                {/* Irregular verb */}
                                <div className={cx('irregular')}>
                                    <Link to="/irregular-verb" className={cx('irregular-open')}>
                                        <FontAwesomeIcon className={cx('irregular-icon', 'icon')} icon={faBook} />
                                        <span>Irregular verb</span>
                                    </Link>
                                </div>
                                {/* End Irregular verb */}

                                {/* Note */}
                                <div className={cx('note')}>
                                    <Link to="/note" className={cx('note-open')}>
                                        <FontAwesomeIcon className={cx('note-icon', 'icon')} icon={faNoteSticky} />
                                        <span>Note</span>
                                    </Link>
                                </div>
                                {/* End Note */}

                                {/* Notification */}
                                <ListNotify
                                    listNotify={listGame.map((game) => {
                                        return {
                                            id: game["id"],
                                            title: game['game_name'],
                                            image: game['game_image'],
                                            description:
                                                'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto recusandae, excepturi aperiam temporibus similique sed debitis eveniet cum repellat, facilis dolor veniam reiciendis dolorum nisi rerum id voluptates eum libero!',
                                        };
                                    })}
                                />
                                {/* End Notification */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </header>
    );
}

export default Header;
