import React from 'react';
import PropTypes from 'prop-types';
import { MdClose } from 'react-icons/md';
import AriaModal from 'react-aria-modal';

export default function Modal(props) {
    function getApplicationNode() {
        return document.getElementById('app');
    }
    function onClose() {
        if (document.activeElement) {
            document.activeElement.blur();
        }
        setImmediate(() => props.onOpenToggle(false))
    }
    return (
        props.isOpen && <AriaModal
            titleText={props.title}
            underlayClickExits={props.underlayClickExits}
            getApplicationNode={getApplicationNode}
            verticallyCenter={true}
            onExit={onClose}
        >
            <div className='maputnik-modal'
                data-wd-key={props['data-wd-key']}
            >
                <header className='maputnik-modal-header'>
                    <h1 className='maputnik-modal-header-title'>{props.title}</h1>
                    <span className='maputnik-modal-header-space'></span>
                    <button className='maputnik-modal-header-toggle'
                        onClick={onClose}
                        data-wd-key={props['data-wd-key'] + '.close-modal'}
                    >
                        <MdClose />
                    </button>
                </header>
                <div className='maputnik-modal-scroller'>
                    <div className='maputnik-modal-content'>
                        {props.children}
                    </div>
                </div>
            </div>
        </AriaModal>
    );
}

Modal.propTypes = {
    'data-wd-key': PropTypes.string,
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    onOpenToggle: PropTypes.func.isRequired,
    children: PropTypes.node,
    underlayClickExits: PropTypes.bool,
    // underlayProps: PropTypes.object,
};

Modal.defaultProps = {
    underlayClickExits: true
};