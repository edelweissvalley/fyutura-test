import * as React from 'react';

import {index} from 'src/components/pages/index/index';
import {Template} from 'src/components/template/Template';

/**
 * Компонент для рендера
 */
export class App extends React.Component {
  public render(): React.ReactElement<{}> {
    return (
      <Template>{index}</Template>
    );
  }
}
