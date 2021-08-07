import React from 'react';

import CopyableText from './CopyableText';

export default {
    component: CopyableText,
    title: 'CopyableText',
};

const Template = (args) => <CopyableText {...args} />;

export const Default = Template.bind({});

Default.args = { text: 'DE19 5001 0517 5422 7446 95' };
