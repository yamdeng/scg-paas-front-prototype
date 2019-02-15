import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withInfo } from '@storybook/addon-info';

import { Button, Welcome } from '@storybook/react/demo';
import StoryRouter from 'storybook-react-router';
import { Provider } from 'mobx-react';
import stores from '../src/stores/stores';
import Home from '../src/components/Home';
import ApiTestDetail from '../src/components/front-issue/ApiTestDetail';
import InnerTableComponent from '../src/components/front-issue/help/InnerTableComponent';

storiesOf('Welcome', module)
  .addDecorator(withInfo)
  .add('to Storybook', () => <Welcome showApp={linkTo('Button')} />)
  .add('InnerTableComponent', () => <InnerTableComponent data={[]} />);

storiesOf('Button', module)
  .addDecorator(withInfo)
  .addDecorator(story => <Provider {...stores}>{story()}</Provider>)
  .addDecorator(StoryRouter())
  .addDecorator(story => <div style={{ margin: '50px' }}>{story()}</div>)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ))
  .add('Home2', () => <Home />, { info: <Home /> })
  .add('ApiTestDetail', () => <ApiTestDetail />);
