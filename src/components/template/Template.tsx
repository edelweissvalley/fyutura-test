import * as React from 'react';

import {Footer} from 'components/template/Footer';
import {Header} from 'components/template/Header';

import 'src/components/template/template.pcss';

/**
 * Шаблон с дочерим контентом
 */
export class Template extends React.Component {
  public render(): React.ReactElement<{}> {
    return (
      <section className="template">
        <Header/>{this.props.children}<Footer/>
      </section>
    );
  }
}
