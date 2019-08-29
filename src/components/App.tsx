import * as React from 'react';
import io from 'socket.io-client';

import 'components/app.pcss';

type itemType = {
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
  constructor(props: object) {
    super(props);
    this.state = {serverData: []};
  }

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

    return data.length
      ? (
        <section>
          {data.map(({value: v, timestamp: t}: itemType): React.ReactNode => (
            <div key={t}>Число: <span>{v}</span> ---> Время: {t}</div>
          ))}
        </section>
      )
      : (<div>Данных пока нет...</div>);
  }
}
