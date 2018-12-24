import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import Button from '../Button';

export default function LoadingModal(props) {
    return (
        <Modal
            data-wd-key='loading-modal'
            isOpen={props.isOpen}
            underlayClickExits={false}
            underlayProps={{ onClick: e => e.stopPropagation() }}
            closeable={false}
            title={props.title}
            onOpenToggle={props.onCancel}
        >
            <p> {props.message} </p>
            <p className='maputnik-dialog__buttons'>
                <Button onClick={props.onCancel} > 取消 </Button>
            </p>
        </Modal>
    );
}

LoadingModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.node.isRequired
};