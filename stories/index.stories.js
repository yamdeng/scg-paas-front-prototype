import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import StoryRouter from 'storybook-react-router';
import { Provider } from 'mobx-react';
import stores from '../src/stores/stores';
import Home from '../src/components/Home';
import ApiTestDetail from '../src/components/front-issue/ApiTestDetail';

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
));

storiesOf('Button', module)
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
  .add('Home', () => <Home />)
  .add('ApiTestDetail', () => <ApiTestDetail />);
