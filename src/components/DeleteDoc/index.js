import React from 'react'
import './index.scss';

import { useSelector } from 'react-redux';

import { RxCross2 } from 'react-icons/rx';

const DeleteDoc = (props) => {
    const onClickHandler = async () => {
        try {
            const res = await props.action(props.reqObj);
            console.log('from deleteDoc component', res);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <span onClick={onClickHandler} className='delete__btn'>{<RxCross2 />}</span>
    )
}

export default DeleteDoc