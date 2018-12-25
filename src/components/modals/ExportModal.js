import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';
import { InputBlock, StringInput, CheckBoxInput } from '../input';
import Button from '../Button';
import { MdFileDownload } from 'react-icons/md';
import { format } from '@mapbox/mapbox-gl-style-spec';
import style from '../../libs/style';
import Slugify from 'slugify';
import { saveAs } from 'file-saver';


function stripAccessTokens(mapStyle) {
    const changedMetaData = { ...mapStyle.metadata };
    delete changedMetaData['maputnik:mapbox_access_token'];
    delete changedMetaData['maputnik:openmaptiles_access_token'];
    return {
        ...mapStyle,
        metadata: changedMetaData
    };
}

export default function ExportModal(props) {
    const openAccessToken = 'maputnik:openmaptiles_access_token';
    const mapboxAccessToken = 'maputnik:mapbox_access_token';
    const thunderAccessToken = 'maputnik:thunderforest_access_token';
    const stringValue = (props.mapStyle.metadata || {});

    const downloadStyle = () => {
        const tokenStyle = format(stripAccessTokens(style.replaceAccessTokens(props.mapStyle)));
        const blob = new Blob([tokenStyle], { type: 'application/json;charset=utf-8' });
        const exportName = props.mapStyle.name
            ? Slugify(props.mapStyle.name, { replacement: '_', lower: true })
            : props.mapStyle.id;
        saveAs(blob, exportName + '.json');
    };

    const changeMetadataProperty = (property, value) => {
        const changedStyle = {
            ...props.mapStyle,
            metadata: {
                ...props.mapStyle.metadata,
                [property]: value
            }
        };
        props.onStyleChanged(changedStyle);
    };

    return (
        <Modal
            data-wd-key='export-modal'
            isOpen={props.isOpen}
            onOpenToggle={props.onOpenToggle}
            title='export style'
        >
            <div className='maputnik-modal-section'>
                <h4>下载样式文件</h4>
                <p>下载样式文件到本地</p>
                <p>
                    <InputBlock label='MapTiler Access Token:'>
                        <StringInput
                            value={stringValue[openAccessToken]}
                            onChange={changeMetadataProperty.bind(null, openAccessToken)}
                        />
                    </InputBlock>
                    <InputBlock label='Mapbox Access Token:' >
                        <StringInput
                            value={stringValue[mapboxAccessToken]}
                            onChange={changeMetadataProperty.bind(null, mapboxAccessToken)}
                        />
                    </InputBlock>
                    <InputBlock label='Thunderforest Access Token: ' >
                        <StringInput
                            value={stringValue[thunderAccessToken]}
                            onChange={changeMetadataProperty.bind(null, thunderAccessToken)}
                        />
                    </InputBlock>
                </p>
                <Button
                    onClick={downloadStyle}
                >
                    <MdFileDownload />
                    下载
                </Button>
            </div>
        </Modal>
    );
}

ExportModal.propTypes = {
    mapStyle: PropTypes.object.isRequired,
    onStyleChanged: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onOpenToggle: PropTypes.func.isRequired,
};