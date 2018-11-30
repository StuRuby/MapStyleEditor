import React from 'react';
import PropTypes from 'prop-types';
import { SortableHandle, SortableElement } from 'react-sortable-hoc';
import classnames from 'classnames';
import LayerIcon from '../icons/LayerIcon';
import IconAction from '../icons/IconAction';


const DraggableLabel = SortableHandle(props => {
    return (
        <div className='maputnik-layer-list-item-handle' >
            <LayerIcon
                className='layer-handle__icon'
                type={props.layerType}
            />
            <span className='maputnik-layer-list-item-id'>{props.layerId}</span>
        </div>
    );
});

function LayerListItem(props) {
    const visibilityAction = props.visibility === 'visible' ? 'show' : 'hide';
    const onClickHandler = () => props.onLayerSelect(props.layers, props.layerId);
    return (
        <li
            key={props.layerId}
            onClick={onClickHandler}
            data-wd-key={'layer-list-item:' + props.layerId}
            className={classnames({
                'maputnik-layer-list-item': true,
                'maputnik-layer-list-item-selected': props.isSelected,
                [props.className]: true,
            })}>
            <DraggableLabel {...props} />
            <span style={{ flexGrow: 1 }} />
            <IconAction
                wdKey={'layer-list-item:' + props.layerId + ':delete'}
                action={'delete'}
                classBlockName='delete'
                onClick={e => props.onLayerDestroy(props.layerId)}
            />
            <IconAction
                wdKey={'layer-list-item:' + props.layerId + ':copy'}
                action={'duplicate'}
                classBlockName='duplicate'
                onClick={e => props.onLayerCopy(props.layerId)}
            />
            <IconAction
                wdKey={'layer-list-item:' + props.layerId + ':toggle-visibility'}
                action={visibilityAction}
                classBlockName='visibility'
                classBlockModifier={visibilityAction}
                onClick={e => props.onLayerVisibilityToggle(props.layerId)}
            />
        </li>
    );
}

LayerListItem.propTypes = {
    layerId: PropTypes.string.isRequired,
    layerType: PropTypes.string.isRequired,
    isSelected: PropTypes.bool,
    visibility: PropTypes.string,
    className: PropTypes.string,
    layers: PropTypes.array,
    onLayerSelect: PropTypes.func.isRequired,
    onLayerCopy: PropTypes.func,
    onLayerDestroy: PropTypes.func,
    onLayerVisibilityToggle: PropTypes.func,
};



export default SortableElement(props => <LayerListItem {...props} />);