import React from 'react';

import DetailsCard from './DetailsCard';

export default {
    component: DetailsCard,
    title: 'DetailsCard',
};

const Template = (args) => <DetailsCard {...args} />;

export const Default = Template.bind({});

Default.args = { amount: 12.31, description: 'Pizza' };
