export interface ScheduleItem {
    starttime: string;
    endtime: string;
    name: string;
    Resource: {
      name: string;
    };
    callspan?: number;
  }