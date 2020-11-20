// react
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import TimeLine from './pages/TimeLine';
import Login from './pages/Login';
import Register from './pages/Register';

// icons
import { home, notifications } from 'ionicons/icons';

// Ionic
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';
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


class App extends React.Component {
  constructor(props) {
    super(props);
    // localStorageからタスクを読み込む
    let loadedTask = [];
    let loadedName = "";
    if('tasks' in localStorage) {
      loadedTask = JSON.parse(localStorage.tasks);
    }
    if('name' in localStorage) {
      loadedName = JSON.parse(localStorage.name);
    }

    // Stateの初期化
    this.state = {
      userName: loadedName,
      tasks: loadedTask,
      notiList: [
        {
          "name": "hoge",
          "taskTitle": "hogehoge"
        },
        {
          "name": "hoge2",
          "taskTitle": "hogehoge2"
        }
      ],
      showFooter: false
    };
    this.deleteTask = this.deleteTask.bind(this);
    this.addTask = this.addTask.bind(this);
    this.setUserName = this.setUserName.bind(this);
  }

  // 完了ボタンを押したときの処理
  completeTask(index) {
    // タスク内容とuser_nameをFirebaseに送信

    // notiListを更新&localStorageに保存
  }
  
  //削除ボタンを押したときの処理
  deleteTask = (index) => {
    let newTasks = this.state.tasks;
    newTasks.splice(index, 1);
    this.setState({tasks: newTasks})
    localStorage.tasks = JSON.stringify(this.state.tasks);
    console.log('[info] deleteTasks: ', this.state.tasks);
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
    localStorage.tasks = JSON.stringify(this.state.tasks);
    console.log('[info] addTasks: ', this.state.tasks);
    console.log('[info] Save to localStorage');
  }

  // ユーザネームを設定する関数
  setUserName = (name) => {
    this.setState({userName: name})
    console.log('[info] setUserName', this.state.userName)
    localStorage.name = JSON.stringify(this.state.userName)
  }

  render() {
    return (
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/home" exact={true} render={() => 
                <Home 
                  tasks={this.state.tasks} 
                  deleteTask={this.deleteTask} 
                  addTask={this.addTask}
                  name={this.state.userName}
                />}/>
              <Route path="/timeline" exact={true} render={() => 
                <TimeLine 
                  notiList={this.state.notiList}
                />}/>
              <Route path="/" render={() => <Redirect to="/login" />} exact={true} />
              <Route path="/login" render={() => 
                <Login
                  setUserName={this.setUserName}
                />} exact={true} />
              <Route path="/register" render={() => 
                <Register
                  setUserName={this.setUserName}
                />} exact={true} />

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
