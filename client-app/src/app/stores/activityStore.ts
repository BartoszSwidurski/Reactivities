import { makeAutoObservable, runInAction } from "mobx";
import agent from "../../api/agent";
import { Activity } from "../models/Activity";

export default class ActivityStore {
  //const map1 = new Map();
  // map1.set('a', 1);
  // map1.set('b', 2);
  // this is better than simple array [] because we have methods for get, set, delete, clear etc.
  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  //ordered by date
  //Date.parse returns number of ms from 1970
  // let numbers = [4, 2, 5, 1, 3];
  // numbers.sort((a, b) => a - b);
  // console.log(numbers);
  // Output: [1, 2, 3, 4, 5]
  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  //Example Object.entries use:
  // const obj = { foo: 'bar', baz: 42 };
  // console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]
  // const array1 = [1, 2, 3, 4];
  // const reducer = (previousValue, currentValue) => previousValue + currentValue;
  // 1 + 2 + 3 + 4
  // expected output: 10
  // {} as { [key: string]: Activity[] } to jest initial value, pusty obiekt o typie { [key: string]: Activity[] }
  get groupedActivities() {
    return Object.entries(
      this.activitiesByDate.reduce((activities, activity) => {
        const date = activity.date;
        //activities[date] get property from activities that matches date
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {} as { [key: string]: Activity[] })
    );
  }

  // ATTENTION !!!!!
  //   //we need use arrow function since it is using 'this' properties, or otherwise we would need to use action.bound
  //   setTitle = () => {
  //     this.title = this.title + "!";
  //   };

  loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const activities = await agent.Activities.list();
      //for async await so every state change after await needs to be in runInAction
      //or in separate action like it is here in setLoadingInitial
      //   runInAction(() => {
      //     activities.forEach((activity) => {
      //       activity.date = activity.date.split("T")[0];
      //       this.activities.push(activity);
      //     });
      //     this.setLoadingInitial(false);
      //   });

      activities.forEach((activity) => {
        this.setActivity(activity);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      this.setLoadingInitial(false);
      //   runInAction(() => {
      //     console.log(error);
      //     this.setLoadingInitial(false);
      //   });
    }
  };

  loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.selectedActivity = activity;
      return activity;
    } else {
      this.setLoadingInitial(true);
      try {
        activity = await agent.Activities.details(id);
        this.setActivity(activity);
        runInAction(() => {
          this.selectedActivity = activity;
        });
        this.setLoadingInitial(false);
        return activity;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setActivity = (activity: Activity) => {
    activity.date = activity.date.split("T")[0];
    this.activityRegistry.set(activity.id, activity);
  };

  private getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  setSelectedActivity = (activity: Activity | undefined) => {
    this.selectedActivity = activity;
  };

  createActivity = async (activity: Activity) => {
    this.loading = true;
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateActivity = async (activity: Activity) => {
    this.loading = true;
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        //updating activities
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteActivity = async (id: string) => {
    this.loading = true;
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        this.activityRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
