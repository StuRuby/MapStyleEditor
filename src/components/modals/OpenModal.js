import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import FileReaderInput from 'react-file-reader-input';
import autobind from 'react-autobind';
import { connect } from 'react-redux';
import Button from '../../components/Button';
import { MdFileUpload } from 'react-icons/md';
import style from '../../libs/style';

// import LoadingModal from './LoadingModal';
//TODO:
// class OpenModal extends React.Component {
//     constructor(props) {
//         super(props);
//         autobind(this);
//     }
//     clearError() {}
//     onUpload(evt, results) {
//         const result = results[0];
//         const file = result[1];
//         const reader = new FileReader();
//         this.clearError();
//         reader.readAsText(file, 'UTF-8');
//         reader.onload = e => {
//             let mapStyle;
//             try {
//                 mapStyle = JSON.parse(e.target.result);
//             } catch (err) {
//                 console.log(err);
//             }

//             mapStyle = style.ensureStyleValidity(mapStyle);
//         };
//     }
//     render() {
//         const props = this.props;
//         return (
//             <Modal
//                 data-wd-key="open-modal"
//                 isOpen={props.isOpen}
//                 onOpenToggle={props.toggleModalOpen}
//                 title="加载样式"
//             >
//                 <section className="maputnik-modal-section">
//                     <h2>Upload Style</h2>
//                     <p>Upload a JSON style from your computer.</p>
//                     <FileReaderInput onChange={this.onUpload} tabIndex="-1">
//                         <Button className="maputnik-upload-button">
//                             <MdFileUpload />
// 							Upload
//                         </Button>
//                     </FileReaderInput>
//                 </section>
//             </Modal>
//         );
//     }
// }

export default function OpenModal(props) {
    const onUpload = (_, files) => {
        const [e, file] = files[0];
        const reader = new FileReader();
        reader.readAsText(file, 'utf-8');
        reader.onload = e => {
            let mapStyle;
            try {
                mapStyle = JSON.parse(e.target.result);
            } catch (err) {
                console.error(err);
                return;
            }
            mapStyle = style.ensureStyleValidity(mapStyle);
            props.onOpenToggle();
        };
        reader.onerror = e => console.error('error', e.target);
    };
    return (
        <div>
            <Modal
                data-wd-key="open-modal"
                isOpen={props.isOpen}
                onOpenToggle={props.onOpenToggle}
                title="加载样式"
            >
                <section className="maputnik-modal-section">
                    <h2>上传样式</h2>
                    <p>从本地上传样式文件</p>
                    <FileReaderInput onChange={onUpload} tabIndex="-1">
                        <Button className="maputnik-upload-button">
                            <MdFileUpload />
							上传
                        </Button>
                    </FileReaderInput>
                </section>
            </Modal>
        </div>
    );
}

OpenModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onOpenToggle: PropTypes.func.isRequired,
    onStyleOpen: PropTypes.func.isRequired
};
