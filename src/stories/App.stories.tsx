import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {App} from "../App";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";

export default {
    title: 'AppStories/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) =>  <App demo={true}/> ;

export const AppExample = Template.bind({});