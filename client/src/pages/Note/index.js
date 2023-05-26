import classNames from 'classnames/bind';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import axios from 'axios';

import Header from '~/components/Layout/Header';
import Footer from '~/components/Layout/Footer';
import base from '~/components/BaseStyle/BaseStyle.module.scss';
import styles from './Note.module.scss';
import { UserContext } from '~/contexts/UserContext';

const cx = classNames.bind(styles);
const cbase = classNames.bind(base);

function Note() {
    const [wordList, setWordList] = useState([]);
    const [irregularList, setIrregularList] = useState([]);
    const userContext = useContext(UserContext);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/notes-vocabulary-${userContext.user.id}`).then((response) => {
            setWordList(response.data);
        });
        axios.get(`http://127.0.0.1:8000/api/notes-irregular-${userContext.user.id}`).then((response) => {
            setIrregularList(response.data);
        });
    }, [userContext.user.id]);

    return (
        <>
            <Header />
            <section className={cx('note')}>
                <div className={cbase('container')}>
                    {irregularList.length == 0 && wordList.length == 0 ? (
                        <div className={cx('wrapper')}>
                            <h1>
                                Currently, you don't have any notes. Make a note of the words you don't know, and those
                                words will be stored here. This will help you better remember English vocabulary.
                            </h1>
                        </div>
                    ) : (
                        ''
                    )}
                    {irregularList.length > 0 ? (
                        <div className={cx('wrapper')}>
                            <div className={cx('title')}>Irregular verbs</div>
                            <div className={cx('list-note-word')}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th className={cx('number-ordered')}>No.</th>
                                            <th>Base Form (V1)</th>
                                            <th>Past Simple (V2)</th>
                                            <th>Past Participle (V3)</th>
                                            <th className={cx('meaning')}>Meaning</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {irregularList.map((irr, i) => (
                                            <tr key={i}>
                                                <td className={cx('number-ordered')}>{i + 1}.</td>
                                                <td>{irr['base']}</td>
                                                <td>{irr['past']}</td>
                                                <td>{irr['participle']}</td>
                                                <td className={cx('meaning')}>{irr['description']}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                    {wordList.length > 0 ? (
                        <div className={cx('wrapper')}>
                            <div className={cx('title')}>Words</div>
                            <div className={cx('list-note-word')}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th className={cx('number-ordered')}>No.</th>
                                            <th>Word</th>
                                            <th>Similar</th>
                                            <th>Opposite</th>
                                            <th className={cx('meaning')}>Meaning</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {wordList.map((word, i) => (
                                            <tr key={i}>
                                                <td className={cx('number-ordered')}>{i + 1}.</td>
                                                <td>{word['word']}</td>
                                                <td>
                                                    {word['similar_word'].length != 0
                                                        ? word['similar_word'].replace(' ', ', ')
                                                        : '-'}
                                                </td>
                                                <td>{word['opposite_word'].length != 0
                                                        ? word['opposite_word'].replace(' ', ', ')
                                                        : '-'}</td>
                                                <td className={cx('meaning')}>{word['meaning']}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Note;
