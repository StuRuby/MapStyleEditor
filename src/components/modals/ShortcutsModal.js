import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../components/modals/Modal';

const HELP = [
    {
        key: '?',
        text: '快捷键菜单'
    },
    {
        key: 'o',
        text: '打开'
    },
    {
        key: 'e',
        text: '导出'
    },
    {
        key: 'd',
        text: '数据源'
    },
    {
        key: 's',
        text: '样式设置'
    },
    {
        key: 'i',
        text: '切换审查模式'
    },
    {
        key: 'm',
        text: '聚焦到地图'
    }
];

export default function ShortcutsModal(props) {
    return (
        <Modal
            data-wd-key='shortcuts-modal'
            isOpen={props.onOpenToggle}
            onOpenToggle={props.onOpenToggle}
            title='快捷键'
        >
            <div className='maputnik-modal-section maputnik-modal-shortcuts'>
                <p>
                    按<code>ESC</code>取消选中
                </p>
                <ul>
                    {
                        HELP.map(item =>
                            <li key={item.key} >
                                <code>{item.key}</code>
                                {item.text}
                            </li>
                        )
                    }
                </ul>
            </div>
        </Modal>
    );
}

ShortcutsModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onOpenToggle: PropTypes.func.isRequired,
};