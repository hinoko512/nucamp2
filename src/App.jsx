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
    this.state = {
      tasks: [
        {
          "title": "NUcampでアプリを作る",
          "limit": "11/21"
        },
        {
          "task_id": 2,
          "title": "勉強する",
          "limit": "12/1"
        }
      ]
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
  }

  //追加ボタンを押したときの処理
  addTask = (title, limit) => {
    const newTask = {
      "title": title,
      "limit": limit
    }
    const tasks = this.state.tasks;
    tasks.push(newTask);
    this.setState({tasks: tasks});
    console.log('[info] addTasks: ', this.state.tasks)
  }

  ionViewDidEnter() {
    console.log('App: ', this.state.tasks);
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

export default App;
