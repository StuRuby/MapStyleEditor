import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clamp from 'lodash.clamp';
import { Wrapper, Button, Menu, MenuItem } from 'react-aria-menubutton';
import { MdMoreVert } from 'react-icons/md';
import { connect } from 'react-redux';
import { arrayMove } from 'react-sortable-hoc';
import {
    LayerEditorGroup,
    LayerIdBlock,
    LayerTypeBlock,
    LayerSourceBlock,
    LayerSourceLayerBlock,
    MinZoomBlock,
    MaxZoomBlock,
    CommentBlock,
    JSONEditor,
} from '../../components/layers';
import style from '../../libs/style';
import { changeType, changeProperty } from '../../libs/layer';
import FilterEditor from '../../components/filter/FilterEditor';
import { PropertyGroup } from '../../components/fields';
import layout from '../../mock/layout';

function layoutGroups(layerType) {
    const layerGroup = {
        title: 'Layer',
        type: 'layer'
    };
    const filterGroup = {
        title: 'Filter',
        type: 'filter'
    };
    const editorGroup = {
        title: 'JSON Editor',
        type: 'jsoneditor'
    };
    return [layerGroup, filterGroup].concat(layout[layerType].groups).concat([editorGroup]);
}

class LayerEditor extends Component {
    constructor(props) {
        super(props);
        const { selectedLayer } = this.props;
        const type = selectedLayer.type;
        const groups = layoutGroups(type);
        const editorGroups = {};
        groups.forEach(group => {
            editorGroups[group.title] = true;
        });
        this.state = {
            editorGroups
        };
    }

    onLayerIdChange(newIndex) {
        const { selectedLayer, layers, onLayerChanged } = this.props;
        const id = selectedLayer.id;
        const _layers = layers.slice();
        const idx = style.indexOfLayer(_layers, id);
        _layers[idx] = {
            ..._layers[idx],
            id: newIndex
        };
        onLayerChanged(_layers);
    }

    onLayerTypeChange(newType) {
        const { selectedLayer, onLayerChanged } = this.props;
        const _layers = changeType(selectedLayer, newType);
        onLayerChanged(_layers);
    }

    onLayerPropertyChange(group, property, newValue) {
        const { selectedLayer, onLayerChanged } = this.props;
        const _layers = changeProperty(selectedLayer, group, property, newValue);
        onLayerChanged(_layers);
    }

    onGroupToggle(title, active) {
        const changedEditorGroups = {
            ...this.state.editorGroups,
            [title]: active
        };
        this.setState({
            editorGroups: changedEditorGroups
        });
    }

    getSelectedLayer() {
        const { layers, selectedLayerIndex } = this.props;
        return layers.length > 0 ? layers[selectedLayerIndex] : null;
    }

    moveLayer(offset) {
        const props = this.props;
        let oldIndex = props.selectedLayerIndex;
        let newIndex = props.selectedLayerIndex + offset;
        const layers = props.layers;
        oldIndex = clamp(oldIndex, 0, layers.length - 1);
        newIndex = clamp(newIndex, 0, layers.length - 1);

        if (oldIndex === newIndex) return;
        if (oldIndex === props.selectedLayerIndex) {
            props.setSelectedLayerIndex(newIndex);
        }

        let _layers = layers.slice();
        _layers = arrayMove(_layers, oldIndex, newIndex);
        props.onLayerChanged(_layers);
    }

    renderMenuItemsList(items) {
        return Object.keys(items).map((id, idx) =>
            <li key={id} >
                <MenuItem
                    value={id}
                    className='more-menu__menu__item'
                >
                    {items[id]['text']}
                </MenuItem>
            </li>
        );
    }

    renderLayerGroups() {
        const { selectedLayer } = this.props;
        const layerType = selectedLayer.type;
        const groups = layoutGroups(layerType)
            .filter(group => !(layerType === 'background' && group.type === 'source'))
            .map(group => {
                return (
                    <LayerEditorGroup
                        data-wd-key={group.title}
                        key={group.title}
                        title={group.title}
                        isActive={this.state.editorGroups[group.title]}
                        onActiveToggle={this.onGroupToggle.bind(this, group.title)}
                    >
                        {this.renderGroupTypes(group.type, group.fields)}
                    </LayerEditorGroup>
                );
            });
        return groups;
    }

