import classNames from 'classnames/bind';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { BsToggle2Off, BsToggle2On } from 'react-icons/bs';
import axios from 'axios';

import Header from '~/components/Layout/Header';
import Footer from '~/components/Layout/Footer';
import base from '~/components/BaseStyle/BaseStyle.module.scss';
import styles from './GameDetail.module.scss';
import images from './image';
import { UserContext } from '~/contexts/UserContext';

const cx = classNames.bind(styles);
const cbase = classNames.bind(base);

function GameDetail() {
    const { id } = useParams();

    const userContext = useContext(UserContext);
    const [game, setGame] = useState({});
    const [listUserScores, setListUserScores] = useState([]);
    const [ranks, setRanks] = useState([]);
    const [irregular, setIrregular] = useState([]);
    let position = Math.floor(Math.random() * 603);

    const [sound, setSound] = useState(false);
    const [theme, setTheme] = useState(false);
    const [fontSize, setFontSize] = useState(true);
    const [autoNext, setAutoNext] = useState(true);

    useLayoutEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/game-${id}`).then((response) => {
            setGame(response.data);
        });

        axios.get(`http://127.0.0.1:8000/api/irregular`).then((response) => {
            setIrregular(response.data);
        });

        axios.get(`http://127.0.0.1:8000/api/ranks-${id}`).then((response) => {
            setRanks(response.data);
        });
    }, []);

    useLayoutEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/history-${userContext.user.id}-${id}`).then((response) => {
            setListUserScores(response.data);
        });

        gamePractice(false);
        gameCompetition(false);
        gameHome(true);
    }, [userContext.user]);

    useEffect(() => {
        document.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                document.querySelector(`.${cx('submit-btn')}`).click();
            }
        });
    }, []);

    const handleNext = (mode) => {
        const v1 = document.getElementById(`${cx(`${mode}-v1`)}`);
        const v2 = document.getElementById(`${cx(`${mode}-v2`)}`);
        const v3 = document.getElementById(`${cx(`${mode}-v3`)}`);

        v1.style.borderColor = 'transparent';
        v2.style.borderColor = 'transparent';
        v3.style.borderColor = 'transparent';

        const submitBtn = document.getElementById(`${cx(`${mode}-submit`)}`);
        submitBtn.disabled = false;
        submitBtn.pointerEvent = 'unset';
        handleRandom(mode);
    };

    const handleRandom = (mode) => {
        position = Math.floor(Math.random() * irregular.length);
        const displayValue = 1 + Math.floor(Math.random() * 3);

        const inputs = document.querySelectorAll(`.${cx(`${mode}-text-field`)}`);
        inputs.forEach((e, i) => {
            e.disabled = false;
            e.value = '';
        });
        const input = document.getElementById(`${cx(`${mode}-v${displayValue}`)}`);
        input.disabled = true;
        input.value = irregular[position][displayValue == 1 ? 'base' : displayValue == 2 ? 'past' : 'participle'];
    };

    const handleSubmit = (mode) => {
        const v1 = document.getElementById(`${cx(`${mode}-v1`)}`);
        const v2 = document.getElementById(`${cx(`${mode}-v2`)}`);
        const v3 = document.getElementById(`${cx(`${mode}-v3`)}`);

        if (irregular[position]['base'] == v1.value) {
            v1.style.borderColor = 'var(--check-correct)';
        } else {
            v1.style.borderColor = 'var(--check-wrong)';
        }
        if (irregular[position]['past'] == v2.value) {
            v2.style.borderColor = 'var(--check-correct)';
        } else {
            v2.style.borderColor = 'var(--check-wrong)';
        }
        if (irregular[position]['participle'] == v3.value) {
            v3.style.borderColor = 'var(--check-correct)';
        } else {
            v3.style.borderColor = 'var(--check-wrong)';
        }

        v1.disabled = true;
        v2.disabled = true;
        v3.disabled = true;

        const submitBtn = document.getElementById(`${cx(`${mode}-submit`)}`);
        submitBtn.disabled = true;
        submitBtn.pointerEvent = 'none';
    };

    const gameHome = (flag) => {
        if (!flag) {
            document.querySelector(`.${cx('game-home')}`).style.display = 'none';
            document.getElementById(cx('history-btn')).style.transition = 'none';
            document.getElementById(cx('history-btn')).style.display = 'none';
        } else {
            document.querySelector(`.${cx('game-home')}`).style.display = 'flex';
            document.getElementById(cx('history-btn')).style.transition = 'block';
            document.getElementById(cx('history-btn')).style.display = 'block';
        }
    };

    const gamePractice = (flag) => {
        if (!flag) {
            document.querySelector(`.${cx('practice-mode')}`).style.display = 'none';
            document.getElementById(cx('pause-btn')).style.display = 'none';
            document.getElementById(cx('add-note-btn')).style.display = 'none';
        } else {
            document.querySelector(`.${cx('practice-mode')}`).style.display = 'block';
            document.getElementById(cx('pause-btn')).style.display = 'block';
            const addNoteBtn = document.getElementById(cx('add-note-btn'));
            console.log(userContext.user['id']);
            if (userContext.user['id'] == undefined) {
                addNoteBtn.style.display = 'none';
            } else {
                addNoteBtn.style.display = 'block';
            }
        }
    };

    const gameCompetition = (flag) => {
        if (!flag) {
            document.querySelector(`.${cx('competition-mode')}`).style.display = 'none';
            document.getElementById(cx('pause-btn')).style.display = 'none';
            document.querySelector(`.${cx('competition-score')}`).style.display = 'none';
        } else {
            document.querySelector(`.${cx('competition-mode')}`).style.display = 'block';
            document.getElementById(cx('pause-btn')).style.display = 'block';
            document.querySelector(`.${cx('competition-score')}`).style.display = 'block';
        }
    };

    const GetToggleComponent = (obj) => {
        return obj ? BsToggle2On : BsToggle2Off;
    };

    return (
        <>
            <Header />
            <section className={cx('game')}>
                <div className={cbase('container')}>
                    <div className={cx('game-area')}>
                        <div className={cx('nav-game-wrapper')}>
                            <div
                                className={cx('history-game')}
                                id={cx('history-btn')}
                                onClick={(e) => {
                                    document.querySelector(`.${cx('history-overlay')}`).style.display = 'block';
                                }}
                            >
                                History
                            </div>
                            <div
                                className={cx('pause')}
                                id={cx('pause-btn')}
                                onClick={(e) => {
                                    document.querySelector(`.${cx('pause-overlay')}`).style.display = 'block';
                                }}
                            >
                                Pause
                            </div>
                            <div className={cx('title-game')}>{game['game_name']}</div>
                            <input className={cx('competition-score')} placeholder="score" />
                            <div
                                className={cx('add-note')}
                                id={cx('add-note-btn')}
                                onClick={(e) => {
                                    console.log(userContext.user.id, irregular[position]['id']);
                                    axios
                                        .post('http://127.0.0.1:8000/api/notes-irregular', {
                                            user_id: userContext.user.id,
                                            irregular_id: irregular[position]['id'],
                                        })
                                        .then((response) => {});
                                }}
                            >
                                Add note
                            </div>
                            <FiSettings
                                className={cx('setting')}
                                onClick={(e) => {
                                    document.querySelector(`.${cx('setting-overlay')}`).style.display = 'block';
                                }}
                                title="Setting"
                            />
                        </div>
                        <div className={cx('game-mode')}>
                            {/* Game home */}
                            <div className={cx('game-home')}>
                                <div
                                    className={cx('item')}
                                    onClick={(e) => {
                                        gameHome(false);
                                        gamePractice(true);
                                        handleNext('practice');
                                    }}
                                >
                                    Practice
                                </div>
                                <div
                                    className={cx('item')}
                                    onClick={(e) => {
                                        gameHome(false);
                                        gameCompetition(true);
                                        handleNext('competition');
                                    }}
                                >
                                    Competition
                                </div>
                                <div
                                    className={cx('item')}
                                    onClick={(e) => {
                                        document.querySelector(`.${cx('rank-overlay')}`).style.display = 'block';
                                    }}
                                >
                                    Rank
                                </div>
                            </div>
                            {/* End game home */}

                            {/* Practice mode */}
                            <div className={cx('practice-mode')}>
                                <div className={cx('game-content')}>
                                    <div className={cx('game-column')}>
                                        <div>Base</div>
                                        <div>Past</div>
                                        <div>Participle</div>
                                    </div>
                                    <div className={cx('game-fill')}>
                                        <input
                                            className={cx('text-field', 'practice-text-field')}
                                            id={cx('practice-v1')}
                                        />
                                        <input
                                            className={cx('text-field', 'practice-text-field')}
                                            id={cx('practice-v2')}
                                        />
                                        <input
                                            className={cx('text-field', 'practice-text-field')}
                                            id={cx('practice-v3')}
                                        />
                                    </div>
                                </div>
                                <div className={cx('btn-area')}>
                                    <button
                                        id={cx('practice-submit')}
                                        className={cx('btn', 'submit-btn')}
                                        onClick={(e) => {
                                            handleSubmit('practice');
                                            const nextBtn = document.getElementById(`${cx('practice-next')}`);
                                            nextBtn.disabled = false;
                                            nextBtn.style.pointerEvent = 'unset';
                                            nextBtn.onclick = () => {
                                                handleNext('practice');
                                                nextBtn.disabled = true;
                                                nextBtn.style.pointerEvent = 'none';
                                            };
                                            e.target.disabled = true;
                                            e.target.pointerEvent = 'none';
                                        }}
                                    >
                                        Submit
                                    </button>
                                    <button id={cx('practice-next')} className={cx('btn', 'next-btn')} disabled>
                                        Next
                                    </button>
                                </div>
                            </div>
                            {/* End practice mode */}

                            {/* Competition mode */}
                            <div className={cx('competition-mode')}>
                                <div className={cx('game-content')}>
                                    <div className={cx('time-remaining')}>
                                        Time: <div className={cx('time-cooldown')}>1:30</div>
                                    </div>
                                    <div className={cx('game-column')}>
                                        <div>Base</div>
                                        <div>Past</div>
                                        <div>Participle</div>
                                    </div>
                                    <div className={cx('game-fill')}>
                                        <input
                                            className={cx('text-field', 'competition-text-field')}
                                            id={cx('competition-v1')}
                                        />
                                        <input
                                            className={cx('text-field', 'competition-text-field')}
                                            id={cx('competition-v2')}
                                        />
                                        <input
                                            className={cx('text-field', 'competition-text-field')}
                                            id={cx('competition-v3')}
                                        />
                                    </div>
                                </div>
                                <div className={cx('btn-area')}>
                                    <button
                                        id={cx('competition-submit')}
                                        className={cx('btn', 'submit-btn')}
                                        onClick={(e) => {
                                            handleSubmit('competition');
                                            const nextBtn = document.getElementById(`${cx('competition-next')}`);
                                            nextBtn.disabled = false;
                                            nextBtn.style.pointerEvent = 'unset';
                                            nextBtn.onclick = () => {
                                                handleNext('competition');
                                                nextBtn.disabled = true;
                                                nextBtn.style.pointerEvent = 'none';
                                            };
                                            e.target.disabled = true;
                                            e.target.pointerEvent = 'none';
                                        }}
                                    >
                                        Submit
                                    </button>
                                    <button id={cx('competition-next')} className={cx('btn', 'next-btn')} disabled>
                                        Next
                                    </button>
                                </div>
                            </div>
                            {/* End competition mode */}

                            <div className={cx('history-overlay')}>
                                <div className={cx('overlay')}>
                                    <div className={cx('title')}>History</div>
                                    <div className={cx('thead')}>
                                        <div className={cx('number-ordered')}>No.</div>
                                        <div className={cx('name')}>Name</div>
                                        <div className={cx('score')}>Score</div>
                                    </div>
                                    {listUserScores.map((e, i) => {
                                        return (
                                            <div key={i} className={cx('score-item')}>
                                                <div className={cx('number-ordered')}>{i + 1}.</div>
                                                <div className={cx('name')}>{userContext.user['user_name']}</div>
                                                <div className={cx('score')}>{e.score}</div>
                                            </div>
                                        );
                                    })}
                                    <IoIosCloseCircleOutline
                                        className={cx('close-btn')}
                                        onClick={(e) => {
                                            document.querySelector(`.${cx('history-overlay')}`).style.display = 'none';
                                        }}
                                    />
                                </div>
                            </div>
                            <div className={cx('pause-overlay')}>
                                <div className={cx('overlay')}>
                                    <div className={cx('title')}>Pause</div>
                                    <div className={cx('control-btn')}>
                                        <div
                                            className={cx('btn')}
                                            onClick={(e) => {
                                                document.querySelector(`.${cx('pause-overlay')}`).style.display =
                                                    'none';
                                            }}
                                        >
                                            Continue
                                        </div>
                                        <div
                                            className={cx('btn')}
                                            onClick={(e) => {
                                                gamePractice(false);
                                                gameCompetition(false);
                                                gameHome(true);
                                                document.querySelector(`.${cx('pause-overlay')}`).style.display =
                                                    'none';
                                            }}
                                        >
                                            Quit
                                        </div>
                                    </div>
                                    <IoIosCloseCircleOutline
                                        className={cx('close-btn')}
                                        onClick={(e) => {
                                            document.querySelector(`.${cx('pause-overlay')}`).style.display = 'none';
                                        }}
                                    />
                                </div>
                            </div>
                            <div className={cx('setting-overlay')}>
                                <div className={cx('overlay')}>
                                    <div className={cx('title')}>Setting</div>
                                    <div className={cx('setting-list')}>
                                        <div className={cx('setting-item')}>
                                            <span>Sound</span>
                                            {GetToggleComponent(sound)({
                                                className: cx('toggle-icon'),
                                                onClick: () => {
                                                    setSound(!sound);
                                                },
                                            })}
                                        </div>
                                        <div className={cx('setting-item')}>
                                            <span>Theme</span>
                                            {GetToggleComponent(theme)({
                                                className: cx('toggle-icon'),
                                                onClick: () => {
                                                    setTheme(!theme);
                                                },
                                            })}
                                        </div>
                                        <div className={cx('setting-item')}>
                                            <span>Font-size</span>
                                            {GetToggleComponent(fontSize)({
                                                className: cx('toggle-icon'),
                                                onClick: () => {
                                                    setFontSize(!fontSize);
                                                },
                                            })}
                                        </div>
                                        <div className={cx('setting-item')}>
                                            <span>Auto-next</span>
                                            {GetToggleComponent(autoNext)({
                                                className: cx('toggle-icon'),
                                                onClick: () => {
                                                    setAutoNext(!autoNext);
                                                },
                                            })}
                                        </div>
                                    </div>
                                    <IoIosCloseCircleOutline
                                        className={cx('close-btn')}
                                        onClick={(e) => {
                                            document.querySelector(`.${cx('setting-overlay')}`).style.display = 'none';
                                        }}
                                    />
                                </div>
                            </div>
                            <div className={cx('rank-overlay')}>
                                <div className={cx('overlay')}>
                                    <div className={cx('title')}>Rank</div>
                                    <div className={cx('thead')}>
                                        <div className={cx('number-ordered')}>No.</div>
                                        <div className={cx('name')}>Name</div>
                                        <div className={cx('score')}>Score</div>
                                    </div>
                                    {[...ranks].map((e, i) => {
                                        return (
                                            <div key={i} className={cx('score-item')}>
                                                <div className={cx('number-ordered')}>{i + 1}.</div>
                                                <div className={cx('name')}>{e['user_name']}</div>
                                                <div className={cx('score')}>{e.score}</div>
                                            </div>
                                        );
                                    })}
                                    <IoIosCloseCircleOutline
                                        className={cx('close-btn')}
                                        onClick={(e) => {
                                            document.querySelector(`.${cx('rank-overlay')}`).style.display = 'none';
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default GameDetail;
