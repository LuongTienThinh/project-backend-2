import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import Header from '~/components/Layout/Header';
import Footer from '~/components/Layout/Footer';
import Game from '~/components/Layout/Game';
import ListGame from '~/components/Layout/ListGame';
import base from '~/components/BaseStyle/BaseStyle.module.scss';
import styles from './Home.module.scss';
import images from './image';

const cx = classNames.bind(styles);
const cbase = classNames.bind(base);

function Home() {
    const [listTopic, setListTopic] = useState([]);
    const [listAction, setListAction] = useState([]);
    const [listGame, setListGame] = useState([]);
    const [searchGame, setSearchGame] = useState('');
    const [searchListGame, setSearchListGame] = useState([]);

    useEffect(() => {
        const handleFilter = (typeFilter) => {
            const lists = document.querySelectorAll(`.${cx(`${typeFilter}-item`)}`);
            lists.forEach((list) => {
                list.onclick = () => {
                    lists.forEach((e) => {
                        e.classList.remove(`${cx('active')}`);
                    });
                    list.classList.toggle(`${cx('active')}`);
                };
            });
        };
        handleFilter('topic');
        handleFilter('action');
    });

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/list-game`)
            .then((response) => response.json())
            .then((result) => {
                setListGame(result);
                setSearchListGame(result);
            });

        fetch(`http://127.0.0.1:8000/api/topics`)
            .then((response) => response.json())
            .then((result) => {
                setListTopic(result);
            });

        fetch(`http://127.0.0.1:8000/api/actions`)
            .then((response) => response.json())
            .then((result) => {
                setListAction(result);
            });
    }, []);

    return (
        <>
            <Header />

            {/* Large banner */}
            <section className={cx('large-banner')}>
                <img src={images['./banner-1.png']} />
            </section>
            {/* End Large banner */}

            {/* Filter game */}
            <section className={cx('filter-game')}>
                <div className={cbase('container')}>
                    <div className={cx('list-filter')}>
                        <div className={cx('search-game')}>
                            <input
                                placeholder="Search game here..."
                                onChange={(e) => {
                                    setSearchGame(e.target.value);
                                }}
                            />
                            <button
                                onClick={() => {
                                    console.log();
                                    setSearchListGame(
                                        listGame.filter((game) => {
                                            const topic = document.querySelector(
                                                `.${cx('topic-item')}.${cx('active')}`,
                                            );
                                            const action = document.querySelector(
                                                `.${cx('action-item')}.${cx('active')}`,
                                            );
                                            if (game['game_name'].toLowerCase().includes(searchGame.toLowerCase())) {
                                                if (topic.textContent != 'All') {
                                                    if (topic.textContent == game['topic_name']) {
                                                        if (action.textContent != 'All') {
                                                            if (action.textContent == game['action_name']) {
                                                                return true;
                                                            }
                                                        } else {
                                                            return true;
                                                        }
                                                    }
                                                } else {
                                                    if (action.textContent != 'All') {
                                                        if (action.textContent == game['action_name']) {
                                                            return true;
                                                        }
                                                    } else {
                                                        return true;
                                                    }
                                                }
                                            }
                                            return false;
                                        }),
                                    );
                                }}
                            >
                                Search
                            </button>
                        </div>
                        <div className={cx('topic')}>Topic:</div>
                        <ul className={cx('list-topic')}>
                            <li className={cx('topic-item', 'active')}>All</li>
                            {listTopic.map((topic, i) => (
                                <li key={i} className={cx('topic-item')}>
                                    {topic['topic_name']}
                                </li>
                            ))}
                        </ul>
                        <div className={cx('action')}>Action:</div>
                        <ul className={cx('list-action')}>
                            <li className={cx('action-item', 'active')}>All</li>
                            {listAction.map((action, i) => (
                                <li key={i} className={cx('action-item')}>
                                    {action['action_name']}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
            {/* End Filter game */}

            {/* List game */}
            <section className={cx('list-game')}>
                <div className={cbase('container')}>
                    <ListGame listGame={searchListGame} />
                </div>
            </section>
            {/* End List game */}

            <Footer />
        </>
    );
}

export default Home;
