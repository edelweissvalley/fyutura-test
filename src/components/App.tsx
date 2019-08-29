import * as React from 'react';
import io from 'socket.io-client';

import 'components/app.pcss';

import {lineChart} from 'src/components/lineChart/lineChart';

export type itemType = {
  value: number;
  timestamp: number;
};

interface IState {
  serverData: itemType[];
}

/**
 * Компонент для рендера
 */
export class App extends React.Component<{}, IState> {
  public readonly state: IState = {serverData: []};

  public componentDidMount(): void {
    const socket: SocketIOClient.Socket = io('http://localhost:3000');
    socket.on('data', (data: itemType) => {
      this.setState(
        (prevState: IState) => ({serverData: [...prevState.serverData, data]})
      );
    });
  }

  public render(): React.ReactNode {
    const data: itemType[] = this.state.serverData;

    return Boolean(data.length)
      ? (
        <section className="root__section">
          {lineChart(data)}
        </section>
      )
      : (<div className="root__no-data">Данных пока нет...</div>);
  }
}
