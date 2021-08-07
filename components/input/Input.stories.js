import React from 'react';

import Input from './Input';

export default {
    component: Input,
    title: 'Input',
};

const Template = (args) => <Input {...args} />;

export const Default = Template.bind({});

Default.args = {
    id: 'id',
    placeholder: 'Description',
    label: 'Description',
    type: 'text',
};
