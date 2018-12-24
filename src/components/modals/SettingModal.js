import React from 'react';
import Modal from './Modal';
import { InputBlock, StringInput, SelectInput } from '../input';
import { latest } from '@mapbox/mapbox-gl-style-spec';


const StyleEnum = [
    {
        key: 'name',
        label: 'Name',
        doc: latest.$root.name.doc
    },
    {
        key: 'owner',
        label: 'Owner',
        doc: 'Owner ID of the style. Used by Mapbox or future style APIs.'
    },
    {
        key: 'sprite',
        label: 'Sprite URL',
        doc: latest.$root.sprite.doc
    },
    {
        key: 'glyphs',
        label: 'Glyphs URL',
        doc: latest.$root.glyphs.doc
    }
];

const MetadataEnum = [
    {
        key: 'maputnik:mapbox_access_token',
        label: 'Mapbox Access Token',
        doc: 'Public access token for Mapbox services.'
    },
    {
        key: 'maputnik:openmaptiles_access_token',
        label: 'MapTiler Access Token',
        doc: 'Public access token for MapTiler Cloud.'
    },
    {
        key: 'maputnik:thunderforest_access_token',
        label: 'Thunderforest Access Token',
        doc: 'Public access token for Thunderforest services.'
    }
];

export default function SettingModal(props) {
    const metadata = props.mapStyle.metadata || {};
    const inputProps = {};

    const changeStyleProperty = (property, value) => {
        const changedStyle = {
            ...props.mapStyle,
            [property]: value
        };
        props.onStyleChanged(changedStyle);
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
            data-wd-key='modal-settings'
            isOpen={props.isOpen}
            onOpenToggle={props.onOpenToggle}
            title='Style settings'
        >
            <div style={{ minWidth: 350 }} >
                {
                    StyleEnum.map(item =>
                        <InputBlock
                            label={item['label']}
                            key={item['key']}
                            doc={item['doc']}
                        >
                            <StringInput
                                {...inputProps}
                                data-wd-key={`modal-settings.${item['key']}`}
                                value={props.mapStyle[item['key']]}
                                onChange={changeStyleProperty.bind(null, item['key'])}
                            />
                        </InputBlock>
                    )
                }
                {
                    MetadataEnum.map(item =>
                        <InputBlock
                            label={item['label']}
                            key={item['key']}
                            doc={item['doc']}
                        >
                            <StringInput
                                {...inputProps}
                                data-wd-key={`modal-settings.${item['key']}`}
                                value={metadata[item['key']]}
                                onChange={changeMetadataProperty.bind(null, item['key'])}
                            />
                        </InputBlock>
                    )
                }
                <InputBlock
                    label='Style Renderer'
                    doc='Choose the default Maputnik renderer for this style.'
                >
                    <SelectInput
                        {...inputProps}
                        data-wd-key='modal-settings.maputnik:renderer'
                        options={[['mbgljs', 'MapboxGL JS'], ['ol', 'Open Layers (experimental)']]}
                        value={metadata['maputnik:renderer'] || 'mbgljs'}
                        onChange={changeMetadataProperty.bind(null, 'maputnik:renderer')}
                    />
                </InputBlock>
            </div>
        </Modal>
    );
}