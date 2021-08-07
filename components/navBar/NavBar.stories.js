import React from 'react';

import NavBar from './NavBar';

export default {
    component: NavBar,
    title: 'NavBar',
};

const Template = (args) => <NavBar {...args} />;

export const Default = Template.bind({});
