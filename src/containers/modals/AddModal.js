import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import Modal from '../../components/modals/Modal';
import LayerIdBlock from '../../components/layers/LayerIdBlock';
import LayerTypeBlock from '../../components/layers/LayerTypeBlock';
import LayerSourceBlock from '../../components/layers/LayerSourceBlock';
import LayerSourceLayerBlock from '../../components/layers/LayerSourceLayerBlock';
import Button from '../../components/Button';

export default class AddModal extends Component {
    constructor(props) {
        super(props);
        autobind(this);
        this.state = {
            type: 'fill',
            id: ''
        };
        if (props.sources.length > 0) {
            this.state.source = Object.keys(this.props.sources)[0];
            this.state['source-layer'] = this.props.sources[this.state.source][0];
        }
    }

    getLayersForSource(source) {
        const sourceObj = this.props.sources[source] || {};
        return sourceObj.layers || [];
    }

    getSources(type) {
        const sources = [];
        const types = {
            vector: [
                'fill',
                'line',
                'symbol',
                'circle',
                'fill-extrusion'
            ],
            raster: [
                'raster'
            ]
        };
        for (let [key, val] of Object.entries(this.props.sources)) {
            if (types[val.type] && types[val.type].indexOf(type) > -1) {
                sources.push(key);
            }
        }
        return sources;
    }

    render() {
        const props = this.props;
        const { type, id, source } = this.state;
        const sources = this.getSources(type);
        const layers = this.getLayersForSource(source);

        return (
            <Modal
                isOpen={props.isOpen}
                onOpenToggle={props.onOpenToggle}
                title='添加图层'
                data-wd-key='modal:add-layer'
            >
                <div className='maputnik-add-layer'>
                    <LayerIdBlock
                        value={id}
                        wdKey='add-layer.layer-id'

                    />
                    <LayerTypeBlock
                        value={type}
                        wdKey='add-layer.layer-type'
                    />
                    {
                        type !== 'background' &&
                        <LayerSourceBlock
                            sourceIds={sources}
                            wdKey='add-layer.layer-source-block'
                            value={source}
                        />
                    }
                    {
                        ['background', 'raster', 'hillshade', 'heatmap'].indexOf(type) < 0 &&
                        <LayerSourceLayerBlock
                            isFixed={true}
                            sourceLayerIds={layers}
                            value={this.state['source-layer']}
                        />
                    }
                    <Button
                        className='maputnik-add-layer-button'
                        data-wd-key='add-layer'
                    >
                        添加图层
                    </Button>

                </div>
            </Modal>
        );
    }

}

AddModal.propTypes = {
    layers: PropTypes.array,
    sources: PropTypes.object,
    onOpenToggle: PropTypes.func,
};