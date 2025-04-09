import {ReactNode, useState} from "react";
import {createPortal} from "react-dom";
import classNames from 'classnames';

import { FormattedMessage } from "react-intl";

import './Modal.css';

type Props = {
    isOpen: boolean,
    movie: any,
    toggleModal: (toggle: boolean) => void,
}
const Modal = (props: Props) => {
    const { isOpen, movie, toggleModal } = props
    const baseImgUrl = 'https://image.tmdb.org/t/p/w500'

    const modalClass = classNames(
        'modal-overlay',
        { ['modal-closed']: !isOpen }
    );

    const closeModal = () => toggleModal(false);

    const closeButton = (
        <button
            className={`close-button`}
            onClick={closeModal}
            tabIndex={0}
        >
            X
        </button>
    );

    return createPortal(
        <div className={modalClass} >
            <div className={'modal-dialog'}>
                {closeButton}
                {movie && (
                    <div className={'movie-overview'}>
                        <img src={baseImgUrl + movie?.backdrop_path} />
                        <h2>{movie.title?.toUpperCase()}</h2>
                        <p>{movie.overview}</p>
                        <table>
                        <tbody>
                            <tr>
                                <td><b>
                                    <FormattedMessage id='movies.modal.date' />:
                                </b></td>
                                <td> { movie.release_date} </td>
                            </tr>
                            <tr>
                                <td><b>
                                    <FormattedMessage id='movies.modal.vote' />:
                                </b></td>
                                <td> { movie.vote_average} </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
};

export default Modal
