import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  withIonLifeCycle,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import TimeLine from './pages/TimeLine';

import { home, notifications } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    let t = [];
    if('tasks' in localStorage) {
      t = JSON.parse(localStorage.tasks);
      console.log('[info] Load localStrorage');
    }
    this.state = {
      tasks: t
    };
    this.deleteTask = this.deleteTask.bind(this);
    this.addTask = this.addTask.bind(this);
  }
  
  //削除ボタンを押したときの処理
  deleteTask = (index) => {
    let newTasks = this.state.tasks;
    newTasks.splice(index, 1);
    this.setState({tasks: newTasks})
    console.log('[info] deleteTasks: ', this.state.tasks);
    localStorage.tasks = JSON.stringify(this.state.tasks);
    console.log('[info] Save to localStorage');
  }

  //追加ボタンを押したときの処理
  addTask = (title, limit) => {
    const newTask = {
      "title": title,
      "limit": limit
    }
    let updatedTasks = this.state.tasks;
    updatedTasks.push(newTask);
    this.setState({tasks: updatedTasks});
    console.log('[info] addTasks: ', this.state.tasks);
    localStorage.tasks = JSON.stringify(this.state.tasks);
    console.log('[info] Save to localStorage');
  }

  ionViewWillEnter() {
    if('tasks' in localStorage) {
      this.setState({tasks: JSON.parse(localStorage.tasks)})
      console.log('[info] Load localStrorage');
    }
  }

  render() {
    return (
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/home" exact={true} render={() => <Home tasks={this.state.tasks} deleteTask={this.deleteTask} addTask={this.addTask}/>}/>
              <Route path="/timeline" component={TimeLine} exact={true} />
              <Route path="/" render={() => <Redirect to="/home" />} exact={true} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonIcon icon={home} />
                <IonLabel>ホーム</IonLabel>
              </IonTabButton>
              <IonTabButton tab="notification" href="/timeline">
                <IonIcon icon={notifications} />
                <IonLabel>通知</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    );
  }
}

export default withIonLifeCycle(App);
