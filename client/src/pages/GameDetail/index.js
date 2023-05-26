import classNames from 'classnames/bind';
import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
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
import audioFile from '~/assets/audios/Lobby-Time.mp3';

const cx = classNames.bind(styles);
const cbase = classNames.bind(base);

function GameDetail() {
    const { id } = useParams();

    const userContext = useContext(UserContext);
    const [game, setGame] = useState({});
    const [listUserScores, setListUserScores] = useState([]);
    const [ranks, setRanks] = useState([]);
    const [irregular, setIrregular] = useState([]);
    const position = useRef(Math.floor(Math.random() * 603));

    const audioRef = useRef(null);
    const [sound, setSound] = useState(false);
    const [theme, setTheme] = useState(false);
    const [fontSize, setFontSize] = useState('medium');
    const [autoNext, setAutoNext] = useState(false);

    const [countDown, setCountDown] = useState(20);
    const [isCounting, setIsCounting] = useState(false);
    const [score, setScore] = useState(0);

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
    }, [id]);

    useLayoutEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/history-${userContext.user.id}-${id}`).then((response) => {
            setListUserScores(response.data);
        });

        gamePractice(false);
        gameCompetition(false);
        gameHome(true);
    }, [userContext.user, id]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/history-${userContext.user.id}-${id}`).then((response) => {
            setListUserScores(response.data);
        });

        axios.get(`http://127.0.0.1:8000/api/ranks-${id}`).then((response) => {
            setRanks(response.data);
        });
    }, [score]);

    useEffect(() => {
        document.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                document.querySelectorAll(`.${cx('submit-btn')}`).forEach((e) => e.click());
            }
        });

        const fontSizes = document.querySelectorAll(`.${cx('font-size')}`);
        fontSizes.forEach((fs) => {
            fs.addEventListener('click', () => {
                fontSizes.forEach((f) => {
                    f.classList.remove(`${cx('inset')}`);
                });
                fs.classList.add(`${cx('inset')}`);
                setFontSize(fs.textContent.toLowerCase());
            });
        });
    }, []);

    useEffect(() => {
        document.querySelector(`.${cx('competition-score')}`).value = score;
    }, [score]);

    const handleSound = (flag) => {
        if (flag) {
            console.log(1, audioRef.current);
            audioRef.current.play();
        } else {
            console.log(2);
            audioRef.current.pause();
        }
    };

    const changeTheme = (theme) => {
        const root = document.documentElement;
        if (theme == 'light') {
            root.style.setProperty('--background-game-area-color', '#ffffff');
            root.style.setProperty('--background-game-color', '#4a98cb');
            root.style.setProperty('--background-game-color-2', '#ebdac1');
            root.style.setProperty('--background-game-color-3', '#082c69');
            root.style.setProperty('--text-game-color', 'azure');
            root.style.setProperty('--text-game-color-2', '#000000');
        } else {
            root.style.setProperty('--background-game-area-color', '#434444');
            root.style.setProperty('--background-game-color', '#20545a');
            root.style.setProperty('--background-game-color-2', '#a7a7a7');
            root.style.setProperty('--background-game-color-3', '#001a30');
            root.style.setProperty('--text-game-color', 'azure');
            root.style.setProperty('--text-game-color-2', '#000000');
        }
    };

    useEffect(() => {
        const titleMedium = 4.5;
        const toggleMedium = 4;
        const textMedium = 3.5;
        const gameMedium = 3;
        const controlMedium = 2.5;
        const normalMedium = 2;

        const root = document.documentElement;

        if (fontSize == 'small') {
            root.style.setProperty('--title-game-size', `${titleMedium - 0.2}rem`);
            root.style.setProperty('--toggle-game-size', `${toggleMedium - 0.2}rem`);
            root.style.setProperty('--text-game-size', `${textMedium - 0.2}rem`);
            root.style.setProperty('--game-mode-size', `${gameMedium - 0.2}rem`);
            root.style.setProperty('--control-game-size', `${controlMedium - 0.2}rem`);
            root.style.setProperty('--normal-game-size', `${normalMedium - 0.2}rem`);
        } else if (fontSize == 'medium') {
            root.style.setProperty('--title-game-size', `${titleMedium}rem`);
            root.style.setProperty('--toggle-game-size', `${toggleMedium}rem`);
            root.style.setProperty('--text-game-size', `${textMedium}rem`);
            root.style.setProperty('--game-mode-size', `${gameMedium}rem`);
            root.style.setProperty('--control-game-size', `${controlMedium}rem`);
            root.style.setProperty('--normal-game-size', `${normalMedium}rem`);
        } else {
            root.style.setProperty('--title-game-size', `${titleMedium + 0.2}rem`);
            root.style.setProperty('--toggle-game-size', `${toggleMedium + 0.2}rem`);
            root.style.setProperty('--text-game-size', `${textMedium + 0.2}rem`);
            root.style.setProperty('--game-mode-size', `${gameMedium + 0.2}rem`);
            root.style.setProperty('--control-game-size', `${controlMedium + 0.2}rem`);
            root.style.setProperty('--normal-game-size', `${normalMedium + 0.2}rem`);
        }
    }, [fontSize]);

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
        position.current = Math.floor(Math.random() * irregular.length);
        const displayValue = 1 + Math.floor(Math.random() * 3);

        const inputs = document.querySelectorAll(`.${cx(`${mode}-text-field`)}`);
        inputs.forEach((e, i) => {
            e.disabled = false;
            e.value = '';
        });
        const input = document.getElementById(`${cx(`${mode}-v${displayValue}`)}`);
        input.disabled = true;
        input.value =
            irregular[position.current][displayValue == 1 ? 'base' : displayValue == 2 ? 'past' : 'participle'];
        console.log(irregular[position.current]);
    };

    const handleSubmit = (mode) => {
        console.log(position.current + 1);
        let flag = true;
        const v1 = document.getElementById(`${cx(`${mode}-v1`)}`);
        const v2 = document.getElementById(`${cx(`${mode}-v2`)}`);
        const v3 = document.getElementById(`${cx(`${mode}-v3`)}`);

        if (irregular[position.current]['base'] == v1.value) {
            v1.style.borderColor = 'var(--check-correct)';
        } else {
            v1.style.borderColor = 'var(--check-wrong)';
            flag = false;
        }
        if (irregular[position.current]['past'] == v2.value) {
            v2.style.borderColor = 'var(--check-correct)';
        } else {
            v2.style.borderColor = 'var(--check-wrong)';
            flag = false;
        }
        if (irregular[position.current]['participle'] == v3.value) {
            v3.style.borderColor = 'var(--check-correct)';
        } else {
            v3.style.borderColor = 'var(--check-wrong)';
            flag = false;
        }

        if (flag) {
            setScore(score + 1000);
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
            if (userContext.user['id'] == undefined) {
                document.getElementById(`${cx('competition-btn')}`).disabled = true;
                document.getElementById(`${cx('competition-btn')}`).style.pointerEvents = 'none';
                document.getElementById(`${cx('competition-btn')}`).style.opacity = '.5';
            } else {
                document.getElementById(`${cx('competition-btn')}`).disabled = false;
                document.getElementById(`${cx('competition-btn')}`).style.pointerEvents = 'unset';
                document.getElementById(`${cx('competition-btn')}`).style.opacity = 'unset';
            }
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

    useEffect(() => {
        let timeoutId;
        if (isCounting) {
            if (countDown == 0) {
                setIsCounting(false);
                document.querySelector(`.${cx('finish-overlay')}`).style.display = 'block';
                axios.post('http://127.0.0.1:8000/api/scores', {
                    user_id: userContext.user.id,
                    game_id: id,
                    score: score,
                });
            }
            timeoutId = setTimeout(() => {
                setCountDown(countDown - 1);
            }, 1000);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [countDown, isCounting]);

    return (
        <>
            <audio id="background-audio" ref={audioRef} loop>
                <source src={audioFile} type="audio/mpeg" />
            </audio>
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
                                    setIsCounting(false);
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
                                    console.log(userContext.user.id, irregular[position.current]['id']);
                                    axios.post('http://127.0.0.1:8000/api/notes-irregular', {
                                        user_id: userContext.user.id,
                                        irregular_id: irregular[position.current]['id'],
                                    });
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
                                <button
                                    className={cx('item')}
                                    id={cx('competition-btn')}
                                    onClick={(e) => {
                                        gameHome(false);
                                        gameCompetition(true);
                                        handleNext('competition');
                                        setScore(0);
                                        setIsCounting(true);
                                        setCountDown(20);
                                        document.querySelector(`.${cx('finish-overlay')}`).style.display = 'none';
                                    }}
                                >
                                    Competition
                                </button>
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
                                            if (autoNext) {
                                                setTimeout(() => {
                                                    nextBtn.disabled = true;
                                                    nextBtn.style.pointerEvent = 'none';
                                                    handleNext('practice');
                                                }, 500);
                                            }
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
                                        Time: <div className={cx('time-cooldown')}>{countDown}s</div>
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
                                            if (autoNext) {
                                                setTimeout(() => {
                                                    nextBtn.disabled = true;
                                                    nextBtn.style.pointerEvent = 'none';
                                                    handleNext('competition');
                                                }, 500);
                                            }
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
                                                setIsCounting(true);
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
                                            setIsCounting(true);
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
                                                    handleSound(!sound);
                                                },
                                            })}
                                        </div>
                                        <div className={cx('setting-item')}>
                                            <span>Theme</span>
                                            {GetToggleComponent(theme)({
                                                className: cx('toggle-icon'),
                                                onClick: () => {
                                                    setTheme(!theme);
                                                    changeTheme(theme ? 'light' : 'dark');
                                                },
                                            })}
                                        </div>
                                        <div className={cx('setting-item')}>
                                            <span>Font-size</span>
                                            <div className={cx('list-size')}>
                                                <div className={cx('font-size')}>Small</div>
                                                <div className={cx('font-size', 'inset')}>Medium</div>
                                                <div className={cx('font-size')}>Large</div>
                                            </div>
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
                            <div className={cx('finish-overlay')}>
                                <div className={cx('overlay')}>
                                    <div className={cx('title')}>Finish</div>
                                    <div className={cx('control-btn')}>
                                        <div
                                            className={cx('btn')}
                                            onClick={(e) => {
                                                document.querySelector(`.${cx('finish-overlay')}`).style.display =
                                                    'none';
                                                handleNext('competition');
                                                const nextBtn = document.getElementById(`${cx('competition-next')}`);
                                                nextBtn.disabled = true;
                                                nextBtn.style.pointerEvent = 'none';
                                                setCountDown(20);
                                                setIsCounting(true);
                                                setScore(0);
                                            }}
                                        >
                                            Play again
                                        </div>
                                        <div
                                            className={cx('btn')}
                                            onClick={(e) => {
                                                document.querySelector(`.${cx('finish-overlay')}`).style.display =
                                                    'none';
                                                gameCompetition(false);
                                                gameHome(true);
                                            }}
                                        >
                                            Cancel
                                        </div>
                                    </div>
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
