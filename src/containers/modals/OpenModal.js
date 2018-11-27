import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../components/modals/Modal';
import FileReaderInput from 'react-file-reader-input';
import autobind from 'react-autobind';
import { connect } from 'react-redux';
import Button from '../../components/Button';
import { MdFileUpload } from 'react-icons/md';
import style from '../../libs/style';

class OpenModal extends React.Component {
    constructor(props) {
        super(props);
        autobind(this);
    }
    clearError() {

    }
    onUpload(evt, results) {
        const result = results[0];
        const file = result[1];
        const reader = new FileReader();
        this.clearError();
        reader.readAsText(file, 'UTF-8');
        reader.onload = e => {
            let mapStyle;
            try {
                mapStyle = JSON.parse(e.target.result);
            } catch (err) {
                console.log(err);
            }

            mapStyle = style.ensureStyleValidity(mapStyle);

        };
    }
    render() {
        const props = this.props;
        return (
            <Modal
                data-wd-key='open-modal'
                isOpen={props.isOpen}
                onOpenToggle={props.toggleModalOpen}
                title='加载样式'
            >
                <section className='maputnik-modal-section' >
                    <h2>Upload Style</h2>
                    <p>Upload a JSON style from your computer.</p>
                    <FileReaderInput onChange={this.onUpload} tabIndex='-1' >
                        <Button className='maputnik-upload-button' ><MdFileUpload />Upload</Button>
                    </FileReaderInput>
                </section>
            </Modal>
        );
    }
}

OpenModal.propTypes = {
    isOpen: PropTypes.bool,
    toggleModalOpen: PropTypes.func
};

const mapState = ({ modalsOpen }) => ({
    isOpen: modalsOpen['open'],
});

const mapDispatch = ({ modalsOpen: { setModalOpen } }) => ({
    toggleModalOpen: () => setModalOpen('open')
});

export default connect(mapState, mapDispatch)(OpenModal);