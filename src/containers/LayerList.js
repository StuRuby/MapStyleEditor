import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import autobind from 'react-autobind';
import { SortableContainer, arrayMove } from 'react-sortable-hoc';
import LayerListGroup from '../../components/layers/LayerListGroup';
import { connect } from 'react-redux';
import LayerListItem from '../../components/layers/LayerListItem';
import { AddModal } from '../../components/modals';
import clamp from 'lodash.clamp';



const propTypes = {
    layers: PropTypes.array,
    selectedLayerIndex: PropTypes.number,
    sources: PropTypes.object,
    onLayerChanged: PropTypes.func,
    onLayerMove: PropTypes.func
};

class LayerListContainer extends Component {
    constructor(props) {
        super(props);
        autobind(this);
        this.state = {
            collapsedGroups: {},
            areAllGroupsExpanded: false,
            addIsOpen: false
        };
    }

    layerPrefix(name) {
        return name.replace(' ', '-').replace('_', '-').split('-')[0];
    }

    findClosestCommonPrefix(layers, idx) {
        const currentLayerPrefix = this.layerPrefix(layers[idx].id);
        let closestIdx = idx;
        for (let i = idx; i > 0; i--) {
            const previousLayerPrefix = this.layerPrefix(layers[i - 1].id);
            if (previousLayerPrefix === currentLayerPrefix) {
                closestIdx = i - 1;
            } else {
                return closestIdx;
            }
        }
        return closestIdx;
    }

    isCollapsed(groupPrefix, idx) {
        const collapsed = this.state.collapsedGroups[[groupPrefix, idx].join('-')];
        return collapsed === undefined ? true : collapsed;
    }

    toggleAllLayers() {
        let idx = 0;
        let newGroups = [];
        this.groupLayers().forEach(layers => {
            const groupPrefix = this.layerPrefix(layers[0].id);
            const lookupKey = [groupPrefix, idx].join('-');
            if (layers.length > 1) {
                newGroups[lookupKey] = this.state.areAllGroupsExpanded;
            }

            layers.forEach(layer => idx += 1);
        });

        this.setState({
            collapsedGroups: newGroups,
            areAllGroupsExpanded: !this.state.areAllGroupsExpanded
        });
    }

    toggleLayerGroup(groupPrefix, idx) {
        const lookupKey = [groupPrefix, idx].join('-');
        const newGroups = { ...this.state.collapsedGroups };
        if (lookupKey in this.state.collapsedGroups) {
            newGroups[lookupKey] = !this.state.collapsedGroups[lookupKey];
        } else {
            newGroups[lookupKey] = false;
        }
        this.setState({
            collapsedGroups: newGroups
        });
    }

    toggleModal() {
        this.setState({
            addIsOpen: !this.state.addIsOpen
        });
    }

    groupLayers() {
        const groups = [];
        const { layers } = this.props;
        for (let i = 0; i < layers.length; i++) {
            const previousLayer = layers[i - 1];
            const currentLayer = layers[i];
            if (previousLayer && this.layerPrefix(previousLayer.id) === this.layerPrefix(currentLayer.id)) {
                const lastGroup = groups[groups.length - 1];
                lastGroup.push(currentLayer);
            } else {
                groups.push([currentLayer]);
            }
        }
        return groups;
    }

