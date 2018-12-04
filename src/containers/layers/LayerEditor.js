import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Button, Menu, MenuItem } from 'react-aria-menubutton';
import { MdMoreVert } from 'react-icons/md';
import { connect } from 'react-redux';


class LayerEditor extends Component {
    constructor(props) {
        super(props);

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

    getSelectedLayer() {
        const { layers, selectedLayerIndex } = this.props;
        return layers.length > 0 ? layers[selectedLayerIndex] : null;
    }

    moveLayer() {

    }

    render() {
        const props = this.props;
        const selectedLayer = this.getSelectedLayer();
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
                // handler: ()=>
            }
        };
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
                                onSelection={() => { }}
                                closeOnSelection={false}
                            >
                                <Button className='more-menu__button' >
                                    <MdMoreVert className='more-menu__button__svg' />
                                </Button>
                                <Menu>
                                    <ul className='more-menu__menu' >
                                        {/* {this.renderMenuItemsList()} */}
                                    </ul>
                                </Menu>
                            </Wrapper>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

LayerEditor.propTypes = {
    layers: PropTypes.array.isRequired,
    selectedLayerIndex: PropTypes.number
};

const mapState = ({ mapStyle, selectedLayerIndex }) => ({
    layers: mapStyle.layers,
    selectedLayerIndex,
});


const mapDispatch = ({
    selectedLayerIndex: { setLayerSelect },
    mapStyle: { destoryLayer, copyLayer, toggleLayerVisibility }
}) => ({
    onLayerSelect: (layers, idx) => setLayerSelect(layers, idx),
    onLayerDestroy: (layerId) => destoryLayer(layerId),
    onLayerCopy: (layerId) => copyLayer(layerId),
    onLayerVisibilityToggle: (layerId) => toggleLayerVisibility(layerId),
    onLayerAdded: (layers) => changeLayer(layers),
});

export default connect(mapState, mapDispatch)(LayerEditor);
