import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';
import Modal from './Modal';
import { LayerIdBlock, LayerTypeBlock, LayerSourceBlock, LayerSourceLayerBlock } from '../layers';
import Button from '../Button';

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

    addLayer() {
        const props = this.props;
        const changedLayers = props.layers.slice();
        const { id, type, source } = this.state;
        const layer = { id, type };
        if (type !== 'background') {
            layer.source = source;
            if (type !== 'raster' && this.state['source-layer']) {
                layer['source-layer'] = this.state['source-layer'];
            }
        }
        changedLayers.push(layer);

        props.onLayerAdded(changedLayers);
        props.onOpenToggle(false);
    }

    render() {
        const props = this.props;
        const { type, id, source } = this.state;
        const sources = this.getSources(type);
        const layers = this.getLayersForSource(source);
        console.log('layers',layers);
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
                        onChange={v => this.setState({ id: v })}
                    />
                    <LayerTypeBlock
                        value={type}
                        wdKey='add-layer.layer-type'
                        onChange={v => this.setState({ type: v })}
                    />
                    {
                        type !== 'background' &&
                        <LayerSourceBlock
                            sourceIds={sources}
                            wdKey='add-layer.layer-source-block'
                            value={source}
                            onChange={v => this.setState({ source: v })}
                        />
                    }
                    {
                        ['background', 'raster', 'hillshade', 'heatmap'].indexOf(type) < 0 &&
                        <LayerSourceLayerBlock
                            isFixed={true}
                            sourceLayerIds={layers}
                            value={this.state['source-layer']}
                            onChange={v => {
                                debugger;
                                this.setState({ 'source-layer': v });
                            }}
                        />
                    }
                    <Button
                        className='maputnik-add-layer-button'
                        data-wd-key='add-layer'
                        onClick={this.addLayer}
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