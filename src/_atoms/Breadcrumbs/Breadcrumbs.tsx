import React, { FC } from 'react';
import styles from './styles.scss';
import { Breadcrumbs } from '@mui/material';
import { Link } from 'react-router-dom';
import { IBreadcrumbsAtom } from './interfaces';

export const BreadcrumbsAtom: FC<IBreadcrumbsAtom> = (props) => {
    const { data } = props;
    return (
        <div className={styles.breadcrumbsContainer}>
            <Breadcrumbs>
                {data.map((item, index) => {
                    return item.href ? (
                        <Link key={index} to={item.href}>
                            {item.label}
                        </Link>
                    ) : (
                        <span key={index} className={index + 1 === data.length ? styles.nowItem : ''}>
                            {item.label}
                        </span>
                    );
                })}
            </Breadcrumbs>
        </div>
    );
};
