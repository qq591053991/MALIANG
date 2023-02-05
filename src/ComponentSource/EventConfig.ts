interface iEventCenter {
  config: Record<string, any>;
  eventConfig: Record<string, any>[];
  run: () => void;
}

export class EventCenter {
  eventConfig = '';
  constructor({ config, run }: iEventCenter) {
    this.eventConfig = config?.key;
    this.run = run;
    this.refreshData = this.refreshData;
    console.log(this);
    debugger;
    return this;
  }
  run() {
    console.log('run');
  }
  refreshData() {
    this.run();
  }
}

export class EventModel {
  constructor(config: iEventCenter) {
    return {
      ...config,
      config: {
        ...config?.config,
      },
      eventConfig: [...config?.eventConfig],
    };
  }
}
