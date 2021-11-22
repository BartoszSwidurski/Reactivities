import { makeAutoObservable, runInAction } from "mobx";
import agent from "../../api/agent";
import { Activity } from "../models/Activity";
import { v4 as uuid } from "uuid";

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
  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  //   //we need use arrow function since it is using 'this' properties, or otherwise we would need to use action.bound
  //   setTitle = () => {
  //     this.title = this.title + "!";
  //   };

  loadActivities = async () => {
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
        activity.date = activity.date.split("T")[0];
        this.activityRegistry.set(activity.id, activity);
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

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  selectActivity = (id: string) => {
    this.activityRegistry.get(id);
  };

  cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  };

  openForm = (id?: string) => {
    id ? this.selectActivity(id) : this.cancelSelectedActivity();
    this.editMode = true;
  };

  closeForm = () => {
    this.editMode = false;
  };

  createActivity = async (activity: Activity) => {
    this.loading = true;
    activity.id = uuid();
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
        //this.selectedActivity?.id means if this.selectedActivity !== undefined
        if (this.selectedActivity?.id === id) {
          this.cancelSelectedActivity();
        }
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
