import classNames from 'classnames/bind';

import Header from '~/components/Layout/Header';
import Footer from '~/components/Layout/Footer';
import base from '~/components/BaseStyle/BaseStyle.module.scss';
import styles from './Irregular.module.scss';
import { useEffect, useState, use } from 'react';

const cx = classNames.bind(styles);
const cbase = classNames.bind(base);

function Irregular() {
    const [irregulars, setIrregulars] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [perPage, setPerPage] = useState(0);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/irregular-paginate?page=${currentPage}`)
            .then((response) => response.json())
            .then(({ data, last_page, per_page }) => {
                setIrregulars(data);
                setTotalPage(last_page);
                setPerPage(per_page);
            });
    }, [currentPage]);

    const handleResetActive = () => {
        document.querySelectorAll(`.${cx('page-item')}`).forEach((e) => {
            e.classList.remove(`${cx('active')}`);
        });
    };

    return (
        <>
            <Header />
            <section className={cx('irregular-verb')}>
                <div className={cbase('container')}>
                    <div className={cx('list-verb')}>
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
                                {irregulars.map((irregular, index) => (
                                    <tr key={irregular['id']}>
                                        <td className={cx('number-ordered')}>
                                            {(currentPage - 1) * perPage + index + 1}
                                        </td>
                                        <td>{irregular['base']}</td>
                                        <td>{irregular['past']}</td>
                                        <td>{irregular['participle']}</td>
                                        <td className={cx('meaning')}>{irregular['description']}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className={cx('pagination')}>
                            {Array.from({ length: totalPage }).map((_, i) => (
                                <div
                                    key={i}
                                    className={cx('page-item', i + 1 == 1 ? 'active' : '')}
                                    onClick={(e) => {
                                        handleResetActive();
                                        setCurrentPage(i + 1);
                                        e.target.classList.add(`${cx('active')}`);
                                    }}
                                >
                                    {i + 1}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Irregular;
