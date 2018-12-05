import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocLabel from '../fields/DocLabel';
import SelectInput from '../input/SelectInput';
import SingleFilterEditor from './SingleFilterEditor';
import FilterEditorBlock from './FilterEditorBlock';
import Button from '../Button';
import { combiningFilterOps } from '../../libs/filterops';


function hasCombiningFilter(filter) {
    return combiningFilterOps.indexOf(filter[0]) >= 0;
}

function hasNestedCombiningFilter(props) {
    if (hasCombiningFilter(filter)) {
        const combinedFilters = filter.slice(1);
        return filter.slice(1).map(f => hasCombiningFilter(f)).filter(f => f == true).length > 0;
    }
    return false;
}

export default class FilterEditor extends Component {

    combiningFilter() {
        let filter = this.props.filter || ['all'];
        let combiningOp = filter[0];
        let filters = filter.slice(1);
        if (combiningFilterOps.indexOf(combiningOp) < 0) {
            combiningOp = 'all';
            filters = [filter.slice()];
        }
        return [combiningOp, ...filters];
    }

    renderEditorBlocks(filters) {
        return filters.map((filter, idx) => <FilterEditorBlock
            key={idx}
            onDelete={() => { }}
        >
            <SingleFilterEditor
                properties={this.props.properties}
                filter={filter}
                onChange={() => { }}
            />

        </FilterEditorBlock>)
    }

    render() {
        const filter = this.combiningFilter();
        const combiningOp = filter[0];
        const filters = filter.slice(0);
        return (
            <div className='maputnik-filter-editor'>
                <div className='maputnik-filter-editor-compound-select' data-wd-key='layer-filter'>
                    <DocLabel

                    />
                    <SelectInput

                    />
                </div>
                {this.renderEditorBlocks(filters)}
                <div className='maputnik-filter-editor-add-wrapper'>
                    <Button
                        data-wd-key='layer-filter-button'
                        className='maputnik-add-filter'
                        onClick={() => { }}
                    >
                        添加`Filter`
                    </Button>
                </div>
            </div>
        );
    }
}

FilterEditor.propTypes = {
    properties: PropTypes.object,
    filter: PropTypes.array,
    onChange: PropTypes.func.isRequired
};