    renderGroupTypes(type, fields) {
        let comment = '';
        const { selectedLayer, sources, vectorLayers, spec, onLayerChanged } = this.props;
        if (selectedLayer.metadata) {
            comment = selectedLayer.metadata['maputnik:comment'];
        }
        let sourceLayerIds;
        if (sources.hasOwnProperty(selectedLayer.source)) {
            sourceLayerIds = sources[selectedLayer.source].layers;
        }
        switch (type) {
            case 'layer':
                return (
                    <div>
                        <LayerIdBlock
                            value={selectedLayer.id}
                            wdKey='layer-editor.layer-id'
                            onChange={this.onLayerIdChange}
                        />
                        <LayerTypeBlock
                            value={selectedLayer.type}
                            onChange={this.onLayerTypeChange}
                        />
                        {
                            selectedLayer.type !== 'background' &&
                            <LayerSourceBlock
                                sourceIds={Object.keys(this.props.sources)}
                                value={selectedLayer['source']}
                                onChange={(value) => this.onLayerPropertyChange(null, 'source', value)}
                            />
                        }
                        {
                            ['background', 'raster', 'hillshade', 'heatmap'].indexOf(selectedLayer.type) < 0 &&
                            <LayerSourceLayerBlock
                                sourceLayerIds={sourceLayerIds}
                                value={selectedLayer['source-layer']}
                                onChange={(value) => this.onLayerPropertyChange(null, 'source-layer', value)}
                            />
                        }
                        <MinZoomBlock
                            value={selectedLayer.minzoom}
                            onChange={value => this.onLayerPropertyChange(null, 'minzoom', value)}
                        />
                        <MaxZoomBlock
                            value={selectedLayer.maxzoom}
                            onChange={value => this.onLayerPropertyChange(null, 'maxzoom', value)}
                        />
                        <CommentBlock
                            value={comment}
                            onChange={value => this.onLayerPropertyChange('metadata', 'maputnik:comment', value == '' ? undefined : value)}
                        />
                    </div>
                );
            case 'filter':
                return (
                    <div>
                        <div className='maputnik-filter-editor-wrapper'>
                            <FilterEditor
                                filter={selectedLayer.filter}
                                properties={vectorLayers[selectedLayer['source-layer']]}
                                onChange={value => this.onLayerPropertyChange(null, 'filter', value)}
                            />
                        </div>
                    </div>
                );
            case 'properties':
                return (
                    <PropertyGroup
                        layer={selectedLayer}
                        groupFields={fields}
                        spec={spec}
                        onChange={this.onLayerPropertyChange.bind(this)}
                    />
                );
            case 'jsoneditor':
                return (
                    <JSONEditor
                        layer={selectedLayer}
                        onChange={onLayerChanged}
                    />
                );
        }
    }

    render() {
        const props = this.props;
        const { selectedLayer } = props;
        if (!selectedLayer) return null;
        const layout = selectedLayer.layout || {};
        const items = {
            delete: {
                text: '删除',
                handler: () => props.onLayerDestroy(selectedLayer.id)
            },
            duplicate: {
                text: '复制',
                handler: () => props.onLayerCopy(selectedLayer.id)
            },
            hide: {
                text: layout.visibility === 'none' ? '显示' : '隐藏',
                handler: () => props.onLayerVisibilityToggle(selectedLayer.id)
            },
            moveLayerUp: {
                text: '向上移动图层',
                disabled: props.selectedLayerIndex < 1,
                handler: () => this.moveLayer(-1)
            },
            moveLayerDown: {
                text: '向下移动图层',
                disabled: props.selectedLayerIndex === props.layers.length - 1,
                handler: () => this.moveLayer(+1)
            }
        };

        function handleSection(id, evt) {
            evt.stopPropagation();
            items[id].handler();
        }
        return (
            <div className='maputnik-layer-editor'>
                <header>
                    <div className='layer-header'>
                        <h2 className='layer-header__title'>
                            Layer:{selectedLayer.id}
                        </h2>
                        <div className='layer-header__info'>
                            <Wrapper
                                className='more-menu'
                                onSelection={handleSection}
                                closeOnSelection={false}
                            >
                                <Button className='more-menu__button' >
                                    <MdMoreVert className='more-menu__button__svg' />
                                </Button>
                                <Menu>
                                    <ul className='more-menu__menu' >
                                        {this.renderMenuItemsList(items)}
                                    </ul>
                                </Menu>
                            </Wrapper>
                        </div>
                    </div>
                </header>
                {this.renderLayerGroups()}
            </div>
        );
    }
}

LayerEditor.propTypes = {
    layers: PropTypes.array.isRequired,
    selectedLayerIndex: PropTypes.number,
    selectedLayer: PropTypes.object,
    sources: PropTypes.object,
    vectorLayers: PropTypes.object,
    spec: PropTypes.object,
    onLayerChanged: PropTypes.func,
    onLayerSelect: PropTypes.func,
    onLayerDestroy: PropTypes.func,
    onLayerCopy: PropTypes.func,
    onLayerVisibilityToggle: PropTypes.func,
    setSelectedLayerIndex: PropTypes.func,
};

const mapState = ({ mapStyle, selectedLayerIndex, sources, vectorLayers, spec }) => ({
    layers: mapStyle.layers,
    selectedLayerIndex,
    selectedLayer: mapStyle.layers.length > 0 ? mapStyle.layers[selectedLayerIndex] : null,
    sources,
    vectorLayers,
    spec,
});


const mapDispatch = ({
    selectedLayerIndex: { setLayerSelect, setSelectedLayerIndex },
    mapStyle: { destoryLayer, copyLayer, toggleLayerVisibility, changeLayer }
}) => ({
    onLayerSelect: (layers, idx) => setLayerSelect(layers, idx),
    onLayerDestroy: (layerId) => destoryLayer(layerId),
    onLayerCopy: (layerId) => copyLayer(layerId),
    onLayerVisibilityToggle: (layerId) => toggleLayerVisibility(layerId),
    onLayerChanged: (layers) => changeLayer(layers),
    setSelectedLayerIndex: (index) => setSelectedLayerIndex(index),
});

export default connect(mapState, mapDispatch)(LayerEditor);