    setListItems() {
        const props = this.props;
        const groups = this.groupLayers();
        let idx = 0;
        const listItems = [];
        groups.forEach((layers) => {
            const groupPrefix = this.layerPrefix(layers[0].id);
            if (layers.length > 1) {
                const group = <LayerListGroup
                    data-wd-key={[groupPrefix, idx].join('-')}
                    key={[groupPrefix, idx].join('-')}
                    title={groupPrefix}
                    isActive={!this.isCollapsed(groupPrefix, idx) || idx === props.selectedLayerIndex}
                    onActiveToggle={this.toggleLayerGroup.bind(this, groupPrefix, idx)}

                />;
                listItems.push(group);
            }

            layers.forEach((layer, idxInGroup) => {
                const groupIdx = this.findClosestCommonPrefix(props.layers, idx);
                const className = classnames({
                    'maputnik-layer-list-item-collapsed': layers.length > 1 && this.isCollapsed(groupPrefix, groupIdx) && idx !== props.selectedLayerIndex,
                    'maputnik-layer-list-item-group-last': idxInGroup == layers.length - 1 && layers.length > 1
                });

                const listItem = <LayerListItem
                    key={layer.id}
                    className={className}
                    index={idx}
                    layerId={layer.id}
                    layers={props.layers}
                    layerType={layer.type}
                    visibility={(layer.layout || {}).visibility}
                    isSelected={idx === props.selectedLayerIndex}
                    onLayerSelect={props.onLayerSelect}
                    onLayerDestroy={props.onLayerDestroy}
                    onLayerCopy={props.onLayerCopy}
                    onLayerVisibilityToggle={props.onLayerVisibilityToggle}
                />;

                listItems.push(listItem);
                idx += 1;
            });
        });
        return listItems;
    }

    render() {
        const { collapsedGroups, areAllGroupsExpanded } = this.state;
        const listItems = this.setListItems();
        return (
            <div className='maputnik-layer-list'>
                <AddModal
                    layers={this.props.layers}
                    sources={this.props.sources}
                    isOpen={this.state.addIsOpen}
                    onOpenToggle={this.toggleModal}
                    onLayerAdded={this.props.onLayerChanged}
                />
                <header className='maputnik-layer-list-header'>
                    <span className='maputnik-layer-list-header-title'>Layers</span>
                    <span className='maputnik-space' />
                    <div className='maputnik-default-property'>
                        <div className='maputnik-multibutton'>
                            <button
                                id='skip-menu'
                                className='maputnik-button'
                                onClick={this.toggleAllLayers}
                            >
                                {areAllGroupsExpanded === true ? '关闭' : '展开'}
                            </button>
                        </div>
                    </div>
                    <div className='maputnik-default-property'>
                        <div className='maputnik-multibutton'>
                            <button
                                onClick={this.toggleModal}
                                data-wd-key='layer-list:add-layer'
                                className='maputnik-button maputnik-button-selected'>
                                添加图层
                            </button>
                        </div>
                    </div>
                </header>
                <ul className='maputnik-layer-list-container'>
                    {listItems}
                </ul>
            </div>
        );
    }
}

LayerListContainer.propTypes = propTypes;

const LayerListContainerSortable = SortableContainer(props =>
    <LayerListContainer
        {...props}
    />
);


const onLayerMove = (move, props) => {
    let { oldIndex, newIndex } = move;
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
};

const sortableList = (props) => <LayerListContainerSortable
    {...props}
    helperClass='sortableHelper'
    onSortEnd={(move) => onLayerMove(move, props)}
    useDragHandle={true}
/>;

sortableList.propTypes = propTypes;

const mapState = ({ mapStyle, selectedLayerIndex, sources }) => ({
    layers: mapStyle.layers,
    selectedLayerIndex,
    sources,
});

const mapDispatch = ({
    selectedLayerIndex: { setLayerSelect, setSelectedLayerIndex },
    mapStyle: { destoryLayer, copyLayer, toggleLayerVisibility, setChangedLayers }
}) => ({
    onLayerSelect: (layers, idx) => setLayerSelect(layers, idx),
    onLayerDestroy: (layerId) => destoryLayer(layerId),
    onLayerCopy: (layerId) => copyLayer(layerId),
    onLayerVisibilityToggle: (layerId) => toggleLayerVisibility(layerId),
    onLayerChanged: (layers) => setChangedLayers(layers),
    setSelectedLayerIndex: (index) => setSelectedLayerIndex(index),
});

export default connect(mapState, mapDispatch)(sortableList);
