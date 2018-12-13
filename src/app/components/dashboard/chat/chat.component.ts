import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { of } from 'rxjs/observable/of';
import * as firebase from 'firebase';
import { AppService } from '../../../providers/app.service';
declare const $: any;
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chat_message: any;
  lang: any;
  messagesCopy = [];
  languages = [
    { id: '0', name: 'ALL' },
    { id: '1', name: 'English' },
    { id: '2', name: '한국어' },
    { id: '3', name: '中文' },
    { id: '4', name: '日本語' },
    { id: '5', name: 'русский' },
    { id: '6', name: 'Español' },
    { id: '7', name: 'हिन्दी,' },
    { id: '8', name: 'العربية' },
    { id: '9', name: 'português' },
    { id: '10', name: 'Bahasa' },
    { id: '11', name: 'Français' },
    { id: '12', name: 'Deutsch' },
    { id: '13', name: 'italiano' },
    { id: '14', name: 'ภาษาไทย' },
    { id: '15', name: 'українська' },
    { id: '16', name: 'Türkçe' },
    { id: '17', name: 'Tiếng Việt' },
  ];
  selectedLang: number;
  messages = [];
  userName = '';
  submit: boolean = true;
  userId;
  loadChat: boolean;
  constructor(private db: AngularFireDatabase, private app: AppService) {
  }

  ngOnInit() {
    this.userId = localStorage.getItem('DUserId');
    this.getUserName();
    const ref = firebase.database().ref('liveChat').limitToLast(100);
    this.loadChat = true;
    const that = this;
    ref.on('child_added', function (snapshot) {
      const chats = [];
      const childData = snapshot.val();
      that.messages.push(childData);
      that.messagesCopy.push(childData);
      that.loadChat = false;
    });
  }

  checkinput() {
    if (this.chat_message.trim()) {
      this.submit = false;
    } else {
      this.submit = true;
    }
  }

  sendMessage() {
    this.scrollToBottom();
    if (!this.selectedLang) {
      Swal(
        '',
        'Choose Language First',
        'warning'
      );
    } else {
      const ref = firebase.database().ref('liveChat');
      const chatTosend = {
        message: this.chat_message,
        sender: localStorage.getItem('DUserId'),
        languague: this.selectedLang,
        username: this.userName,
        useraddress: localStorage.getItem('address'),
        time: new Date().getTime()
      }
      ref.push(chatTosend);
    }
    this.chat_message = "";
    this.submit = true;
  }

  showChatbox() {
    const box = document.getElementById('chatBox');
    if(box){
    box.classList.add('chatbox-max');
    }
  }
  closeChatbox() {
    const box = document.getElementById('chatBox');
    if(box){
    box.classList.remove('chatbox-max');
    }
  }

  languageSelected(Lang) {
    this.messages = this.messagesCopy;
    // const  selLang = lang;
    if(Lang != 0 ){
    this.messages = this.messages.filter(function (el) {
      return el.languague == Lang;
    });
    }

  }

  getUserName() {
    if (this.userId) {
      this.app.getUserName(this.userId).subscribe(res => {
        if (res.username) {
          this.userName = res.username;
        } else {
          this.userName = '';
        }
      });
    } else {
      this.userName = '';
    }
  }
  setUserName() {
    this.app.setUserName(this.userId, this.userName).subscribe(res => {
      this.getUserName();
      Swal('Username Successfully added');
    });
  }

  scrollToBottom() {
    const scrollDivHeight = document.getElementById('scrollBottom').offsetHeight;
    const outerDiv = document.getElementById('chatboxBody');
    outerDiv.scrollTo(0, scrollDivHeight);
  }
}
