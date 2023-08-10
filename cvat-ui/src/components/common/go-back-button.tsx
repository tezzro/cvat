// Copyright (C) 2023 CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import Button from 'antd/lib/button';
import Text from 'antd/lib/typography/Text';
import { LeftOutlined } from '@ant-design/icons';
import { useGoBack } from 'utils/hooks';

interface Props {
    text?: string;
    url?: string;
}

function GoBackButton(props: Props): JSX.Element {
    const { text, url } = props;
    const goBack = useGoBack(url);
    return (
        <>
            <Button style={{ marginRight: 8 }} onClick={goBack}>
                <LeftOutlined />
            </Button>
            <Text style={{ userSelect: 'none' }} strong>{text || 'Back'}</Text>
        </>
    );
}

export default React.memo(GoBackButton);
